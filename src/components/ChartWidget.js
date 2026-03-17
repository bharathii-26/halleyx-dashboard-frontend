import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  bar: "#5bc39c",
  line: "#3b82f6",
  area: "#70a1ff",
  scatter: "#5bc39c",
};

function ChartWidget({ type, title, data, xLabel = "Category", yLabel = "Value", showLegend = false }) {
  if (!data.length) {
    return (
      <div className="chart-empty">
        <div>
          <strong>No chart data yet</strong>
          <p className="muted-text">Create an order or change the selected metric to populate this widget.</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === "bar" ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4ece9" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          {showLegend ? <Legend /> : null}
          <Bar dataKey="value" fill={COLORS.bar} radius={[10, 10, 0, 0]} name={title} />
        </BarChart>
      ) : null}

      {type === "line" ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4ece9" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} label={{ value: xLabel, position: "insideBottom", offset: -4 }} />
          <YAxis tickLine={false} axisLine={false} label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          {showLegend ? <Legend /> : null}
          <Line type="monotone" dataKey="value" stroke={COLORS.line} strokeWidth={3} dot={{ r: 4 }} name={title} />
        </LineChart>
      ) : null}

      {type === "area" ? (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4ece9" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} label={{ value: xLabel, position: "insideBottom", offset: -4 }} />
          <YAxis tickLine={false} axisLine={false} label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          {showLegend ? <Legend /> : null}
          <Area type="monotone" dataKey="value" stroke={COLORS.line} fill={COLORS.area} fillOpacity={0.45} name={title} />
        </AreaChart>
      ) : null}

      {type === "scatter" ? (
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4ece9" />
          <XAxis type="number" dataKey="x" tickLine={false} axisLine={false} name={xLabel} label={{ value: xLabel, position: "insideBottom", offset: -6 }} />
          <YAxis type="number" dataKey="y" tickLine={false} axisLine={false} name={yLabel} label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          {showLegend ? <Legend /> : null}
          <Scatter name={title} data={data} fill={COLORS.scatter} />
        </ScatterChart>
      ) : null}
    </ResponsiveContainer>
  );
}

export default ChartWidget;
