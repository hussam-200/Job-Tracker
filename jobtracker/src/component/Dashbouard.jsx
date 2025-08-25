// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { addJob } from "../Redux/Reduser";
// import { addDoc, collection, doc } from "firebase/firestore";
// import { db } from "../FireBase/FireBase";

// export default function Dashboard() {
//     const [company, setCompany] = useState("");
//     const [position, setPosition] = useState("");
//     const [status, setStatus] = useState("applied");
//     const dispatch = useDispatch();

//     const navigate = useNavigate();
//     const user = useSelector((status) => status.User)
//     console.log(user);


//     const handleReqJob = async (e) => {
//         e.preventDefault();
//         if (!company || !position || !status) {
//             alert("enter your information ")
//         }
//         try {

//             const docRef = await addDoc(collection(db, "job"), {
//                 company,
//                 position,
//                 status,
//                 uid: user.user.uid,
//                 createdAt: new Date(),
//                 name: user.user.username
//             })
//             console.log("Job saved with ID: ", docRef.id);
//             dispatch(
//                 addJob({
//                     id: docRef.id,
//                     company,
//                     position,
//                     status,
//                     uid: user.user.uid,
//                     name: user.user.username
//                 })
//             );
//             setCompany("");
//             setPosition("");
//             setStatus("applied");
//         } catch (error) {
//             alert(error.message)
//         }



//     }

//     return (
//         <>
//             <button onClick={() => navigate("/profilepage")
//             }>profile page</button>
//             <button onClick={() => navigate("/adminpage")
//             }>Admin</button>

//             <form onSubmit={handleReqJob}>
//                 <input
//                     type="text"
//                     value={company}
//                     placeholder="Company"
//                     onChange={(e) => setCompany(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     value={position}
//                     placeholder="Position"
//                     onChange={(e) => setPosition(e.target.value)}
//                 />
//                 <select value={status} onChange={(e) => setStatus(e.target.value)}>
//                     <option value="applied">Applied</option>
//                     <option value="interview">Interview</option>
//                     <option value="rejected">Rejected</option>
//                     <option value="hired">Hired</option>
//                 </select>
//                 <button type="submit">Add Job</button>
//             </form>

//         </>
//     )
// }

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
                }>Admin</button></div>
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