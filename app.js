const PORT = process.env.PORT || 3000;
const  path = require("path"),
  express = require("express"),
  app = express();

import cadastraUser from "./route/cadastraUser";
import login from "./route/login";


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.post("/cadastrar", cadastraUser.cadastrar);
app.post("/login", login.entrar)


app.listen(PORT);
