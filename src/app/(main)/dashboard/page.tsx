import React from "react";
import { currentUser } from "@clerk/nextjs/server";

async function Dashboard() {
  const user = await currentUser();
  console.log(user);

  return <div>Dashboard</div>;
}

export default Dashboard;
