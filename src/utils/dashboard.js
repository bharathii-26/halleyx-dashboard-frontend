export const DASHBOARD_STORAGE_KEY = "halleyx-dashboard-widgets-v2";

export const PRODUCT_PRICES = {
  "Fiber Internet 300 Mbps": 100,
  "5G Unlimited Mobile Plan": 120,
  "Fiber Internet 1 Gbps": 150,
  "Business Internet 500 Mbps": 200,
  "VoIP Corporate Package": 95,
};

export const COUNTRY_OPTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const STATUS_OPTIONS = ["Pending", "In progress", "Completed"];

export const CREATED_BY_OPTIONS = [
  "Mr. Michael Harris",
  "Mr. Ryan Cooper",
  "Ms. Olivia Carter",
  "Mr. Lucas Martin",
];

export const FILTER_OPTIONS = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

export const KPI_METRICS = [
  { value: "totalOrders", label: "Total Orders" },
  { value: "totalRevenue", label: "Total Revenue" },
  { value: "averageOrder", label: "Average Order" },
  { value: "totalQuantity", label: "Total Quantity" },
];

export const CHART_DIMENSIONS = {
  bar: { w: 5, h: 4 },
  line: { w: 5, h: 4 },
  area: { w: 5, h: 4 },
  scatter: { w: 5, h: 4 },
  pie: { w: 4, h: 4 },
  kpi: { w: 2, h: 2 },
  table: { w: 6, h: 4 },
};

export const WIDGET_LIBRARY = [
  {
    title: "Charts",
    items: [
      { type: "bar", label: "Bar Chart" },
      { type: "line", label: "Line Chart" },
      { type: "pie", label: "Pie Chart" },
      { type: "area", label: "Area Chart" },
      { type: "scatter", label: "Scatter Plot" },
    ],
  },
  {
    title: "Tables",
    items: [{ type: "table", label: "Table" }],
  },
  {
    title: "KPIs",
    items: [{ type: "kpi", label: "KPI Value" }],
  },
];

export const TABLE_COLUMNS = [
  { value: "orderId", label: "Order ID" },
  { value: "customerId", label: "Customer ID" },
  { value: "customer", label: "Customer" },
  { value: "createdAt", label: "Order Date" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "address", label: "Address" },
  { value: "product", label: "Product" },
  { value: "quantity", label: "Quantity" },
  { value: "unitPrice", label: "Unit Price" },
  { value: "totalAmount", label: "Total Amount" },
  { value: "status", label: "Status" },
  { value: "createdBy", label: "Created By" },
];

export const CATEGORY_OPTIONS = [
  { value: "product", label: "Product" },
  { value: "customer", label: "Customer" },
  { value: "email", label: "Email" },
];

export const NUMERIC_FIELD_OPTIONS = [
  { value: "quantity", label: "Quantity" },
  { value: "unitPrice", label: "Unit Price" },
  { value: "totalAmount", label: "Total Amount" },
];

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

export function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function normalizeOrder(order) {
  const product = order.product || "";
  const quantity = Number(order.quantity || 0);
  const unitPrice = Number(order.unitPrice || PRODUCT_PRICES[product] || 0);
  const totalAmount = Number(order.totalAmount || quantity * unitPrice);
  const firstName = order.firstName || "";
  const lastName = order.lastName || "";
  const customerName = `${firstName} ${lastName}`.trim();
  const addressParts = [order.address, order.city, order.state, order.postalCode, order.country]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  return {
    ...order,
    firstName,
    lastName,
    product,
    quantity,
    unitPrice,
    totalAmount,
    customerName,
    addressDisplay: addressParts.join(", "),
    status: order.status || "Pending",
    createdBy: order.createdBy || "Not assigned",
  };
}

function formatSequence(prefix, value) {
  if (!value) {
    return "-";
  }

  return `${prefix}-${String(value).padStart(4, "0")}`;
}

export function orderFieldValue(order, field) {
  const normalized = normalizeOrder(order);

  switch (field) {
    case "orderId":
      return formatSequence("ORD", normalized.id);
    case "customerId":
      return formatSequence("CUST", normalized.id);
    case "customer":
      return normalized.customerName || "Untitled customer";
    case "createdAt":
      return normalized.createdAt || null;
    case "email":
      return normalized.email || "-";
    case "phone":
      return normalized.phone || "-";
    case "address":
      return normalized.addressDisplay || "-";
    case "product":
      return normalized.product || "-";
    case "quantity":
      return normalized.quantity;
    case "unitPrice":
      return normalized.unitPrice;
    case "totalAmount":
      return normalized.totalAmount;
    case "status":
      return normalized.status || "Pending";
    case "createdBy":
      return normalized.createdBy || "Not assigned";
    default:
      return normalized[field] ?? "-";
  }
}

