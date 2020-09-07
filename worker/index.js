const fetchGithubJobs = require("./tasks/fetch-github-jobs");

var CronJob = require("cron").CronJob;
var { getGithubJobs } = require("./tasks/fetch-github-jobs");
var job = new CronJob(
  "*/30 * * * *", //to know about this search `crontab guru` website
  getGithubJobs,
  null,
  true,
  "America/Los_Angeles"
);
job.start();
