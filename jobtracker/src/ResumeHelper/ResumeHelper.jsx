import React, { useState } from "react"
import axios from "axios";
import "./ResumeHelper.css"

export default function ResumeHelper() {
    const [textArea, setTextArea] = useState("")
    const [feedback, setfeedback] = useState("")
    const [loading, setLoading] = useState(false);

    async function handelSendText() {
        try {
            setLoading(true)
            const res = await axios.post("http://localhost:5000/api/resume-feedback", {
                resumeText:textArea
            })
            setfeedback(res.data.feedback)
            setTextArea("")

        } catch (error) {
            console.error(error);
            setfeedback("Error: Could not get feedback");

        } finally {
            setLoading(false)
        }
    }
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setTextArea(event.target.result);
        };
        reader.readAsText(file);
    };

    return (
       
    <div className="resume-helper-container">
      <h2>Resume Helper</h2>

      <textarea
        className="resume-textarea"
        rows={10}
        placeholder="Paste your resume here..."
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="resume-file"
      />

      <button
        className="resume-button"
        onClick={handelSendText}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Feedback"}
      </button>

      {feedback && (
        <div className="resume-feedback">
          <h3>AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
    );
};


