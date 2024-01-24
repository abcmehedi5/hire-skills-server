const { executeQuery } = require("../../util/dao");

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

module.exports = { createJobService };
