module.exports = {
  API: {
    API_CONTEXT: "/hisanmastery/api/v1/",
    
    LOGIN: "login",
    REGISTER: "register",
    USERINFO:'userinfo',
    DASHBOARD_TOTAL_PRODUCTION:'dashboard/totalProduction',
    DASHBOARD_TOTAL_TARGET:'dashboard/totalTarget',
    DASHBOARD_TOTAL_EFFICIENCY:'dashboard/totalEfficiency',
    DASHBOARD_AVG_DHU:'dashboard/avgDhu',
    DASHBOARD_LINE_RANK:'dashboard/lineRank',
    DASHBOARD_TARGET_PRODUCTION:'dashboard/targetProduction',
    DASHBOARD_ALL_DEFECTS:'dashboard/allDefects',
    DASHBOARD_TOP_FIVE_DEFECTS:'dashboard/topFiveDefects',
    DASHBOARD_LINE_WISE_DHU:'dashboard/lineWiseDhu',
    DASHBOARD_LINE_WISE_HOURLY_PRODUCTION:'dashboard/lineWiseHourlyProduction',
    DASHBOARD_HOURLY_PRODUCTION:'dashboard/hourlyProduction',
    DASHBOARD_RUNNING_STYLE_DETAILS:'dashboard/runningStyleDetails',

    CREATE_CHALLAN: 'approval/create-challan',
    APPROVE_CHALLAN: 'approval/approve-challan',
    REJECT_CHALLAN: 'approval/reject-challan',
    GET_CHALLAN_LIST: 'approval/approve-challan-list',
    GET_CHALLAN_SUMMARY: 'approval/challan-summary',

    CHALLAN_CHECKING: 'check/checking',
    CHALLAN_CHEKING_LIST: 'check/checking-list',
    CHALLAN_CHEKING_SUMMARY: 'check/summary',

    CHALLAN_USER_PERMISSION_LIST: 'permission/get-permission-list',
    CHALLAN_USER_PERMISSION_MAKE: 'permission/make-permission',


    WASH_DASHBOARD_DATA: 'wash-dashboard/all',
    WASH_DASHBOARD_DATA_TOTAL_PRODUCTION: 'wash-dashboard/all',
    WASH_DASHBOARD_DATA_TOTAL_PRODUCTION: 'wash-dashboard/total-production',
    WASH_DASHBOARD_DATA_THIS_MONTH_TOTAL_PRODUCTION: 'wash-dashboard/this-month-total-production',
    WASH_DASHBOARD_DATA_TOTAL_RECEIVE_GMT: 'wash-dashboard/total-received',
    WASH_DASHBOARD_DATA_TOTAL_DELIVERY: 'wash-dashboard/total-delivery',
    WASH_DASHBOARD_DATA_TOTAL_REJECTION_PERCENTAGE: 'wash-dashboard/rejection-percentage',
    WASH_DASHBOARD_DATA_WIP: 'wash-dashboard/wip',
    WASH_DASHBOARD_DATA_WEEKLY_RECEIVE_VS_DELIVER: 'wash-dashboard/weekly-receive-vs-delivery',
    WASH_DASHBOARD_DATA_STYLE_WISE_RECEIVE_VS_DELIVERY: 'wash-dashboard/style-wise-receive-vs-delivery',


    GATE_IN_OUT_DASHBOARD: 'dashboard/gate-in-out',


    FINISHING_DASHBOARD_DATA: 'finishing-dashboard/all',
    FINISHING_DASHBOARD_DATA_TOTAL_PRODUCTION: 'finishing-dashboard/all',
    FINISHING_DASHBOARD_DATA_TOTAL_PRODUCTION: 'finishing-dashboard/total-production',
    FINISHING_DASHBOARD_DATA_THIS_MONTH_TOTAL_PRODUCTION: 'finishing-dashboard/this-month-total-production',
    FINISHING_DASHBOARD_DATA_TOTAL_RECEIVE_GMT: 'finishing-dashboard/total-received',
    FINISHING_DASHBOARD_DATA_TOTAL_DELIVERY: 'finishing-dashboard/total-delivery',
    FINISHING_DASHBOARD_DATA_TOTAL_REJECTION_PERCENTAGE: 'finishing-dashboard/rejection-percentage',
    FINISHING_DASHBOARD_DATA_WIP: 'finishing-dashboard/wip',
    FINISHING_DASHBOARD_DATA_WEEKLY_RECEIVE_VS_PRODUCTION: 'finishing-dashboard/weekly-receive-vs-production',
    FINISHING_DASHBOARD_LINE_WISE_TARGET_PRODUCTION_DHU: 'finishing-dashboard/line-wise-target-production-dhu',
    FINISHING_DASHBOARD_DATA_STYLE_WISE_RECEIVE_VS_DELIVERY: 'finishing-dashboard/style-wise-receive-vs-delivery',
    FINISHING_DASHBOARD_DATA_ACHIEVEMENT: 'finishing-dashboard/achievement',

    FINISHING_STYLE_WISE_TARGET_ENTRY: 'finishing/style-wise-target-entry',
    FINISHING_STYLE_WISE_TARGET_LIST: 'finishing/style-wise-target-list',


    REPORT_CUTTING_TO_FINISHING: 'report/cutting-to-finishing',


    MASTER_GET_BUYER: 'master/get-all-buyer',
    MASTER_GET_STYLES: 'master/get-all-styles',
    MASTER_GET_UNIT_LIST: 'master/get-all-unit'
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
