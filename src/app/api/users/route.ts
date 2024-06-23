import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "src/utils/db";

// export const dynamic = "force-dynamic"; // defaults to auto

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
