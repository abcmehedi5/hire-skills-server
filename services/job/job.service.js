const { JobModel } = require("../../models/job-model/job.model");
const { getPropertyQuery } = require("../../sql_queries/sqlQuery");
const { executeQuery, getData } = require("../../util/dao");

// create comment by blog
const createJobService = async (req, payload) => {
  // save to the database
  const response = JobModel.create(payload);
  // const insert = await executeQuery(req.pool, query, values);
  if (response) {
    return response;
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

// const getJobListsService = async (
//   req,
//   currentPage = 1,
//   limit = 10,
//   jobType = "All",
//   employmentTypes = [],
//   experienceLevels,
//   search = ""
// ) => {
//   currentPage = parseInt(currentPage);
//   limit = parseInt(limit);

//   currentPage = currentPage <= 0 ? 1 : currentPage; // Ensure currentPage is 1 or greater
//   limit = limit <= 0 ? 10 : limit; // Ensure limit is 10 or greater

//   const skip = (currentPage - 1) * limit;
//   const filters = {};

//   // Build filters based on user-provided criteria
//   if (jobType !== "All") {
//     filters.jobType = jobType;
//   }
//   if (employmentTypes.length > 0) {
//     filters.employmentType = { $in: employmentTypes };
//   }
//   if (experienceLevels.length > 0) {
//     filters.experience = { $in: experienceLevels };
//   }
//   if (search) {
//     const searchRegex = new RegExp(search, "i");
//     filters.$or = [
//       { title: { $regex: searchRegex } },
//       // { company: { $regex: searchRegex } },
//       // { skills: { $regex: searchRegex } },
//       // { tags: { $regex: searchRegex } },
//     ];
//   }

//   try {
//     const totalItems = await JobModel.countDocuments(filters);
//     const pipeline = [
//       { $match: filters },
//       { $skip: skip },
//       { $limit: limit }, // Ensure limit is passed as a number, not a string
//     ];

//     // Perform aggregation
//     const res = await JobModel.aggregate(pipeline);

//     if (res) {
//       return {
//         data: res,
//         totalItems,
//         isSuccess: true,
//         message: "jobs retrieved successfully",
//       };
//     }
//   } catch (error) {
//     console.error("Error in aggregation:", error);
//     throw error; // Propagate the error back to the caller
//   }
// };

const getJobListsService = async (
  limit,
  skip,
  search,
  filters,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    // apply filters if they are provided
    if (filters) {
      if (filters.experienceLevel) {
        query.experienceLevel = filters.experienceLevel;
      }
      if (filters.employmentType) {
        query.employmentType = filters.employmentType;
      }
      if (filters.jobType) {
        query.jobType = filters.jobType;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder?.toLowerCase() === "asc" ? 1 : -1;
    const totalItems = await JobModel.countDocuments(filters);
    const res = await JobModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          // totalCount: [{ $count: "value" }],
        },
      },
    ]);
    if (res) {
      return {
        data: res[0].data,
        totalItems,
        isSuccess: true,
        message: "jobs retrieved successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

//get single job by job id
const getSingleJobService = async (id) => {
  try {
    const job = await JobModel.findById(id);

    if (!job) {
      // Handle case where job with given id is not found
      return null;
    }

    return job;
  } catch (error) {
    console.error("Error in getSingleJobService:", error);
    throw error;
  }
};

// get job title for job search suggestion
const getJobAllJobTitle = async (req, res) => {
  const query = getPropertyQuery("title, tags", "jobs");
  const result = await getData(req.pool, query);
  return result;
};

module.exports = {
  createJobService,
  getJobListsService,
  getSingleJobService,
  getJobAllJobTitle,
};
