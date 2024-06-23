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
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CustomCard({ caseInfo }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {caseInfo.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Age: {caseInfo.age}
        </Typography>
        <Typography variant="body2">
          <strong>Occupation:</strong> {caseInfo.occupation}
        </Typography>
        <Typography variant="body2">
          <strong>Background:</strong> {caseInfo.background}
        </Typography>
        <Typography variant="body2">
          <strong>Actions:</strong> {caseInfo.actions}
        </Typography>
        <Typography variant="body2">
          <strong>Words:</strong> {caseInfo.words}
        </Typography>
        <Typography variant="body2">
          <strong>Context:</strong> {caseInfo.context}
        </Typography>
        <div className="questions">
          {caseInfo.questions.map((question, index) => (
            <Typography key={index} variant="body2">
              <strong>Question {index + 1}:</strong> {question.title}
              <br />
              <strong>Response:</strong> {question.response}
            </Typography>
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Scenario</Button>
      </CardActions>
    </Card>
  );
}

function ScenarioComponent() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }

    // fetch the scenarios
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

  if (loading) {
    return <div>Loading</div>;
  }

  return error ? (
    <div>{error}</div>
  ) : (
    <div>
      {data.map((caseInfo, index) => (
        <CustomCard key={index} caseInfo={caseInfo} />
      ))}
    </div>
  );
}

export default ScenarioComponent;
