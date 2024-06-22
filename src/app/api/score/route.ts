import { HumeClient } from "hume";

// export const dynamic = "force-dynamic"; // defaults to auto

const hume = new HumeClient({
  apiKey: process.env.HUME_API_KEY,
});

/* Get the score training session
   - Provide a url to the video recording

   todo: Probably have it get it by id and then check mongodb to see if it exists
   if it does then return the already processed, if it doesn't then process it
   so probably change this back to a GET request
*/
export async function POST(req: Request) {
  const { url } = await req.json();
  console.log(url);

  const job = await hume.expressionMeasurement.batch.startInferenceJob({
    models: {
      face: {},
    },
    urls: [url],
  });

  console.log("Running...");
  await job.awaitCompletion();

  const predictions = await hume.expressionMeasurement.batch.getJobPredictions(
    job.jobId,
  );
  console.log(predictions);

  return Response.json(predictions);
}
