const express = require("express");
const exphbs = require("express-handlebars").engine;
const employee = require("./controllers/employee");
const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(employee);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
