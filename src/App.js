import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import ConfigureDashboard from "./pages/ConfigureDashboard";
import { getOrders } from "./services/orderService";
import { summarizeOrders } from "./utils/dashboard";
import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const refreshOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
      setError("");
    } catch (requestError) {
      console.error("Unable to load orders", requestError);
      setOrders([]);
      setError("We could not reach the Spring Boot API. The UI is still available for configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const summary = summarizeOrders(orders);

  return (
    <BrowserRouter>
      <div className={`app-shell${isSidebarHidden ? " sidebar-hidden" : ""}`}>
        <aside className="app-sidebar">
          <div className="brand-block">
            <div className="brand-mark">HX</div>
            <div>
              <p className="brand-kicker">Halleyx POC</p>
              <h1>Dashboard Suite</h1>
            </div>
          </div>

          <nav className="app-nav">
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/" end>
              Overview
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/orders">
              Orders
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/configure">
              Configure
            </NavLink>
          </nav>

          <div className="sidebar-summary">
            <span className="sidebar-label">Live summary</span>
            <strong>{summary.totalOrders}</strong>
            <span>{summary.totalRevenue ? `$${summary.totalRevenue.toFixed(2)}` : "$0.00"}</span>
          </div>
        </aside>

        <main className="app-main">
          <header className="topbar">
            <div className="topbar-title">
              <button
                type="button"
                className="hamburger-button"
                onClick={() => setIsSidebarHidden((current) => !current)}
                aria-label={isSidebarHidden ? "Show sidebar" : "Hide sidebar"}
              >
                {isSidebarHidden ? ">" : "<"}
              </button>
              <div>
              <p className="topbar-kicker">Full Stack Dashboard</p>
              <h2>Customer analytics and order management</h2>
              </div>
            </div>
            {error ? <div className="status-banner warning">{error}</div> : null}
          </header>

          <Routes>
            <Route path="/" element={<Dashboard orders={orders} loading={loading} />} />
            <Route path="/orders" element={<Orders orders={orders} loading={loading} refreshOrders={refreshOrders} />} />
            <Route path="/configure" element={<ConfigureDashboard orders={orders} loading={loading} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
