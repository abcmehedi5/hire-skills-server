const { createJobQuery } = require("../../sql_queries/jobSqlQuery");
const {
  countItems,
  getItemsPaginated,
  getsingleDataQuery,
} = require("../../sql_queries/sqlQuery");
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
  const query = createJobQuery("jobs");
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

// const getJobListsService = async (req, currentPage, limit, search, jobType, employmentType) => {
//   const page = parseInt(currentPage) || 0;
//   const limits = parseInt(limit) || 10;
//   const skip = (page - 1) * limits;
//   //get total count of data
//   const queryTotalItem = countItems('jobs')
//   const [totalItems] = await getData(req.pool, queryTotalItem)
//   // get all jobs paginated data
//   const queryPaginatedJobs = getItemsPaginated('jobs');
//   const value = [limits, skip];
//   const data = await getData(req.pool, queryPaginatedJobs, value);
//   return {data, totalItems};
// };

const getJobListsService = async (
  req,
  currentPage,
  limit,
  jobType,
  employmentTypes,
  experienceLevels,
  search
) => {
  const page = parseInt(currentPage) || 0;
  const limits = parseInt(limit) || 10;
  const skip = (page - 1) * limits;
  // Get total count of data
  const queryTotalItem = countItems("jobs");
  const [totalItems] = await getData(req.pool, queryTotalItem);

  // Build the query for paginated jobs data with optional filters
  let queryPaginatedJobs = "SELECT * FROM jobs";

  const conditions = [];
  if (jobType && jobType !== "All") {
    conditions.push(`jobType = '${jobType}'`);
  }

  // if (employmentTypes) {
  //   conditions.push(`employmentType = '${employmentTypes}'`);
  // }

  if (experienceLevels.length > 0) {
    const experienceLevelCondition = experienceLevels
      .map((type) => `jobType = '${type}'`)
      .join(" OR ");
    conditions.push(`(${experienceLevelCondition})`);
  }

  if (employmentTypes && employmentTypes.length > 0) {
    const employmentTypeCondition = employmentTypes
      .map((type) => `employmentType = '${type}'`)
      .join(" OR ");
    conditions.push(`(${employmentTypeCondition})`);
  }
  //  search conditions
  if (search) {
    conditions.push(
      `(title LIKE '%${search}%' OR company LIKE '%${search}%' OR skills LIKE '%${search}%' OR tags LIKE '%${search}%')`
    );
  }

  // join and in condition array Ex: remote and freelancer and ......
  if (conditions.length > 0) {
    queryPaginatedJobs += " WHERE " + conditions.join(" AND ");
  }
  // peginated job query
  queryPaginatedJobs += ` LIMIT ? OFFSET ?`;

  // Get paginated jobs data
  const value = [limits, skip];
  const data = await getData(req.pool, queryPaginatedJobs, value);

  return { data, totalItems };
};

//get single job by job id
const getSingleJobService = async (req, id) => {
  const query = getsingleDataQuery("jobs");
  const value = [id];
  const result = await getData(req.pool, query, value);
  return result[0];
};

module.exports = { createJobService, getJobListsService, getSingleJobService };
