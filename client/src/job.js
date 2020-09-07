import React from "react";
// import "./App.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Job({ job, onClick }) {
  return (
    <Paper onClick={onClick} className="job">
      <div>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="h5">{job.company}</Typography>
        <Typography>{job.location}</Typography>
      </div>
      <div>{job.created_at.split(" ").slice(0, 3).join(" ")}</div>
    </Paper>
  );
}
