
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../FireBase/FireBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Admin.css"

export default function AdminPage() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const user = useSelector((status) => status.User)
  const fetchJobs = async () => {
    try {
      let jobsQuery;
      const jobsCollection = collection(db, "job");

      if (statusFilter === "all") {
        jobsQuery = jobsCollection;
      } else {
        jobsQuery = query(jobsCollection, where("status", "==", statusFilter));
      }

      const jobsSnapshot = await getDocs(jobsQuery);
      const jobsList = jobsSnapshot.docs.map(doc => ({
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
        username: user.user.username
      });
      setCompany("");
      setPosition("");
      setStatus("applied");
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user);

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
              navigate("/dashboard"); // Admin goes to user dashboard
            } else {
              navigate("/adminpage"); // Regular user goes to admin dashboard (as per your note)
            }
          }}
        >
          {user?.user?.roll === "admin" ? "Go to Dashboard Page" : "Go to Admin Page"}
        </button>
      </div>

      {/* <select className="Select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="applied">Applied</option>
    <option value="interview">Interview</option>
    <option value="rejected">Rejected</option>
    <option value="hired">Hired</option>
  </select> */}

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

        {/* <div className="dashboard-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.company}</td>
              <td>{job.position}</td>
              <td>{job.status}</td>
              <td>{job.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
      </div>

      <footer>HUSSAM 2025</footer>
    </div>


  );
}
