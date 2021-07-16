const API_URL =  'https://emrecanminnet.me/api';
const routes = {
    IP:'/ip',
    GROUP: '/group', 
    LIST: '/list',
  };

function request(endpoint) {
  return new Promise((resolve,reject)=> {
    fetch(`${API_URL}${endpoint}`)
    .then(response => resolve( response.json()))
    .catch(error=> reject(error));
  })
}

function getIP() {
    return request(routes.IP)
}

function groupList() {
    return request(routes.GROUP)
}

function getVisitors() {
    return request(routes.LIST)
}

module.exports = {
    getIP,
    groupList,
    getVisitors
}