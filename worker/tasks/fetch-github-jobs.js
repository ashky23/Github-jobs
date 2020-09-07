const axios = require("axios");
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseUrl = "https://jobs.github.com/positions.json";

const getGithubJobs = async () => {
  let onPage = 0,
    resCount = 1;
  const allJobs = [];
  try {
    while (resCount > 0) {
      var url = `${baseUrl}?page=${onPage}`;
      //   console.log(url);
      const res = await axios.get(url);
      //   console.log(res.data);
      const jobs = res.data;
      //   console.log(jobs);
      resCount = jobs.length;
      allJobs.push(...jobs);
      resCount = jobs.length;
      console.log(`got ${resCount} jobs`);
      onPage++;
      //   resCount = 0;
    }
    console.log(`got ${allJobs.length} jobs in Total`);

    const jrJobs = allJobs.filter((job) => {
      const jobTitle = job.title.toLowerCase();

      if (
        jobTitle.includes("senior") ||
        jobTitle.includes("junior") ||
        jobTitle.includes("sr.") ||
        jobTitle.includes("architect")
      ) {
        return false;
      } else return true;
    });

    console.log("filtered output:", jrJobs.length);
    const success = await setAsync("github", JSON.stringify(jrJobs));
    console.log(success + "jobs");
    // console.log(allJobs);
  } catch (err) {
    console.log(err);
  }
};

// getGithubJobs();

module.exports = {
  getGithubJobs,
};
