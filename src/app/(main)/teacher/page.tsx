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

function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("questions");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div>
      <div>
        <div className="w-full max-w-4xl px-4">
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
                Questions
              </button>
              <button
                onClick={() => setActiveTab("caseInfo")}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "caseInfo"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Case Info
              </button>
            </nav>
          </div>
          <div>
            {activeTab === "questions" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Questions</h2>
                {/* Your Questions content goes here */}
                <p>Content for Questions tab...</p>
              </div>
            )}
            {activeTab === "caseInfo" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Case Info</h2>
                <form className="space-y-4">
                  {[
                    { label: "Name", id: "name" },
                    { label: "Age", id: "age" },
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
