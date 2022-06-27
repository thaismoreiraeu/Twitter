const  path = require("path"),
  express = require("express"),
  app = express();

import cadastraUser from "./route/cadastraUser";


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


app.post("/cadastrar", cadastraUser.cadastrar);


app.listen(3000);
