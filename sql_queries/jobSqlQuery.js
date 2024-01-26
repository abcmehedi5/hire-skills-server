const createJobQuery = (tableName) => {
  const query = `INSERT INTO ${tableName} (title, company, experience, location, description, skills, requirements, salary, deadline, jobType, vacancy, employmentType, createdBy, contacts, tags, postDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return query;
};

module.exports = { createJobQuery };
