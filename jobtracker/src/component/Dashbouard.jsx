import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { db } from "../FireBase/FireBase";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"

export default function AdminPage() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState("applied");
    const [statusFilter, setStatusFilter] = useState("all");
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobsCollection = collection(db, "job");
                const jobsSnapshot = await getDocs(jobsCollection);
                const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobs(jobsList);
            } catch (err) {
                console.error(err);
            }
        };

        fetchJobs();
    }, []);
    console.log(jobs);


    return (
        <div className="jobs-container">
            <header>
                <h1>Job Applications</h1>
            </header>
            <select className="Select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
            </select>

            <div className="Button">
                <button onClick={() => navigate("/profilepage")
                }>profile page</button>
                <button onClick={() => navigate("/adminpage")
                }>Enter Job</button>
                <button onClick={() => navigate("/jobanalyzer")
                }>JobAnalyzer</button></div>
            <table border="1" cellPadding="5" >
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
                    {jobs.filter((job) => statusFilter === "all" || job.status === statusFilter)
                    .map((job) => (
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
            <footer>
                HUSSAM 2025
            </footer>

        </div>
    )
}