const chalk = require('chalk');
const getEndpoints = (router, endpoints = [], parentRoute = '') => {
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        const route = middleware.route;
        endpoints.push({
          method: Object.keys(route.methods).join(', '),
          path: parentRoute + route.path,
        });
      } else if (middleware.handle && middleware.handle.stack) {
        getEndpoints(middleware.handle, endpoints, parentRoute + middleware.regexp.source);
      }
    });
    return endpoints;
}

const getSpaceForPrintingPath = (method, spaces)=>{
    let spaceForReturn = "";
    let dynamicSpace = 0;
    if(method.toLowerCase()==='get' || method.toLowerCase()==='put'){
        dynamicSpace = spaces;
    }else if(method.toLowerCase()==='post'){
        dynamicSpace = spaces-1
    }else if(method.toLowerCase()==='delete'){
        dynamicSpace = spaces-3
    }

    for(let i = 0; i<dynamicSpace; i++){
        spaceForReturn+= " ";
    }
    return spaceForReturn;
}

const getMethodColor = (methodName)=>{
  const method = methodName.toLowerCase();
  if(method==="get"){
    return chalk.green(methodName);
  }else if(method==="post"){
    return chalk.yellow(methodName);
  }else if(method==="put"){
    return chalk.blue(methodName);
  }else if(methodName==="delete"){
    return chalk.red(methodName);
  }else{
    return chalk.white(methodName);
  }
}

module.exports = {getEndpoints, getSpaceForPrintingPath, getMethodColor}