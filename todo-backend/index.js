const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5001;

app.use(express.json({ extended: false}));

app.use(routes.todoRoutes);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})