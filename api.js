// frontend/src/api.js
const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';


async function request(path, opts = {}) {
const res = await fetch(`${BASE}${path}`, {
headers: { 'Content-Type': 'application/json' },
credentials: 'include',
...opts,
});
if (!res.ok) {
const errBody = await res.json().catch(()=>({}));
const err = new Error(errBody.error || 'Request failed');
err.status = res.status;
err.body = errBody;
throw err;
}
if (res.status === 204) return null;
return res.json();
}


export const api = {
listItems: (page=1, limit=10) => request(`/items?page=${page}&limit=${limit}`),
getItem: id => request(`/items/${id}`),
createItem: data => request('/items', { method: 'POST', body: JSON.stringify(data) }),
updateItem: (id, data) => request(`/items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
deleteItem: id => request(`/items/${id}`, { method: 'DELETE' }),
};