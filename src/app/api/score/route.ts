import { HumeClient } from "hume";

// export const dynamic = "force-dynamic"; // defaults to auto

const hume = new HumeClient({
  apiKey: process.env.HUME_API_KEY,
});

// Get the score training session,
export async function POST(req: Request) {
  const shet = await req.json();
  console.log(shet);

  const job = await hume.expressionMeasurement.batch.startInferenceJob({
    models: {
      face: {},
    },
    urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"],
  });

  console.log("Running...");
  await job.awaitCompletion();

  const predictions = await hume.expressionMeasurement.batch.getJobPredictions(
    job.jobId,
  );
  console.log(predictions);

  return Response.json(predictions);
}
