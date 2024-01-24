const express = require("express");
const { API } = require("../../util/constant");

const validator = require("../../middlewares/validator_middleware");
const { createJobController } = require("../../controllers/job/job.controller");
const jobSchema = require("../../schema/job/jobCreateSchema");

const jobRouter = express.Router();

// Post job
jobRouter.post(API.API_CONTEXT + "job/create", validator(jobSchema), createJobController);

module.exports = jobRouter;
