import { useState } from 'react';

export default function ChatBot() {
  function formatResponse(text) {
  // Remove asterisks used for bullet points or emphasis
  let cleaned = text.replace(/\*+/g, "");

  // Split into lines
  const lines = cleaned.split("\n");

  // Create formatted JSX
  return (
    <div className="space-y-2 text-left">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Render as bullet point if it starts like "- something"
        if (/^- /.test(trimmed)) {
          return (
            <li key={idx} className="ml-5 list-disc">
              {trimmed.replace(/^- /, "")}
            </li>
          );
        }

        // Render as heading if it’s uppercase or ends with colon
        if (
          trimmed.length < 50 &&
          (trimmed === trimmed.toUpperCase() || trimmed.endsWith(":"))
        ) {
          return (
            <h3 key={idx} className="text-blue-700 font-semibold pt-2">
              {trimmed}
            </h3>
          );
        }

        // Default: paragraph
        return <p key={idx}>{trimmed}</p>;
      })}
    </div>
  );
}

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = "AIzaSyBkU1MnX7UwXAf_PEVjgiP_1jUoe9LhSYY"; // Your Google Gemini key

const fetchGeminiResponse = async (userMessage) => {
  setLoading(true);
  try {
    const instruction = `
You are a helpful assistant for a healthcare platform called **MedMate**.

MedMate allows patients and doctors to manage appointments and medical records online. Here are the key features you should help users with:

🩺 **For Patients**:
- View doctors by specialization.
- Check doctor availability and appointment time slots.
- Book appointments with the relevant doctor.
- Request chat access to a doctor (chat opens only after both accept).
- Maintain personal medical records securely.

👨‍⚕️ **For Doctors**:
- Add their availability schedule and set appointment durations.
- Accept or reject appointment requests.
- Accept chat requests from patients.

If a user asks something **outside of this platform's scope**, respond politely with:
_"I'm here to help with appointments, availability, chat, or medical records on MedMate. Could you please ask about those?"_

Only provide information related to these features. Always be polite, clear, and concise.
`;

    const combinedPrompt = `${instruction}\n\nUser: ${userMessage}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: combinedPrompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data, null, 2));

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer from Gemini.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Something went wrong while contacting Gemini AI.";
  } finally {
    setLoading(false);
  }
};







  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const aiReply = await fetchGeminiResponse(input);
    const botMsg = { text: aiReply, sender: "bot" };
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-blue-600 transition z-50"
        title="Chat with us"
      >
        ✉️
      </button>

      {/* Chat box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-[90%] max-w-sm sm:right-6 sm:w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-50">
          <div className="bg-blue-700 text-white px-4 py-2 font-bold rounded-t-lg">AI Support</div>

          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded break-words ${
                    msg.sender === "bot"
                      ? "bg-blue-100 text-blue-900 text-left"
                      : "bg-gray-200 text-gray-800 text-right"
                  }`}
                >
                  {msg.sender === "bot" ? formatResponse(msg.text) : msg.text}
                </div>
              ))}
            {loading && (
              <div className="p-2 rounded bg-blue-100 text-blue-900 text-left">
                Typing...
              </div>
            )}
          </div>

          <div className="flex border-t border-gray-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 text-sm outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 text-blue-700 font-bold hover:text-blue-900"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
