import { HumeClient } from "hume";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "src/utils/db";
import { ObjectId } from "mongodb";

// export const dynamic = "force-dynamic"; // defaults to auto

const hume = new HumeClient({
  apiKey: process.env.HUME_API_KEY,
});

// Make a POST request to the /api/score endpoint
// {
//     "url": "https://hume-tutorials.s3.amazonaws.com/faces.zip"
// }
/* Get the score training session
   - Provide a url to the video recording

   todo: Probably have it get it by id and then check mongodb to see if it exists
   if it does then return the already processed, if it doesn't then process it
   so probably change this back to a GET request
*/
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  // const { userId, getToken } = auth();
  const slug = params.slug;
  console.log("SLUG: ", slug);

  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Sessions");

  const query = { _id: new ObjectId(slug) };
  const session = await collection.findOne(query);
  const url = session.recordingUrl;
  const processedRecording = session.processedRecording;
  if (processedRecording != null) {
    client.close();
    return Response.json(processedRecording);
  }

  const job = await hume.expressionMeasurement.batch.startInferenceJob({
    models: {
      burst: {},
      prosody: {},
      language: {},
    },
    urls: [url],
  });

  console.log("Running...");
  await job.awaitCompletion();

  const predictions = await hume.expressionMeasurement.batch.getJobPredictions(
    job.jobId,
  );

  // console.log(predictions[0].results);
  session.processedRecording = predictions;
  const res = await collection.replaceOne(query, session);

  client.close();
  return Response.json(session.processedRecording);
}
