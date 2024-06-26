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
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Grid, Paper, Button, Typography } from "@mui/material";

function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();

  // You can use the User for the info

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sessions, setSessions] = useState(null);
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

      const sessions = await fetch("/api/sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sessionData = await sessions.json();
      if (sessionData.success === false) {
        setError("Failed to fetch scenarios");
      } else {
        setSessions(sessionData.sessions);
        console.log(sessionData.sessions);
      }

      setLoading(false);
    };

    fetchScenarios();
  }, [isLoaded, isSignedIn, router]);

  const handleNewSession = async (scenario) => {
    const body = { scenario_id: scenario._id, user_id: user.id };

    // now make the POST request:
    const response = await (
      await fetch("https://www.jiaruishan.com/api/initialize-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    ).json();

    // router.push(response.joinUrl);
    window.open(response.joinUrl, "_blank");
  };

  if (loading) {
    return <div className="flex items-center justify-center" style={{height: "calc(100vh - 100px)"}} >
      <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
    </div>;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <div>
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNewSession(scenario)}
              >
                Start session
              </Button>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h4">Previous Results</Typography>
        </Grid>

        {sessions.map((result, index) => (
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
                <Typography variant="h6">
                  Training session: {result.scenarioName}
                </Typography>
                <Typography color="text.secondary">
                  Started: {new Date(result.startTime).toString()}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="secondary"
                LinkComponent={Link}
                href={"/feedback/" + result._id}
                disabled={!result.recordingUrl}
              >
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
