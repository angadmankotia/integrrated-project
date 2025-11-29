// backend/server.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', apiRoutes);


// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));