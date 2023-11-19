module.exports = {
  API: {
    API_CONTEXT: "/hisanmastery/api/v1/",
    
    LOGIN: "login",
    REGISTER: "register",
    CREATE_BLOG:'create-blog',
    GET_BLOGS:'get-blogs/:id'

  },
  
  TABLE: {
    USERS: "Users",
  },

  VIEW: {
    BUYER: 'View_Buyer'
  },

  MESSAGE: {
    SERVER_ERROR: {
      CONTENT: "Internal server error",
      STATUS_CODE: 500
    },
    UNAUTHORIZED: {
      CONTENT: "Unauthorized",
      STATUS_CODE: 401
    },
    SUCCESS_GET: {
      CONTENT: "Successfully getting data from server",
      STATUS_CODE: 200,
    },
    SUCCESS_CREATED: {
      CONTENT: "Successfully resource created",
      STATUS_CODE: 201,
    },
    BAD_REQUEST: {
      CONTENT: "Bad request",
      STATUS_CODE: 400
    }
  },

  SOCKET: {
    NOTIFY_CHALLAN: "notify-challan"
  }
};
