import { useEffect, useState } from "react";
import ChartWidget from "../components/ChartWidget";
import KPIWidget from "../components/KPIWidget";
import OrderTable from "../components/OrderTable";
import PieWidget from "../components/PieWidget";
import { CATEGORY_OPTIONS, FILTER_OPTIONS, KPI_METRICS, NUMERIC_FIELD_OPTIONS, TABLE_COLUMNS, WIDGET_LIBRARY, buildGridStyles, buildSeriesData, createWidget, filterOrdersByRange, getKpiSnapshot, getSavedWidgets, saveWidgets } from "../utils/dashboard";
import { getDashboardConfig, saveDashboardConfig } from "../services/dashboardConfigService";

function WidgetPreview({ widget, orders, isSelected, onSelect, onRemove }) {
  const renderContent = () => {
    if (widget.type === "kpi") {
      const snapshot = getKpiSnapshot(widget.settings?.metric, orders);
      return <KPIWidget title={widget.title || snapshot.title} value={snapshot.value} note={snapshot.note} />;
    }

    if (["bar", "line", "area", "scatter"].includes(widget.type)) {
      return <ChartWidget type={widget.type} title={widget.title} data={buildSeriesData(widget, orders)} xLabel={widget.settings?.xKey} yLabel={widget.settings?.yKey} />;
    }

    if (widget.type === "pie") {
      return <PieWidget data={buildSeriesData(widget, orders)} showLegend={widget.settings?.showLegend} />;
    }

    return <OrderTable orders={orders.slice(0, 4)} columns={widget.settings?.columns} compact />;
  };

  return (
    <article className={`widget-frame${isSelected ? " selected" : ""}`} style={buildGridStyles(widget)} onClick={onSelect}>
      <div className="widget-header">
        <div>
          <p className="widget-kicker">{widget.type.toUpperCase()}</p>
          <h4>{widget.title}</h4>
        </div>
        <div className="widget-tools">
          <button className="icon-button" type="button" onClick={(event) => { event.stopPropagation(); onSelect(); }}>cfg</button>
          <button className="icon-button danger" type="button" onClick={(event) => { event.stopPropagation(); onRemove(); }}>del</button>
        </div>
      </div>
      <div className="widget-body">{renderContent()}</div>
    </article>
  );
}

