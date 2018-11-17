const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});