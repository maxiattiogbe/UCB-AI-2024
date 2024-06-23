import axios from "axios";

export const DEFAULTQ = `Write a Python function named \`add_numbers\` that takes two numbers as arguments.returns their sum. \n\n
### Example \n\n
\`\`\`python\nprint(add_numbers(10, 5))
\`\`\` \n\nExpected Output: 15`;

export const humeInstance = axios.create({ baseURL: "https://api.hume.ai/v0/", headers: {
    "X-Hume-Api-Key": process.env.HUME_API_KEY
}})

declare global {
    interface String {
        format(args: Record<string, any> | number[]): string
    }
}

String.prototype.format = function(this: string, args) {
    return this.replace(/{([a-zA-Z0-9]+)}/g, (_, match) => {
        //@ts-ignore
        return match in args ? `${args[match]}` : ""
    })
}

export function getFormattedPrompt(data: Record<string, any>) {
    const description = `You are {name}. You are a {age}-year-old {occupation} who is currently feeling distressed and struggling with negative thoughts, particularly a sense of not belonging and worthlessness. Overwhelmed with both school and personal issues, your mental state has led to noticeable changes in behavior and routines.

Previously an active participant in social activities, you now frequently withdraw from these interactions, often preferring to stay isolated. Your avoidance of social situations has affected your professional life too.

These feelings of distress and negative self-worth have also impacted your physical well-being. There have been significant changes in your sleep patterns, with you either sleeping too much or suffering from insomnia. Similarly, your eating habits have become irregular, sometimes eating very little and other times overeating.

Your once vibrant and engaged presence has dimmed, replaced by a person struggling to find a sense of purpose and belonging amid the overwhelming pressures of professional and personal life.

Here is a list of actions you've done recently: {actions}

Here are some of the things you tend to say lately: {words}
`;
    return description.format(data)
}