import React, { useState, useEffect } from "react";
import "./App.css";
import Jobs from "./jobs";
const job_url = "http://localhost:3001/jobs";

async function fetchJobs(updateCb) {
  const jobs = await fetch(job_url);
  const json = await jobs.json();
  updateCb(json);
  // console.log({ json });
}

function App() {
  const [jobList, updatejobList] = useState([]);
  useEffect(() => {
    fetchJobs(updatejobList);
  }, []);
  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
