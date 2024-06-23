import { auth } from "@clerk/nextjs/server";
import { MongoClient } from "mongodb";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function connectToDB() {
  const uri = process.env.DB_CONN_STRING || "";
  const client = new MongoClient(uri);
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  return client;
}

export async function GET(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Users");

  const { userId, getToken } = auth();

  const query = { userId: userId };
  let validUser = await collection.findOne(query);
  if (validUser == null) {
    await collection.insertOne({
      userId: userId,
      sessions: [],
    });

    validUser = await collection.findOne(query);
  }

  client.close();
  return Response.json(validUser);
}
