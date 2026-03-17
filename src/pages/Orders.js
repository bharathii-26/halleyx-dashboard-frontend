import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import OrderTable from "../components/OrderTable";
import { createOrder, deleteOrder, updateOrder } from "../services/orderService";

function Orders({ orders, loading, refreshOrders }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleCreate = async (payload) => {
    await createOrder(payload);
    await refreshOrders();
    setShowCreateModal(false);
    setToast({ kind: "success", message: "Order created successfully." });
  };

  const handleUpdate = async (payload) => {
    if (!editingOrder?.id) {
      return;
    }

    await updateOrder(editingOrder.id, {
      ...editingOrder,
      ...payload,
      id: editingOrder.id,
      createdAt: editingOrder.createdAt,
    });
    await refreshOrders();
    setEditingOrder(null);
    setToast({ kind: "success", message: "Order updated successfully." });
  };

  const handleDelete = async () => {
    if (!pendingDelete?.id) {
      setPendingDelete(null);
      return;
    }

    await deleteOrder(pendingDelete.id);
    await refreshOrders();
    setPendingDelete(null);
    setToast({ kind: "success", message: "Order deleted successfully." });
  };

  return (
    <section className="page-shell">
      {toast ? <div className="toast-stack"><div className={`toast ${toast.kind}`}>{toast.message}</div></div> : null}
      <div className="page-header">
        <div>
          <h3>Customer Orders</h3>
          <p>Manage incoming orders, review line items, and keep the table view clean and searchable.</p>
        </div>
        <div className="header-actions">
          <Link className="button ghost" to="/">Dashboard view</Link>
          <button className="button primary" type="button" onClick={() => setShowCreateModal(true)}>Create order</button>
        </div>
      </div>

      <div className="header-actions" style={{ marginBottom: 24 }}>
        <Link className="pill" to="/">Dashboard</Link>
        <div className="pill">Table</div>
      </div>

      {loading ? (
        <div className="empty-state">
          <div>
            <div className="empty-icon">...</div>
            <h3>Loading orders</h3>
            <p className="muted-text">Waiting for the API response.</p>
          </div>
        </div>
      ) : orders.length ? (
        <OrderTable
          orders={orders}
          searchable
          onDelete={(order) => setPendingDelete(order)}
          onEdit={(order) => setEditingOrder(order)}
        />
      ) : (
        <div className="empty-state">
          <div>
            <div className="empty-icon">#</div>
            <h3>No orders yet</h3>
            <p className="muted-text">Start with your first customer order and it will appear in the table right away.</p>
            <button className="button primary" type="button" onClick={() => setShowCreateModal(true)}>Create order</button>
          </div>
        </div>
      )}

      {showCreateModal ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <OrderForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreateModal(false)}
              submitLabel="Submit"
              title="Create order"
              showStatusField={false}
            />
          </div>
        </div>
      ) : null}

      {editingOrder ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <OrderForm
              initialValues={editingOrder}
              onSubmit={handleUpdate}
              onCancel={() => setEditingOrder(null)}
              submitLabel="Update"
              title="Edit order"
              showStatusField
            />
          </div>
        </div>
      ) : null}

      {pendingDelete ? (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ width: "min(420px, 100%)" }}>
            <div className="modal-header">
              <div>
                <h3>Delete order</h3>
                <p className="muted-text">This action removes the order from the dashboard and table view.</p>
              </div>
              <button type="button" className="icon-button" onClick={() => setPendingDelete(null)}>x</button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete the order for {pendingDelete.firstName} {pendingDelete.lastName}?</p>
              <div className="inline-actions" style={{ justifyContent: "flex-end" }}>
                <button type="button" className="button ghost" onClick={() => setPendingDelete(null)}>Cancel</button>
                <button type="button" className="button danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Orders;
