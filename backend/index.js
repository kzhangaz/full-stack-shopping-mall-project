import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 8080; // default port to listen

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
app.use(bodyParser.urlencoded({extended: false}));

// app.listen(port, () => {
//    console.log(`server started at http://localhost:${port}`);
// });

app.get("/items", async (req, res) => {
    const collection = db.collection("items");
    const result = await collection.find({}).toArray()
    return res.json(result);
});

let db;
const client = new MongoClient(process.env.ATLAS_URI); 
client.connect()
        .then(() => {
            console.log('Connected successfully to server');
            db = client.db("my-shopping-app");
            app.listen(port, () => {
                console.log(`server started at http://localhost:${port}`);
            });
        })
        .catch((err) => {
            console.log("error connecting to mongoDB!",err);
        });