import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PIE_COLORS = ["#62d4d3", "#47afcb", "#328ab3", "#7257a2", "#9150a4", "#af2d8d", "#5f3da1"];

function PieWidget({ data, showLegend = true }) {
  if (!data.length) {
    return (
      <div className="chart-empty">
        <div>
          <strong>No distribution available</strong>
          <p className="muted-text">Once your orders are available, the share by category will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="40%" cy="50%" outerRadius="70%" innerRadius="42%" paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {showLegend ? <Legend layout="vertical" verticalAlign="middle" align="right" /> : null}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieWidget;
