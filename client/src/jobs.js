import React from "react";
import Typography from "@material-ui/core/Typography";
import Job from "./job";
import JobModal from "./jobModal";

//mobile stepper imports
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

export default function Jobs({ jobs }) {
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="jobs">
      <JobModal open={open} handleClose={handleClose} job={selectedJob} />
      <Typography variant="h4" component="h1">
        Junior Developer Jobs
      </Typography>
      <Typography variant="h6" component="h2">
        Found {numJobs} jobs
      </Typography>
      {jobsOnPage.map((job, i) => {
        return (
          <Job
            key={i}
            job={job}
            onClick={() => {
              console.log("Oh yeah!");
              console.log(job);
              handleClickOpen();
              selectJob(job);
            }}
          />
        );
      })}
      <div>
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        style={{ width: "80%" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === numPages - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