function ConfigureDashboard({ orders }) {
  const [widgets, setWidgets] = useState([]);
  const [activeWidgetId, setActiveWidgetId] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const config = await getDashboardConfig();
        const parsed = JSON.parse(config.widgetsJson || "[]");
        const backendWidgets = Array.isArray(parsed) ? parsed : [];
        setWidgets(backendWidgets);
        saveWidgets(backendWidgets);
        setActiveWidgetId(backendWidgets[0]?.id || "");
      } catch (error) {
        console.error("Unable to load dashboard config from backend", error);
        const savedWidgets = getSavedWidgets();
        setWidgets(savedWidgets);
        setActiveWidgetId(savedWidgets[0]?.id || "");
      }
    };

    loadConfiguration();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredOrders = filterOrdersByRange(orders, filter);
  const activeWidget = widgets.find((widget) => widget.id === activeWidgetId) || null;

  const updateWidget = (patch) => {
    if (!activeWidget) return;
    setWidgets((current) => current.map((widget) => (widget.id === activeWidget.id ? { ...widget, ...patch } : widget)));
    setIsDirty(true);
  };

  const updateSettings = (patch) => {
    if (!activeWidget) return;
    updateWidget({ settings: { ...activeWidget.settings, ...patch } });
  };

  const addWidget = (type) => {
    const widget = createWidget(type);
    setWidgets((current) => [...current, widget]);
    setActiveWidgetId(widget.id);
    setIsDirty(true);
  };

  const removeWidget = (id) => {
    const nextWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(nextWidgets);
    setActiveWidgetId(nextWidgets[0]?.id || "");
    setIsDirty(true);
    setToast({ kind: "success", message: "Widget removed from the canvas." });
  };

  const saveConfiguration = async () => {
    try {
      await saveDashboardConfig(widgets);
      saveWidgets(widgets);
      setIsDirty(false);
      setToast({ kind: "success", message: "Dashboard configuration saved successfully." });
    } catch (error) {
      console.error("Unable to save dashboard config to backend", error);
      saveWidgets(widgets);
      setToast({ kind: "error", message: "Backend save failed, but a local backup was stored." });
    }
  };

  return (
    <section className="page-shell">
      {toast ? <div className="toast-stack"><div className={`toast ${toast.kind}`}>{toast.message}</div></div> : null}
      <div className="page-header">
        <div>
          <h3>Configure dashboard</h3>
          <p>Choose a time range, add widgets from the library, and shape the dashboard canvas.</p>
        </div>
        <div className="header-actions">
          {isDirty ? <span className="pill">Unsaved changes</span> : <span className="pill">Saved</span>}
          <button className="button primary" type="button" onClick={saveConfiguration}>Save layout</button>
        </div>
      </div>

      <div className="configure-layout">
        <aside className="config-card">
          <div className="field">
            <label>Show data for</label>
            <select className="filter-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
              {FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>

          {WIDGET_LIBRARY.map((section) => (
            <div className="library-group" key={section.title}>
              <h4>{section.title}</h4>
              <p className="muted-text">Drag and drop feel, implemented here as quick-add actions.</p>
              <div className="library-list">
                {section.items.map((item) => (
                  <button key={item.type} type="button" className="library-item" onClick={() => addWidget(item.type)}>{item.label}</button>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <div className="config-card">
          <div className="canvas-grid">
            {widgets.length ? widgets.map((widget) => (
              <WidgetPreview
                key={widget.id}
                widget={widget}
                orders={filteredOrders}
                isSelected={activeWidgetId === widget.id}
                onSelect={() => setActiveWidgetId(widget.id)}
                onRemove={() => removeWidget(widget.id)}
              />
            )) : (
              <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
                <div>
                  <div className="empty-icon">[]</div>
                  <h3>Empty dashboard canvas</h3>
                  <p className="muted-text">Add KPIs, charts, or tables from the library to start composing your layout.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="config-card">
          {activeWidget ? (
            <div className="check-grid">
              <div className="field">
                <label>Widget title</label>
                <input className="text-input" value={activeWidget.title} onChange={(event) => updateWidget({ title: event.target.value })} />
              </div>
              <div className="field">
                <label>Widget description</label>
                <textarea className="text-area" value={activeWidget.description || ""} onChange={(event) => updateWidget({ description: event.target.value })} />
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Width (columns)</label>
                  <input className="number-input" type="number" min="1" max="12" value={activeWidget.w} onChange={(event) => updateWidget({ w: Number(event.target.value) })} />
                </div>
                <div className="field">
                  <label>Height (rows)</label>
                  <input className="number-input" type="number" min="2" max="8" value={activeWidget.h} onChange={(event) => updateWidget({ h: Number(event.target.value) })} />
                </div>
              </div>

              {activeWidget.type === "kpi" ? (
                <div className="field">
                  <label>Select metric</label>
                  <select className="filter-select" value={activeWidget.settings?.metric || "totalOrders"} onChange={(event) => updateSettings({ metric: event.target.value })}>
                    {KPI_METRICS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              ) : null}

              {["bar", "line", "area"].includes(activeWidget.type) ? (
                <>
                  <div className="field">
                    <label>Choose X-axis data</label>
                    <select className="filter-select" value={activeWidget.settings?.xKey || "product"} onChange={(event) => updateSettings({ xKey: event.target.value })}>
                      {CATEGORY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Choose Y-axis data</label>
                    <select className="filter-select" value={activeWidget.settings?.yKey || "totalAmount"} onChange={(event) => updateSettings({ yKey: event.target.value })}>
                      {NUMERIC_FIELD_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                </>
              ) : null}

              {activeWidget.type === "scatter" ? (
                <>
                  <div className="field">
                    <label>Choose X-axis data</label>
                    <select className="filter-select" value={activeWidget.settings?.xKey || "quantity"} onChange={(event) => updateSettings({ xKey: event.target.value })}>
                      {NUMERIC_FIELD_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Choose Y-axis data</label>
                    <select className="filter-select" value={activeWidget.settings?.yKey || "totalAmount"} onChange={(event) => updateSettings({ yKey: event.target.value })}>
                      {NUMERIC_FIELD_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                </>
              ) : null}

              {activeWidget.type === "pie" ? (
                <>
                  <div className="field">
                    <label>Choose chart data</label>
                    <select className="filter-select" value={activeWidget.settings?.chartKey || "product"} onChange={(event) => updateSettings({ chartKey: event.target.value })}>
                      {CATEGORY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                  <label className="check-item">
                    <input type="checkbox" checked={Boolean(activeWidget.settings?.showLegend)} onChange={(event) => updateSettings({ showLegend: event.target.checked })} />
                    Show legend
                  </label>
                </>
              ) : null}

              {activeWidget.type === "table" ? (
                <div className="field">
                  <label>Table columns</label>
                  <div className="check-grid">
                    {TABLE_COLUMNS.map((column) => {
                      const selected = activeWidget.settings?.columns?.includes(column.value);
                      return (
                        <label key={column.value} className="check-item">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={(event) => {
                              const nextColumns = activeWidget.settings?.columns || [];
                              const updatedColumns = event.target.checked
                                ? [...nextColumns, column.value]
                                : nextColumns.filter((item) => item !== column.value);
                              updateSettings({ columns: updatedColumns.length ? updatedColumns : ["customer", "product", "quantity", "totalAmount"] });
                            }}
                          />
                          {column.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="empty-state" style={{ minHeight: 260 }}>
              <div>
                <div className="empty-icon">cfg</div>
                <h3>Select a widget</h3>
                <p className="muted-text">Choose a card on the canvas to edit its title, size, and data settings.</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default ConfigureDashboard;
