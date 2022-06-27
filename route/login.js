const { MongoClient, ServerApiVersion } = require("mongodb");
import { sign } from "jsonwebtoken";


class login {
  entrar(request, response) {
    const uri =
      "mongodb+srv://thaismoreira:12345@cluster0.t9v6c.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    client.connect((err) => {
      const collection = client.db("projeto").collection("users");

       
        collection.find(request.body).toArray((err, user) => {
            if (err) {
              console.log(err);
              return;
            }
            if (user.length < 1) {
                return response.status(404).json({ erro: "Erro de autenticação." });
            }
            if (user.length < 1) {
                return response.status(404).json({ erro: "Erro de autenticação." });
            }
    

            const token = sign({}, "codigoSecreto", {
                subject: new String(user.username),
                expiresIn: "1h",
              });
              
              return response.json({token});
          });
        });


    client.close();
  }
}

export default new login();
