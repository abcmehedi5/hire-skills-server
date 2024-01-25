const { countItems, getItemsPaginated } = require("../../sql_queries/sqlQuery");
const { executeQuery, getData } = require("../../util/dao");

// create comment by blog
const createJobService = async (req, payload) => {
  const {
    title,
    company,
    experience,
    location,
    description,
    skills,
    requirements,
    salary,
    deadline,
    jobType,
    vacancy,
    employmentType,
    createdBy,
    contacts,
    tags,
    postDate,
  } = payload;
  const query = `INSERT INTO jobs (title, company, experience, location, description, skills, requirements, salary, deadline, jobType, vacancy, employmentType, createdBy, contacts, tags, postDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    company,
    experience,
    location,
    description,
    JSON.stringify(skills),
    JSON.stringify(requirements),
    salary,
    deadline,
    jobType,
    vacancy,
    employmentType,
    JSON.stringify(createdBy),
    JSON.stringify(contacts),
    JSON.stringify(tags),
    postDate,
  ];
  const insert = await executeQuery(req.pool, query, values);
  if (insert) {
    return true;
  }
  return false;
};

// get all jobs by paginated and filter

const getJobListsService = async (req, currentPage, limit) => {
  const page = parseInt(currentPage) || 0;
  const limits = parseInt(limit) || 10;
  const skip = (page - 1) * limits;
  //get total count of data
  const queryTotalItem = countItems('jobs')
  const [totalItems] = await getData(req.pool, queryTotalItem)
  // get all jobs paginated data
  const queryPaginatedJobs = getItemsPaginated('jobs');
  const value = [limits, skip];
  const data = await getData(req.pool, queryPaginatedJobs, value);
  return {data, totalItems};
};

module.exports = { createJobService, getJobListsService };
