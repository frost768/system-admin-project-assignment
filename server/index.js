const express = require('express')
const app = express()
const { create, list,groupedByIp } = require('./db.js')
const routes = {
  IP:'/ip',
  GROUP: '/group',
  LIST: '/list',
};

app.get(routes.IP, async function (req, res) {
  try {
    let ip = req.header('X-Real-Ip');
    await create(ip)
  } catch (error) {
    
  }
  res.setHeader('Content-Type', 'application/json');
  res.json({ ip: req.header('X-Real-Ip') });
})

app.get(routes.GROUP, async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    let response = await groupedByIp()
    res.json(response);
  } catch (error) {
    
  }
})

app.get(routes.LIST, async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    let records = await list();
    res.json(records);
  } catch (error) {
    console.log(error);
  }
})

app.listen(process.env.PORT)
console.log(`PORT ${process.env.PORT}`);