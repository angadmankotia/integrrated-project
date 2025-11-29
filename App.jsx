import React from 'react';
import ItemList from './components/ItemList';


export default function App(){
return (
<div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
<h1>Fullstack Integration Demo</h1>
<ItemList />
</div>
);
}