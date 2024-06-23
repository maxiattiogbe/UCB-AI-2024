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

import ScenarioComponent from "./ScenarioComponent";

function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("questions");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSave = async (e) => {
    e.preventDefault();

    const caseInfo = {
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

    // now make the POST request:
    const response = await fetch("/api/scenarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseInfo),
    });

    if (response.ok) {
      console.log("saved: ", await response.json());
      e.target.reset();
    } else {
      setError("Failed to save case info");
    }
  };

  return (
    <div>
      <div>
        <div className="w-full px-4">
          <div className="mb-4 border-b border-gray-200">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab("questions")}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "questions"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                All scenarios
              </button>
              <button
                onClick={() => setActiveTab("caseInfo")}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "caseInfo"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Create case info
              </button>
            </nav>
          </div>
          <div>
            {activeTab === "questions" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Scenarios</h2>
                <ScenarioComponent />
              </div>
            )}
            {activeTab === "caseInfo" && (
              <div>
                <form className="space-y-4" onSubmit={handleSave}>
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
                        className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                  <h2 className="text-xl font-semibold mb-4">
                    Person Case Info
                  </h2>
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
                    ></textarea>
                  </div>
                  <h2 className="text-xl font-semibold mb-4">Questions</h2>
                  {[
                    { label: "Question Title 1", id: "q1" },
                    { label: "Question Title 2", id: "q2" },
                    { label: "Question Title 3", id: "q3" },
                  ].map((field) => (
                    <div>
                      <div
                        key={field.id}
                        className="flex items-center space-x-4"
                      >
                        <label htmlFor={field.id} className="w-32 text-right">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          id={field.id}
                          className="flex-1 py-2 px-3 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div
                        key={field.id + "_response"}
                        className="flex items-start space-x-4 pt-2"
                      >
                        <label
                          htmlFor={field.id + "_response"}
                          className="w-32 text-right"
                        >
                          Correct Response
                        </label>
                        <textarea
                          id={field.id + "_response"}
                          className="flex-1 py-2 px-3 border border-gray-300 rounded-md h-24"
                        ></textarea>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-indigo-500 text-white rounded-md mb-2"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
