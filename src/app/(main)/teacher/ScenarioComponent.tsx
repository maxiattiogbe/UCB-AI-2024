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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const style = {
  width: "70%", // Making the dialog wider
  maxWidth: "none",
};

function CustomCard({ caseInfo, handleDelete, handleEdit }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    const newCaseInfo = {
      _id: caseInfo._id,
      scenario_title: e.target.scenario_title.value,
      scenario_hint: e.target.scenario_hint.value,
      name: e.target.name.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      occupation: e.target.occupation.value,
      background: e.target.background.value,
      actions: e.target.actions.value,
      words: e.target.words.value,
      context: e.target.context.value,
      questions: {
        q1: e.target.q1.value,
        q1_response: e.target.q1_response.value,
        q2: e.target.q2.value,
        q2_response: e.target.q2_response.value,
        q3: e.target.q3.value,
        q3_response: e.target.q3_response.value,
      },
    };

    handleEdit(newCaseInfo, handleClose);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {caseInfo.scenario_title}
          </Typography>
          <Typography color="text.secondary">
            {caseInfo.scenario_hint}
          </Typography>
          <Typography variant="body2">
            <strong>Name:</strong> {caseInfo.name}
          </Typography>
          <Typography variant="body2">
            <strong>Age:</strong> {caseInfo.age}
          </Typography>
          <Typography variant="body2">
            <strong>Gender:</strong> {caseInfo.gender}
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
          <div className=" pt-2">
            {caseInfo.questions.q1 && (
              <Typography variant="body2">
                <strong>Question 1:</strong> {caseInfo.questions.q1}
                <br />
                <strong>Response:</strong> {caseInfo.questions.q1_response}
              </Typography>
            )}
            {caseInfo.questions.q2 && (
              <Typography variant="body2">
                <strong>Question 2:</strong> {caseInfo.questions.q2}
                <br />
                <strong>Response:</strong> {caseInfo.questions.q2_response}
              </Typography>
            )}
            {caseInfo.questions.q3 && (
              <Typography variant="body2">
                <strong>Question 3:</strong> {caseInfo.questions.q3}
                <br />
                <strong>Response:</strong> {caseInfo.questions.q3_response}
              </Typography>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Edit Scenario
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleDelete(caseInfo);
            }}
          >
            Delete Scenario
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Edit a scenario</DialogTitle>
        <DialogContent>
          <Box sx={style}>
            <form className="space-y-4" onSubmit={handleSave} id="edit-form-id">
              <h2 className="text-xl font-semibold mb-4">Scenario Info</h2>
              {[
                { label: "Scenario Title", id: "scenario_title" },
                { label: "Scenario Hint", id: "scenario_hint" },
              ].map((field) => (
                <div key={field.id} className="flex items-center space-x-4">
                  <label htmlFor={field.id} className="w-32 text-right">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    defaultValue={caseInfo[field.id]}
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <h2 className="text-xl font-semibold mb-4">Person Case Info</h2>
              {[
                { label: "Name", id: "name" },
                { label: "Age", id: "age" },
                { label: "Gender", id: "gender" },
                { label: "Occupation", id: "occupation" },
                { label: "Background", id: "background" },
                { label: "Actions", id: "actions" },
                { label: "Words", id: "words" },
              ].map((field) => (
                <div key={field.id} className="flex items-center space-x-4">
                  <label htmlFor={field.id} className="w-32 text-right">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    defaultValue={caseInfo[field.id]}
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
              <div className="flex items-start space-x-4">
                <label htmlFor="context" className="w-32 text-right">
                  Context
                </label>
                <textarea
                  id="context"
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-md h-24"
                  defaultValue={caseInfo.context}
                ></textarea>
              </div>
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              {[
                { label: "Question Title 1", id: "q1" },
                { label: "Question Title 2", id: "q2" },
                { label: "Question Title 3", id: "q3" },
              ].map((field) => (
                <div key={field.id}>
                  <div className="flex items-center space-x-4">
                    <label htmlFor={field.id} className="w-32 text-right">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      id={field.id}
                      defaultValue={caseInfo["questions"][field.id]}
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-start space-x-4 pt-2">
                    <label
                      htmlFor={field.id + "_response"}
                      className="w-32 text-right"
                    >
                      Correct Response
                    </label>
                    <textarea
                      id={field.id + "_response"}
                      defaultValue={
                        caseInfo["questions"][field.id + "_response"]
                      }
                      className="flex-1 py-2 px-3 border border-gray-300 rounded-md h-24"
                    ></textarea>
                  </div>
                </div>
              ))}
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" form="edit-form-id" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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

  const handleDelete = async (caseInfo) => {
    const response = await fetch("/api/scenarios", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: caseInfo._id }),
    });
    const result = await response.json();

    if (result.deletedCount === 1) {
      const dataCopy = data.filter((item) => item._id !== caseInfo._id);
      setData(dataCopy);
    }
  };

  const handleEdit = async (caseInfo, handleClose) => {
    const response = await fetch("/api/scenarios", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseInfo),
    });

    const result = await response.json();

    // refetch all the data cuz im lazy
    const newScenarios = await fetch("/api/scenarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await newScenarios.json();
    setData(data.scenario);

    handleClose();
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
      {data.map((caseInfo, index) => (
        <CustomCard
          key={index}
          caseInfo={caseInfo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default ScenarioComponent;
