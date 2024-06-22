"use client";

import { UserInfo } from "@/Data Structures";
import Loading from "@/views/loading/loading";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface Props {
  // editor?: monaco.editor.IStandaloneCodeEditor; // first load is empty
  usersOnline: UserInfo[];
  userName: string;
  userId: string;
  roomId: string;
}

import { Message, useChat } from "ai/react";
import MarkdownTextView from "../MarkdownTextView/MarkdownTextView";
import { DEFAULTQ } from "./constants";
import { useEffect } from "react";
import { addMessage, getMessagesInRoom } from "@/actions/chatActions";
import { chat } from "@/db/schema";

const formatMessages = (
  chatRecords: (typeof chat.$inferSelect)[]
): Message[] => {
  return chatRecords.flatMap((record) => [
    {
      // User input as a user message
      id: `${record.messageId}-user`,
      content: record.userInput,
      role: "user", // assuming all userInput come from users
    },
    {
      // Assistant's response as a system message
      id: `${record.messageId}-assistant`,
      content: record.assistantResponse,
      role: "assistant", // you could use 'system' if it fits better with your roles
    },
  ]);
};

export default function Chat(props: Props) {
  // const currentText = props.editor?.getValue();
  const currentText = "";

  const initialMessage: Message[] = [
    {
      id: Date.now().toLocaleString(),
      content: `You are a helpful code tutor. The learner is approaching the question ${DEFAULTQ}.\n The current editor includes ${currentText}`,
      role: "system",
    },
    // {
    //   id: Date.now().toLocaleString() + "1",
    //   content: `The current editor includes ${currentText}`, // need to dynamically update and set it?
    //   role: "system",
    // },
  ];

  // console.log(currentText);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      // initialInput: `The learner is approaching the question ${DEFAULTQ}`,
      // initialMessages: initialMessage as Message[],
      onFinish: (message: Message) => {
        console.log("message", message, "\n", messages);
        addMessage(
          props.roomId,
          props.userId,
          input,
          message.content,
          "PeerProgram"
        );
        //Need to get to refresh the messages??
      },
    });
  useEffect(() => {
    // TODO: Load in existing chat messages-- since the path is revalidated when a new message is sent, the difference should be updated
    getMessagesInRoom(props.roomId).then((data) => {
      const formattedMessages: Message[] = formatMessages(data);
      setMessages([...initialMessage, ...formattedMessages]);
    });
  }, []);

  const name = props.userName;
  // TODO: Need to figure out how to get time from the server?
  const customHandleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting immediately

    // Update the messages state
    setMessages([
      ...(initialMessage as Message[]),
      ...messages.slice(1), // Include the rest of the messages unchanged
    ]);

    // Call the original handleSubmit if needed or custom submission logic
    handleSubmit(e); // This will reset the input and possibly send the message to the server
  };

  return (
    <>
      <div className="flex flex-col w-full mx-auto stretch space-y-4 max-h-[calc(100vh-4rem)] overflow-scroll">
        {/* <div className="flex flex-col w-full max-w-md mx-auto stretch space-y-4 max-h-screen overflow-scroll"> */}
        {/* Todo: Load in a live question */}
        <div className="mx-4">
          <div className="my-2">
            {/* <>{currentText}</> */}
            <MarkdownTextView rawText={DEFAULTQ}></MarkdownTextView>
          </div>
          <div className="mb-16">
            {/* {messages.map((m) => ( */}
            {messages.slice(1).map((m) => (
              <div key={m.id} className="flex items-start gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                  <span className="text-sm font-medium leading-none text-white">
                    {m.role === "user" ? name.slice(0, 2).toUpperCase() : "AI"}
                  </span>
                </span>

                <div className="flex flex-col gap-1 w-full">
                  {/* <div className="flex flex-col gap-1 w-full max-w-[320px]"> */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {m.role === "user" ? "User: " : "AI: "}
                    </span>
                    {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        11:46
                    </span> */}
                  </div>
                  <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <p className="text-sm font-normal text-gray-900 dark:text-white">
                      {" "}
                      <MarkdownTextView rawText={m.content}></MarkdownTextView>
                    </p>
                  </div>
                  {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
                </div>
              </div>
            ))}
            <div />

            <form onSubmit={customHandleSubmit}>
              <input
                className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
