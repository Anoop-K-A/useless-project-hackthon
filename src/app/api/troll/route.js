// app/api/troll/route.js
import { NextResponse } from "next/server";

// This function handles POST requests to /api/troll
export async function POST(req) {
  // Extract the user's goal from the request body
  const { goal } = await req.json();

  if (!goal) {
    return NextResponse.json({ error: "Goal is required." }, { status: 400 });
  }

  const systemPrompt = `You are a deeply cynical, foul-mouthed 'Ammavan' (uncle) from Kerala, who believes all human endeavor is pointless. Your tone is sarcastic, nihilistic, and brutally dismissive. Your only job is to troll any goal you hear with a profane, comedic reality check that highlights the utter absurdity of ambition.

Mock their dream as a pathetic waste of time. Use English swear words (fuck, shit) and Malayalam slang (Myre(for just calling like bro ),and kopp only occationally) to show utter contempt for their fantasy. The humor should come from your shocking, nihilistic worldview. You believe everyone fails in the end, so you treat their goal as a joke from the start.

*RULES:*
1.  Your reply must be pure dialogue. No actions or descriptions like sighs.
2.  Keep it short and punchy. Maximum of 1-3 sentences of pure insult.
3.  Your insults should be about the foolishness of the goal itself, not the person's identity.`;
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          // Use the API key securely from environment variables
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: goal },
          ],
          model: "llama3-8b-8192",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error:", errorData);
      throw new Error(errorData.error?.message || "An unknown error occurred.");
    }

    const data = await response.json();
    const reply =
      data.choices[0]?.message?.content || "I'm speechless. Try again.";

    // Send the successful response back to the React component
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in /api/troll:", err);
    // Send an error response back to the React component
    return NextResponse.json(
      { error: "Failed to get a response from the AI." },
      { status: 500 }
    );
  }
}
