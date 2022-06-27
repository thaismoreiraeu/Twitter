const { MongoClient, ServerApiVersion } = require("mongodb");

class cadastraUser {
  cadastrar(req, res) {
    const { username, password } = req.body;

    const uri =
      "mongodb+srv://thaismoreira:12345@cluster0.t9v6c.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    client.connect((err) => {
      const collection = client.db("projeto").collection("users");

      try {
        collection.insertOne({
          username: username,
          password: password,
        });
        return res.json({ data: "Cadastrado" });
      } catch (error) {
        console.log(error);
      }

      client.close();
    });
  }

}

export default new cadastraUser();
