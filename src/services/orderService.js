
const API_URL = "http://localhost:8080/api/orders";

export const getOrders = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createOrder = async (order) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });
  return response.json();
};

export const updateOrder = async (id, order) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });
  return response.json();
};

export const deleteOrder = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};
