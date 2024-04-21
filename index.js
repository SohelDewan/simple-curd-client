const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://codersohel202:TQkW4zYV6BKxdgzH@cluster0.i2cqtwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usersCollections = database.collection("users");
    
    app.get("/users", async (req, res)=>{
      const result = await usersCollections.find({}).toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const user = await usersCollections.findOne(query);
      res.send(user);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user',user);
      const result = await usersCollections.insertOne(user);
      res.send(result);

    })

    app.put('/users/:id', async (req, res)=>{
      const id = req.params.id;
      const userBody = req.body;
      console.log('updated user',id,userBody);
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: userBody.name,
          email: userBody.email,
        }
      }
      const result = await usersCollections.updateOne(filter, updatedUser ,options);
      res.send(result);
    })

    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id);
      const query = {_id: new ObjectId(id)};
      const result = await usersCollections.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
//TQkW4zYV6BKxdgzH codersohel202 sample_mflix
// mongodb+srv://codersohel202:<password>@cluster0.i2cqtwl.mongodb.net/
// to connect to the mongodb server (nodemon index.js)