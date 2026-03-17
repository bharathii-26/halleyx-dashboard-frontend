function KPIWidget({ title, value, note }) {
  return (
    <div className="kpi-card">
      <h4>{title}</h4>
      <strong>{value}</strong>
      <p className="muted-text">{note}</p>
    </div>
  );
}

export default KPIWidget;
