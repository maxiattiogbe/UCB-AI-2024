import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "src/utils/db";
import { ObjectId } from "mongodb";
import { getFormattedPrompt, humeInstance } from "@/components/chat/constants";

// export const dynamic = "force-dynamic"; // defaults to auto

// Get all the training scenarios
export async function GET(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Scenarios");

  const { userId, getToken } = auth();

  const query = { createdBy: userId };
  let success = true;
  const scenario = await collection.find(query).toArray();

  if (scenario == null) {
    success = false;
  }

  client.close();
  return Response.json({ success, scenario });
}

// Create a new scenario using POST
export async function POST(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Scenarios");

  const { userId, getToken } = auth();

  const scenario = await req.json();
  scenario.createdBy = userId;
  scenario.createdAt = new Date();

  
  // Integrate HUME
  // 1. Create prompt ID
  const result = await collection.insertOne(scenario);
  
  const insertPromptResult = (await humeInstance.post("/evi/prompts", {
    name: "prompt-" + result.insertedId.toString(),
    text: getFormattedPrompt(scenario)
  })).data

  const insertConfigResult = (await humeInstance.post("/evi/configs", {
    name: `config-${result.insertedId.toString()}`,
    prompt: {
      id: insertPromptResult.id,
    },
    voice: {
      name: scenario.gender === "Male" ? "ITO" : "KORA"
    }
  })).data

  await collection.updateOne({ _id: result.insertedId }, { $set: {
    humePromptId: insertPromptResult.id,
    humeConfigId: insertConfigResult.id
  } })
  
  client.close();

  return Response.json(result);
}

// Update a scenario using PUT
export async function PUT(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Scenarios");

  const { userId, getToken } = auth();

  const scenario = await req.json();
  scenario.createdBy = userId;
  scenario.createdAt = new Date();

  const filter = { _id: new ObjectId(scenario._id) };
  scenario._id = new ObjectId(scenario._id);

  const result = await collection.replaceOne(filter, scenario);

  client.close();
  return Response.json(result);
}

// Delete a scenario using DELETE
export async function DELETE(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Scenarios");

  const { userId, getToken } = auth();

  const scenario = await req.json();

  const result = await collection.deleteOne({
    _id: new ObjectId(scenario._id),
  });

  client.close();
  return Response.json(result);
}
