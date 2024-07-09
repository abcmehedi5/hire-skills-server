const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
    },
    applyLink: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    jobType: {
      type: String,
    },
    vacancy: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
    },
    postedBy: {
      type: {
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          validate: {
            validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Invalid email format",
          },
        },
      },
      required: true,
    },
    contacts: {
      type: {
        phone: {
          type: String,
        },
        email: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        website: {
          type: String,
        },
      },
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const JobModel = model("Job", jobSchema);

module.exports = { JobModel };
