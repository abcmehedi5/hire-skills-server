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
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings
      required: true,
    },
    requirements: {
      type: [String], // Array of strings
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
      enum: ["Onsite", "Remote"], // Optional: define allowed values for job type
    },
    vacancy: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
    },
    createdBy: {
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
          validate: {
            validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: "Invalid email format",
          },
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
    postDate: {
      type: Date,
      default: Date.now, // Set to current date by default
    },
  },
  { timestamps: true }
);

const JobModel = model("Job", jobSchema);

module.exports = { JobModel };
