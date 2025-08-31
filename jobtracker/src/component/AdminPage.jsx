import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../FireBase/FireBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Admin.css";

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dashboardSummary, setDashboardSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  
  const fetchJobs = async () => {
    try {
      let jobsQuery;
      const jobsCollection = collection(db, "job");

      if (statusFilter === "all") {
        jobsQuery = query(jobsCollection, where("username", "==", user.user.username));
      } else {
        jobsQuery = query(
          jobsCollection,
          where("status", "==", statusFilter),
          where("username", "==", user.user.username)
        );
      }

      const jobsSnapshot = await getDocs(jobsQuery);
      const jobsList = jobsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);


  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "job"), {
        company,
        position,
        status,
        createdAt: new Date(),
        username: user.user.username,
      });
      setCompany("");
      setPosition("");
      setStatus("applied");
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

 
  useEffect(() => {
    if (!jobs.length) return;

    const generateSummary = async () => {
      setLoadingSummary(true);
      try {
        const applied = jobs.filter((j) => j.status === "applied").length;
        const interview = jobs.filter((j) => j.status === "interview").length;
        const rejected = jobs.filter((j) => j.status === "rejected").length;
        const hired = jobs.filter((j) => j.status === "hired").length;

        const prompt = `You applied to ${applied} jobs, got ${interview} interviews, ${rejected} rejections, ${hired} hires. 
Generate a short, motivational summary for the dashboard.`;

        const response = await fetch("http://localhost:5000/api/career-insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ field: prompt }),
        });

        const data = await response.json();
        setDashboardSummary(data.feedback);
      } catch (err) {
        console.error(err);
        setDashboardSummary("Failed to generate dashboard insights.");
      } finally {
        setLoadingSummary(false);
      }
    };

    generateSummary();
  }, [jobs]);

  return (
    <div className="dashboard-container">
      <header>
        <h1>Job Applications</h1>
      </header>

      <div className="Button">
        <button onClick={() => navigate("/profilepage")}>Profile Page</button>
        <button
          onClick={() => {
            if (user?.user?.roll === "admin") {
              navigate("/dashboard");
            } else {
              navigate("/adminpage");
            }
          }}
        >
          {user?.user?.roll === "admin" ? "Go to Dashboard Page" : "Go to Admin Page"}
        </button>
        <button onClick={() => navigate("/chat")}>Chat Bot</button>

      </div>

      <div className="dashboard-content">
        <form onSubmit={handleAddJob} className="dashboard-form">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <button type="submit">Add Job</button>
        </form>

        <div className="dashboard-summary">
          {loadingSummary ? <p>Loading insights...</p> : <p>{dashboardSummary}</p>}
        </div>
      </div>

      <footer>HUSSAM 2025</footer>
    </div>
  );
}
