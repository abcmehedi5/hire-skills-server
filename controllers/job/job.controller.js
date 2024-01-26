const {
  createJobService,
  getJobListsService,
  getSingleJobService,
} = require("../../services/job/job.service");
const { MESSAGE } = require("../../util/constant");

// post new job
const createJobController = async (req, res) => {
  try {
    const result = await createJobService(req, req.body);
    if (result) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "Job Posted Successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    }
    return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
      message: "Can't Post Job",
      status: MESSAGE.NOT_FOUND.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// get all job using pagination
const getJobListsController = async (req, res) => {
  try {
    const currentPage = req?.query?.currentPage;
    const limit = req?.query?.limit;
    const experienceLevel = req?.query?.experienceLevel; // expart
    const employmentType = req?.query?.employmentType; //  full time / part time
    const jobType = req?.query?.jobType; // onsite
    // Convert comma-separated strings to arrays
    const experienceLevels = experienceLevel ? experienceLevel.split(",") : [];
    const employmentTypes = employmentType ? employmentType.split(",") : [];

    const search = req?.query?.search; // title, company name , tags
    const paginatedJobs = await getJobListsService(
      req,
      currentPage,
      limit,
      jobType,
      employmentTypes,
      experienceLevels,
      search
    );

    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
      message: "jobs retrieved successfully",
      status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      totalItems: paginatedJobs.totalItems.totalItems,
      totalCurrentItems: paginatedJobs.data.length,
      data: paginatedJobs.data,
    });
  } catch (error) {
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// get single job controller
const getSingleJobController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getSingleJobService(req, id);
    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
      message: "single job retrived successfull",
      status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      data: result,
    });
  } catch (error) {
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

module.exports = {
  createJobController,
  getJobListsController,
  getSingleJobController,
};
