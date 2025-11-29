import React, { useEffect, useState, useRef } from 'react';
import { api } from '../api';


export default function ItemList(){
const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [search, setSearch] = useState('');
const searchRef = useRef(null);


// Debounce search
useEffect(()=>{
const t = setTimeout(()=>{
// in a real app we'd call an endpoint with `q=search`
load(page);
}, 350);
return ()=>clearTimeout(t);
}, [search, page]);


async function load(p=1){
setLoading(true);
try{
const resp = await api.listItems(p, 10);
setItems(resp.items);
}catch(e){
console.error('Failed to load', e);
}finally{setLoading(false)}
}


useEffect(()=>{ load(1); }, []);


async function addItem(){
const optimistic = { id: 'tmp-'+Date.now(), title: 'New item', description: '', price: 0 };
setItems(prev=>[optimistic, ...prev]); // optimistic UI
try{
const created = await api.createItem({ title: 'New item', price: 0 });
setItems(prev=>prev.map(i => i.id===optimistic.id ? created : i));
}catch(e){
setItems(prev => prev.filter(i=>i.id!==optimistic.id));
console.error('Failed to create', e);
}
}


return (
<div>
<div style={{ display: 'flex', gap: 8 }}>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search (debounced)" />
<button onClick={addItem}>Add</button>
</div>
{loading ? <div>Loading...</div> : (
<ul>
{items.map(it => <li key={it.id}>{it.title} — ${it.price}</li> )}
</ul>
)}
<div>
<button onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
<span>Page {page}</span>
<button onClick={()=>setPage(p=>p+1)}>Next</button>
</div>
</div>
);
}