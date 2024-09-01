const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("todos_mongodb");
    const collection = database.collection("allTodos");
    const query= [{ title: "Todo1" }, { title: "Todo2" }];
    const result = await collection.insertMany(query);

    console.log(result);
  } finally {
   
  }
} 
run().catch((error) => {
  console.log("Error here");
  // console.log(error);
});
