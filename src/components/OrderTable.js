import { useState } from "react";
import { formatCurrency, formatDateTime, orderFieldValue } from "../utils/dashboard";

const DEFAULT_COLUMNS = ["orderId", "customer", "createdAt", "email", "phone", "product", "quantity", "unitPrice", "totalAmount", "status", "createdBy"];

function renderValue(order, column) {
  if (column === "unitPrice" || column === "totalAmount") {
    return formatCurrency(orderFieldValue(order, column));
  }

  if (column === "createdAt") {
    return formatDateTime(orderFieldValue(order, column));
  }

  return orderFieldValue(order, column);
}

function columnLabel(column) {
  switch (column) {
    case "customer": return "Customer";
    case "createdAt": return "Order Date";
    case "orderId": return "Order ID";
    case "email": return "Email";
    case "phone": return "Phone";
    case "product": return "Product";
    case "quantity": return "Quantity";
    case "unitPrice": return "Unit Price";
    case "totalAmount": return "Total Amount";
    case "status": return "Status";
    case "createdBy": return "Created By";
    default: return column;
  }
}

function OrderTable({ orders, columns = DEFAULT_COLUMNS, compact = false, searchable = false, onDelete, onEdit, onCreate }) {
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const safeOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders = safeOrders.filter((order) => {
    if (!query.trim()) return true;
    const haystack = ["orderId", "customer", "email", "phone", "product", "status", "createdBy", "address"]
      .map((field) => String(orderFieldValue(order, field) || ""))
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <div className="table-shell">
      {searchable ? (
        <div className="page-header" style={{ marginBottom: 0, padding: "18px 18px 0" }}>
          <div>
            <h3 className="section-title">Order table</h3>
            <p className="muted-text">Browse customer orders and quick actions.</p>
          </div>
          <div className="header-actions">
            <input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by customer, product, status, email" />
            {onCreate ? <button className="button primary" type="button" onClick={onCreate}>Create order</button> : null}
          </div>
        </div>
      ) : null}
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column}>{columnLabel(column)}</th>)}
              {onDelete || onEdit ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? filteredOrders.map((order) => (
              <tr key={order.id ?? `${order.firstName}-${order.email}-${order.product}`}>
                {columns.map((column) => <td key={`${order.id ?? order.email}-${column}`}>{renderValue(order, column)}</td>)}
                {onDelete || onEdit ? (
                  <td style={{ position: "relative" }}>
                    <button className="icon-button" type="button" onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}>...</button>
                    {openMenuId === order.id ? (
                      <div className="context-menu">
                        {onEdit ? <button type="button" onClick={() => { setOpenMenuId(null); onEdit(order); }}>Edit order</button> : null}
                        {onDelete ? <button type="button" onClick={() => { setOpenMenuId(null); onDelete(order); }}>Delete order</button> : null}
                      </div>
                    ) : null}
                  </td>
                ) : null}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + (onDelete || onEdit ? 1 : 0)}>
                  <div className={compact ? "widget-empty" : "empty-state"}>
                    <div>
                      <strong>No orders to display</strong>
                      <p className="muted-text">Add a new order and it will appear in this table immediately.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
