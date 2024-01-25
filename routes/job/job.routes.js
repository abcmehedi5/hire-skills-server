const express = require("express");
const { API } = require("../../util/constant");

const validator = require("../../middlewares/validator_middleware");
const { createJobController, getJobListsController } = require("../../controllers/job/job.controller");
const jobSchema = require("../../schema/job/jobCreateSchema");

const jobRouter = express.Router();

// Post job
jobRouter.post(API.API_CONTEXT + "job/create", validator(jobSchema), createJobController);
jobRouter.get(API.API_CONTEXT + "job/get", getJobListsController);

module.exports = jobRouter;