export function filterOrdersByRange(orders, range) {
  const list = Array.isArray(orders) ? orders.map(normalizeOrder) : [];

  if (range === "all") {
    return list;
  }

  const now = new Date();

  return list.filter((order) => {
    if (!order.createdAt) {
      return false;
    }

    const createdAt = new Date(order.createdAt);

    if (Number.isNaN(createdAt.getTime())) {
      return false;
    }

    if (range === "today") {
      return createdAt.toDateString() === now.toDateString();
    }

    const days = Number(range || 0);
    if (!days) {
      return true;
    }

    const threshold = new Date(now);
    threshold.setDate(now.getDate() - days);
    return createdAt >= threshold;
  });
}

export function summarizeOrders(orders) {
  const list = Array.isArray(orders) ? orders.map(normalizeOrder) : [];
  const totalOrders = list.length;
  const totalRevenue = list.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const totalQuantity = list.reduce((sum, order) => sum + Number(order.quantity || 0), 0);

  return {
    totalOrders,
    totalRevenue,
    totalQuantity,
    averageOrder: totalOrders ? totalRevenue / totalOrders : 0,
  };
}

export function getKpiSnapshot(metric, orders) {
  const summary = summarizeOrders(orders);

  switch (metric) {
    case "totalRevenue":
      return {
        title: "Total Revenue",
        value: formatCurrency(summary.totalRevenue),
        note: `${formatNumber(summary.totalOrders)} order${summary.totalOrders === 1 ? "" : "s"}`,
      };
    case "averageOrder":
      return {
        title: "Average Order",
        value: formatCurrency(summary.averageOrder),
        note: "Average revenue per order",
      };
    case "totalQuantity":
      return {
        title: "Total Quantity",
        value: formatNumber(summary.totalQuantity),
        note: "Units sold",
      };
    case "totalOrders":
    default:
      return {
        title: "Total Orders",
        value: formatNumber(summary.totalOrders),
        note: formatCurrency(summary.totalRevenue),
      };
  }
}

function createId() {
  return `widget-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createWidget(type) {
  const size = CHART_DIMENSIONS[type] || { w: 4, h: 4 };
  const common = { id: createId(), type, description: "", ...size };

  switch (type) {
    case "kpi":
      return { ...common, title: "Total Orders", settings: { metric: "totalOrders" } };
    case "bar":
      return { ...common, title: "Revenue by Product", settings: { xKey: "product", yKey: "totalAmount", showLegend: false } };
    case "line":
      return { ...common, title: "Quantity by Product", settings: { xKey: "product", yKey: "quantity", showLegend: false } };
    case "area":
      return { ...common, title: "Sales Area", settings: { xKey: "product", yKey: "totalAmount", showLegend: false } };
    case "scatter":
      return { ...common, title: "Quantity vs Revenue", settings: { xKey: "quantity", yKey: "totalAmount", showLegend: false } };
    case "pie":
      return { ...common, title: "Product Share", settings: { chartKey: "product", showLegend: true } };
    case "table":
      return { ...common, title: "Pending Orders", settings: { columns: ["customer", "product", "quantity", "totalAmount"] } };
    default:
      return { ...common, title: "Untitled Widget", settings: {} };
  }
}

export function getSavedWidgets() {
  try {
    const raw = localStorage.getItem(DASHBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to read dashboard widgets", error);
    return [];
  }
}

export function saveWidgets(widgets) {
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(widgets));
}

export function parseWidgetsJson(widgetsJson) {
  try {
    if (!widgetsJson) {
      return [];
    }

    const parsed = JSON.parse(widgetsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to parse dashboard widgets json", error);
    return [];
  }
}

export function buildGridStyles(widget) {
  return {
    gridColumn: `span ${Math.max(1, Number(widget.w || 1))}`,
    gridRow: `span ${Math.max(1, Number(widget.h || 1))}`,
  };
}

export function buildSeriesData(widget, orders) {
  const list = Array.isArray(orders) ? orders.map(normalizeOrder) : [];
  const settings = widget.settings || {};

  if (!list.length) return [];

  if (widget.type === "scatter") {
    return list.map((order, index) => ({
      name: `${orderFieldValue(order, "customer")} ${index + 1}`,
      x: Number(orderFieldValue(order, settings.xKey || "quantity")),
      y: Number(orderFieldValue(order, settings.yKey || "totalAmount")),
    }));
  }

  if (widget.type === "pie") {
    const key = settings.chartKey || "product";
    const grouped = list.reduce((accumulator, order) => {
      const label = String(orderFieldValue(order, key) || "Unknown");
      accumulator[label] = (accumulator[label] || 0) + Number(order.totalAmount || 0);
      return accumulator;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }

  const xKey = settings.xKey || "product";
  const yKey = settings.yKey || "totalAmount";
  const grouped = list.reduce((accumulator, order) => {
    const label = String(orderFieldValue(order, xKey) || "Unknown");
    accumulator[label] = (accumulator[label] || 0) + Number(orderFieldValue(order, yKey) || 0);
    return accumulator;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}
