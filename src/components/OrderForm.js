import { useEffect, useState } from "react";
import {
  COUNTRY_OPTIONS,
  CREATED_BY_OPTIONS,
  PRODUCT_PRICES,
  STATUS_OPTIONS,
} from "../utils/dashboard";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  product: "",
  quantity: 1,
  unitPrice: 0,
  totalAmount: 0,
  status: "Pending",
  createdBy: "",
};

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "postalCode",
  "country",
  "product",
  "quantity",
  "unitPrice",
  "totalAmount",
  "status",
  "createdBy",
];

function normalizeForm(values) {
  const quantity = Math.max(1, Number(values.quantity || 1));
  const unitPrice = Number(values.unitPrice || 0);

  return {
    ...values,
    quantity,
    unitPrice,
    totalAmount: Number((quantity * unitPrice).toFixed(2)),
  };
}

function OrderForm({
  initialValues = EMPTY_FORM,
  onSubmit,
  onCancel,
  submitLabel = "Create order",
  title = "Create order",
  showStatusField = true,
}) {
  const [formData, setFormData] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...EMPTY_FORM, ...initialValues });
    setErrors({});
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...formData, [name]: value };

    if (name === "product") {
      const suggestedPrice = PRODUCT_PRICES[value] || 0;
      nextValues.unitPrice = suggestedPrice;
      nextValues.totalAmount = Number((suggestedPrice * Number(nextValues.quantity || 1)).toFixed(2));
    }

    if (name === "quantity") {
      const quantity = Math.max(1, Number(value || 1));
      nextValues.quantity = quantity;
      nextValues.totalAmount = Number((quantity * Number(nextValues.unitPrice || 0)).toFixed(2));
    }

    if (name === "unitPrice") {
      const unitPrice = Number(value || 0);
      nextValues.unitPrice = unitPrice;
      nextValues.totalAmount = Number((Number(nextValues.quantity || 1) * unitPrice).toFixed(2));
    }

    setFormData(nextValues);
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    REQUIRED_FIELDS.forEach((field) => {
      const value = formData[field];

      if (field === "quantity") {
        if (Number(value || 0) < 1) {
          nextErrors.quantity = "Please fill the field";
        }
        return;
      }

      if (field === "unitPrice" || field === "totalAmount") {
        if (Number(value || 0) <= 0) {
          nextErrors[field] = "Please fill the field";
        }
        return;
      }

      if (!String(value ?? "").trim()) {
        nextErrors[field] = "Please fill the field";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(normalizeForm(formData));
      setFormData(EMPTY_FORM);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <div>
          <h3>{title}</h3>
          <p className="muted-text">Capture customer information, order details, and workflow status in one place.</p>
        </div>
        <button type="button" className="icon-button" onClick={onCancel}>
          x
        </button>
      </div>

      <div className="modal-content">
        <div className="form-grid">
          <div className="field full">
            <label>Customer Information</label>
          </div>

          <div className="field">
            <label>First name *</label>
            <input className="text-input" name="firstName" placeholder="First name *" value={formData.firstName} onChange={handleChange} />
            {errors.firstName ? <span className="validation-text">{errors.firstName}</span> : null}
          </div>
          <div className="field">
            <label>Email id *</label>
            <input className="text-input" name="email" type="email" placeholder="Email id *" value={formData.email} onChange={handleChange} />
            {errors.email ? <span className="validation-text">{errors.email}</span> : null}
          </div>
          <div className="field">
            <label>Last name *</label>
            <input className="text-input" name="lastName" placeholder="Last name *" value={formData.lastName} onChange={handleChange} />
            {errors.lastName ? <span className="validation-text">{errors.lastName}</span> : null}
          </div>
          <div className="field">
            <label>Phone number *</label>
            <input className="text-input" name="phone" placeholder="Phone number *" value={formData.phone} onChange={handleChange} />
            {errors.phone ? <span className="validation-text">{errors.phone}</span> : null}
          </div>
          <div className="field full">
            <label>Street Address *</label>
            <input className="text-input" name="address" placeholder="Street Address *" value={formData.address} onChange={handleChange} />
            {errors.address ? <span className="validation-text">{errors.address}</span> : null}
          </div>
          <div className="field">
            <label>City *</label>
            <input className="text-input" name="city" placeholder="City *" value={formData.city} onChange={handleChange} />
            {errors.city ? <span className="validation-text">{errors.city}</span> : null}
          </div>
          <div className="field">
            <label>State / Province *</label>
            <input className="text-input" name="state" placeholder="State / Province *" value={formData.state} onChange={handleChange} />
            {errors.state ? <span className="validation-text">{errors.state}</span> : null}
          </div>
          <div className="field">
            <label>Postal code *</label>
            <input className="text-input" name="postalCode" placeholder="Postal code *" value={formData.postalCode} onChange={handleChange} />
            {errors.postalCode ? <span className="validation-text">{errors.postalCode}</span> : null}
          </div>
          <div className="field">
            <label>Country *</label>
            <select className="filter-select" name="country" value={formData.country} onChange={handleChange}>
              <option value="" disabled>Choose country</option>
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country ? <span className="validation-text">{errors.country}</span> : null}
          </div>

          <div className="field full">
            <label>Order Information</label>
          </div>

          <div className="field full">
            <label>Choose product *</label>
            <select className="filter-select" name="product" value={formData.product} onChange={handleChange}>
              <option value="" disabled>Choose product</option>
              {Object.keys(PRODUCT_PRICES).map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
            {errors.product ? <span className="validation-text">{errors.product}</span> : null}
          </div>
          <div className="field">
            <label>Quantity *</label>
            <input className="number-input" name="quantity" type="number" min="1" placeholder="Quantity *" value={formData.quantity} onChange={handleChange} />
            {errors.quantity ? <span className="validation-text">{errors.quantity}</span> : null}
          </div>
          <div className="field">
            <label>Unit price *</label>
            <div className="input-prefix">
              <span>$</span>
              <input className="text-input" name="unitPrice" type="number" min="0" step="0.01" placeholder="Unit price *" value={formData.unitPrice} onChange={handleChange} />
            </div>
            {errors.unitPrice ? <span className="validation-text">{errors.unitPrice}</span> : null}
          </div>
          <div className="field">
            <label>Total amount *</label>
            <div className="input-prefix read-only">
              <span>$</span>
              <input className="text-input" name="totalAmount" readOnly placeholder="Total amount *" value={formData.totalAmount} />
            </div>
            {errors.totalAmount ? <span className="validation-text">{errors.totalAmount}</span> : null}
          </div>
          {showStatusField ? (
            <div className="field">
              <label>Status *</label>
              <select className="filter-select" name="status" value={formData.status} onChange={handleChange}>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status ? <span className="validation-text">{errors.status}</span> : null}
            </div>
          ) : (
            <input type="hidden" name="status" value={formData.status} />
          )}
          <div className="field full">
            <label>Created by *</label>
            <select className="filter-select" name="createdBy" value={formData.createdBy} onChange={handleChange}>
              <option value="" disabled>Choose owner</option>
              {CREATED_BY_OPTIONS.map((person) => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
            {errors.createdBy ? <span className="validation-text">{errors.createdBy}</span> : null}
          </div>

          <div className="modal-actions inline-actions">
            <button type="button" className="button ghost" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button primary" disabled={isSaving}>
              {isSaving ? "Saving..." : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
