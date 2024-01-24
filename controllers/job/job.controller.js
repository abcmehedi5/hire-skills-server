const { createJobService } = require("../../services/job/job.service");
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
// const getJobLists = async ((req ,res) =>{

// })


module.exports = { createJobController };
