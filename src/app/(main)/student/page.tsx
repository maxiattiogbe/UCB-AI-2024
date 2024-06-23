"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Grid, Paper, Button, Typography } from "@mui/material";

function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();

  // You can use the User for the info

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }

    const fetchScenarios = async () => {
      const response = await fetch("/api/scenarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success === false) {
        setError("Failed to fetch scenarios");
      } else {
        setData(data.scenario);
        console.log(data.scenario);
      }
      setLoading(false);
    };

    fetchScenarios();
  }, [isLoaded, isSignedIn, router]);

  const scenarios = ["Scenario 1", "Scenario 2"];
  const results = ["Prev-result 1", "result 2"];

  if (loading) {
    return <div>Loading</div>;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      {/* <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
            <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded> */}

      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Training Sessions</Typography>
        </Grid>

        {data.map((scenario, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              elevation={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              <div className="flex flex-col">
                <Typography variant="h6">{scenario.scenario_title}</Typography>
                <Typography color="text.secondary">
                  {scenario.scenario_hint}
                </Typography>
              </div>
              <Button variant="contained" color="primary">
                Start session
              </Button>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h4">Previous Results</Typography>
        </Grid>

        {results.map((result, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              elevation={3}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              <Typography variant="h6">{result}</Typography>
              <Button variant="contained" color="secondary">
                View result
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
