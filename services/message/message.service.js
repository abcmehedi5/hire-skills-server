const { MessageModel } = require("../../models/message/message.model");

// create message
const saveNewMessage = async (payload) => {
  // save to the database
  const message = MessageModel(payload);
  const response = await message.save();

  if (response) {
    return {
      isSuccess: true,
      data: response,
      message: "Massage save successfull",
    };
  } else {
    return {
      isSuccess: false,
      data: null,
      message: "Somthing wrong please try again!",
    };
  }
};

// get message
const getMessagesService = async (
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
      query.$or = [{ message: { $regex: search, $options: "i" } }];
    }
    // apply filters if they are provided
    if (filters) {
      if (filters.email) {
        query.email = filters.email;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder?.toLowerCase() === "asc" ? 1 : -1;
    const totalItems = await MessageModel.countDocuments(filters);
    const res = await MessageModel.aggregate([
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
        message: "Message retrieved successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
module.exports = {
  saveNewMessage,
  getMessagesService,
};
