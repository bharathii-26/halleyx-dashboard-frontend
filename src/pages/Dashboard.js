import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ChartWidget from "../components/ChartWidget";
import KPIWidget from "../components/KPIWidget";
import OrderTable from "../components/OrderTable";
import PieWidget from "../components/PieWidget";
import { FILTER_OPTIONS, buildGridStyles, buildSeriesData, filterOrdersByRange, formatCurrency, getKpiSnapshot, getSavedWidgets, summarizeOrders } from "../utils/dashboard";
import { getDashboardConfig } from "../services/dashboardConfigService";

function renderWidget(widget, orders) {
  if (widget.type === "kpi") {
    const snapshot = getKpiSnapshot(widget.settings?.metric, orders);
    return <KPIWidget title={widget.title || snapshot.title} value={snapshot.value} note={snapshot.note} />;
  }

  if (["bar", "line", "area", "scatter"].includes(widget.type)) {
    const chartData = buildSeriesData(widget, orders);
    return <ChartWidget type={widget.type} title={widget.title} data={chartData} xLabel={widget.settings?.xKey || "Category"} yLabel={widget.settings?.yKey || "Value"} showLegend={widget.settings?.showLegend} />;
  }

  if (widget.type === "pie") {
    return <PieWidget data={buildSeriesData(widget, orders)} showLegend={widget.settings?.showLegend} />;
  }

  if (widget.type === "table") {
    return <OrderTable orders={orders.slice(0, 5)} columns={widget.settings?.columns} compact />;
  }

  return <div className="widget-empty">Unsupported widget</div>;
}

function Dashboard({ orders, loading }) {
  const [filter, setFilter] = useState("all");
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const loadWidgets = async () => {
      try {
        const config = await getDashboardConfig();
        const parsed = JSON.parse(config.widgetsJson || "[]");
        setWidgets(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Unable to load dashboard config from backend", error);
        setWidgets(getSavedWidgets());
      }
    };

    loadWidgets();
  }, [orders]);

  const filteredOrders = filterOrdersByRange(orders, filter);
  const summary = summarizeOrders(filteredOrders);

  return (
    <section className="page-shell">
      <div className="page-header">
        <div>
          <h3>Customer Orders</h3>
          <p>View and manage customer orders and the widgets you have configured.</p>
        </div>
        <div className="header-actions">
          <Link className="button ghost" to="/orders">Open table view</Link>
          <Link className="button primary" to="/configure">Configure dashboard</Link>
        </div>
      </div>

      <div className="header-actions" style={{ marginBottom: 24 }}>
        <div className="pill">Dashboard</div>
        <Link className="pill" to="/orders">Table</Link>
        <select className="filter-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
          {FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>

      <div className="kpi-strip">
        <KPIWidget title="Total Orders" value={summary.totalOrders} note="Across the selected date range" />
        <KPIWidget title="Total Revenue" value={formatCurrency(summary.totalRevenue)} note="Based on current order totals" />
        <KPIWidget title="Average Order" value={formatCurrency(summary.averageOrder)} note="Revenue per order" />
        <KPIWidget title="Units Sold" value={summary.totalQuantity} note="Total quantity across all orders" />
      </div>

      {loading ? (
        <div className="empty-state">
          <div>
            <div className="empty-icon">...</div>
            <h3>Loading dashboard</h3>
            <p className="muted-text">Fetching orders and preparing your widgets.</p>
          </div>
        </div>
      ) : widgets.length ? (
        <div className="dashboard-grid">
          {widgets.map((widget) => (
            <article key={widget.id} className="widget-frame" style={buildGridStyles(widget)}>
              <div className="widget-header">
                <div>
                  <p className="widget-kicker">{widget.type.toUpperCase()}</p>
                  <h4>{widget.title}</h4>
                </div>
              </div>
              <div className="widget-body">{renderWidget(widget, filteredOrders)}</div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>
            <div className="empty-icon">+</div>
            <h3>Dashboard not configured</h3>
            <p className="muted-text">Build your layout by adding charts, KPIs, and table widgets.</p>
            <Link className="button primary" to="/configure">Configure dashboard</Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
