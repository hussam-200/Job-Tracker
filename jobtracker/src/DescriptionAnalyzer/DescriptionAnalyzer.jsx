import { useState } from "react";
import "./DescriptionAnalyzer.css";
import { useNavigate } from "react-router-dom";

export default function DescriptionAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/job-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await response.json();
      setResult(data.feedback);
    } catch (err) {
      console.error(err);
      setResult("Error analyzing job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="divss">
        <button onClick={() => navigate("/dashboard")
                }>↶</button>
      <h2>Job Description Analyzer</h2>
      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={8}
        cols={60}
        className="chat-container"
      />
      <br />
      <button className="chat-button " onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="result-container">
          <h3>Analysis Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
