import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "src/utils/db";
import { ObjectId } from "mongodb";

const SAMPLE_SCENARIO_1 = {
  scenario_title: "Coping with Academic Pressure",
  scenario_hint: "A student struggling with the demands of college life.",
  name: "Alex",
  age: 19,
  gender: "Male",
  occupation: "College Student",
  background: "Overwhelmed with school and personal issues.",
  actions:
    '"Withdraws from social activities.","Stops attending classes regularly.","Exhibits changes in sleep and eating patterns.",',
  words:
    '"I can\'t handle this anymore. It\'s too much.","I feel like I\'m a burden to everyone.","What\'s the point of trying if nothing ever gets better?"',
  context:
    "Alex is a freshman at college, struggling with the transition from high school. He is dealing with academic pressure, homesickness, and a recent breakup.",
  questions: {
    q1: "What are the signs that Alex is struggling with his mental health?",
    q1_response:
      "Alex is withdrawing from social activities, skipping classes, and showing changes in sleep and eating habits.",
    q2: "How can Alex's friends and family support him?",
    q2_response:
      "They can offer a listening ear, encourage him to seek counseling, and help him create a balanced routine.",
    q3: "What resources are available at college for students like Alex?",
    q3_response:
      "Most colleges have counseling services, support groups, and academic advisors who can assist students in managing their stress and workload.",
  },
  humePromptId: "828af814-a392-472a-b498-b4207d6d5d13",
  humeConfigId: "9563ff7c-b5cb-4888-bc0a-2537fd747981"
};

const SAMPLE_SCENARIO_2 = {
  scenario_title: "Balancing Work and Personal Life",
  scenario_hint: "A young professional dealing with burnout.",
  name: "Emily",
  age: 26,
  gender: "Female",
  occupation: "Software Engineer",
  background: "Works long hours and feels isolated from friends and family.",
  actions:
    '"Frequently stays late at the office.","Cancels plans with friends and family.","Shows signs of exhaustion and irritability.",',
  words:
    '"I have so much work to do, I can\'t take a break.","I don\'t have time for anything else in my life.","Why bother making plans if I\'m just going to cancel them?",',
  context:
    "Emily is a dedicated software engineer who recently got a promotion. She is struggling to maintain a work-life balance and feels increasingly isolated and stressed.",
  questions: {
    q1: "What are the risks of not addressing Emily's burnout?",
    q1_response:
      "If not addressed, Emily's burnout could lead to serious health issues, decreased productivity, and possible job dissatisfaction.",
    q2: "What strategies can Emily use to improve her work-life balance?",
    q2_response:
      "Emily can set clear boundaries, schedule regular breaks, and prioritize time with loved ones.",
    q3: "How can Emily's employer support her in managing burnout?",
    q3_response:
      "The employer can offer flexible working hours, promote a healthy work-life balance, and provide access to wellness programs.",
  },
  humePromptId: "88804d53-eddb-4077-a0a3-455a356e9579",
  humeConfigId: "65e6b47f-ee53-4d6e-9021-47567c37ae00"
};

const SAMPLE_SCENARIO_3 = {
  scenario_title: "Transitioning to a New Environment",
  scenario_hint: "An international student adapting to life in a new country.",
  name: "Rahul",
  age: 22,
  gender: "Male",
  occupation: "Graduate Student",
  background:
    "Moved to a new country for higher education, facing cultural and language barriers.",
  actions:
    '"Struggles to communicate with peers.","Feels homesick and isolated.","Avoids participating in class discussions.",',
  words:
    '"I miss my family and my home.","It\'s hard to fit in when I don\'t understand everything.","I\'m not sure I made the right decision coming here.",',
  context:
    "Rahul moved from India to the United States for his master's degree. He is facing challenges in adapting to the new culture and language, and is feeling increasingly isolated.",
  questions: {
    q1: "What challenges is Rahul facing in his new environment?",
    q1_response:
      "Rahul is struggling with language barriers, cultural differences, and feelings of homesickness.",
    q2: "How can Rahul's university support him in his transition?",
    q2_response:
      "The university can provide language support programs, cultural exchange activities, and counseling services.",
    q3: "What can Rahul do to feel more connected and less isolated?",
    q3_response:
      "Rahul can join student groups, participate in cultural events, and reach out to fellow international students for support.",
  },
  humePromptId: "a711ecf1-2f4e-4895-a903-2cee4165f28b",
  humeConfigId: "c53574be-27db-48f8-af86-12e2044be676"
};

// Get all the training scenarios
export async function GET(req: Request) {
  const client = await connectToDB();
  const database = client.db("HopeDB");
  const collection = database.collection("Scenarios");

  const { userId, getToken } = auth();

  const lst = [SAMPLE_SCENARIO_1, SAMPLE_SCENARIO_2, SAMPLE_SCENARIO_3];
  for (const scenario of lst) {
    scenario.createdBy = userId;
    scenario.createdAt = new Date();
    const result = await collection.insertOne(scenario);
  }

  client.close();
  return Response.json({});
}
