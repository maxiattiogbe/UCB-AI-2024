import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "src/utils/db";
import { ObjectId } from "mongodb";

// export const dynamic = "force-dynamic"; // defaults to auto

// Get all the finished training sessions
export async function GET(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Sessions");

  const { userId, getToken } = auth();

  const query = { userId: userId };
  let success = true;
  const sessions = await collection.find(query).toArray();

  if (sessions == null) {
    success = false;
  }

  for (const sess of sessions) {
    const scenariosCollection = database.collection("Scenarios");
    const scenarioQuery = { _id: new ObjectId(sess.scenarioId) };
    const scenario = await scenariosCollection.findOne(scenarioQuery);
    sess.scenarioName = scenario.scenario_title;
  }

  client.close();
  return Response.json({ success, sessions });
}
