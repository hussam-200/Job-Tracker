import axios from "axios";
import { useState } from "react";
import "./Chat.css"
import { useNavigate } from "react-router-dom";

export default function Chat() {
    const [msg, setMsg] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    async function handleChat() {
        if (!msg.trim()) return;


        setChatLog((prev) => [...prev, { role: "user", content: msg }]);
        setLoading(true);

        try {
            const result = await axios.post("http://localhost:5000/api/chat", {
                message: msg,
            });

            const reply = result.data.reply || "No response from AI";

           
            setChatLog((prev) => [...prev, { role: "ai", content: reply }]);
            setMsg("");
        } catch (err) {
            console.error(err);
            setChatLog((prev) => [...prev, { role: "ai", content: "Error: Unable to get response." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="divss">
            <button onClick={() => navigate("/adminpage")
                }>↶</button>
            <h2>Chat with AI Career Assistant</h2>
            <div className="chat-container" >
                {chatLog.map((entry, index) => (
                    <p key={index}className={entry.role === "user" ? "chat-message-user" : "chat-message-ai"}>
                        <strong>{entry.role === "user" ? "You" : "AI"}: </strong> {entry.content}
                    </p>
                ))}
                {loading && <p>AI is typing...</p>}
            </div>

            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
            />
            <button className="chat-button " onClick={handleChat}>Send</button>
        </div>
    );
}
