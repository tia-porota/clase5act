const express = require("express");

const router = require("./routes/routerBooks");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());
app.use("/books", router);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor local en puerto ${port}`);
});
