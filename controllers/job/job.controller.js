const {
  createJobService,
  getJobListsService,
  getSingleJobService,
  getJobAllJobTitle,
} = require("../../services/job/job.service");
const { MESSAGE } = require("../../util/constant");

// post new job
const createJobController = async (req, res) => {
  const payload = req.body;
  try {
    const result = await createJobService(req, payload);
    if (result) {
      return res.status(200).json({
        message: "Job Posted Successfully",
        status: 200,
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

    const result = await getJobListsService(
      req,
      currentPage,
      limit,
      jobType,
      employmentTypes,
      experienceLevels,
      search
    );

    return res.status(200).json({
      message: result?.message,
      status: 200,
      isSuccess: result?.isSuccess,
      totalItems: result?.totalItems,
      totalCurrentItems: result?.data?.length,
      data: result?.data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      isSuccess: false,
      message: error.message || "There was a server side error",
    });
  }
};

// get single job controller
const getSingleJobController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getSingleJobService(id);
    return res.status(200).json({
      message: "single job retrived successfull",
      status: 200,
      data: result,
    });
  } catch (error) {
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

const getJobAllJobTitleController = async (req, res) => {
  try {
    const result = await getJobAllJobTitle(req, res);
    return res.status(200).json({
      message: "title retrived successfull",
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
  getJobAllJobTitleController,
};
