const express = require("express");
const { API } = require("../../util/constant");

const validator = require("../../middlewares/validator_middleware");
const { createJobController, getJobListsController, getSingleJobController, getJobAllJobTitleController } = require("../../controllers/job/job.controller");
const jobSchema = require("../../schema/job/jobCreateSchema");
const verifyToken = require("../../middlewares/verifyToken");

const jobRouter = express.Router();

// Post job
jobRouter.post(API.API_CONTEXT + "job/create", validator(jobSchema), verifyToken, createJobController);
jobRouter.get(API.API_CONTEXT + "job/get", getJobListsController);
jobRouter.get(API.API_CONTEXT + `job/get/:id`, getSingleJobController)
jobRouter.get(API.API_CONTEXT + `job/get-title`, getJobAllJobTitleController)

module.exports = jobRouter;
