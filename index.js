const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const https = require('https');
const http = require('http');
const myurl = require('url');
const jsonData = require('./myWallpaper.json');
const querystring = require('qs');
const request = require('request');
const fs = require('fs');

// const userRoute = require('./routes/user.route');
// const adminRoute = require('./routes/Admin.route');
// const categoriesRoute = require('./routes/Category.route');
// const subCategoriesRoute = require('./routes/SubCategory.route');
// const wallPaperRoute = require('./routes/Wallpaper.route');
// const colorRoute = require('./routes/Color.route');

const wallPaperRoute = require('./sqlRoutes/Wallpaper.route');
const categoriesRoute = require('./sqlRoutes/Category.route');
const subCategoriesRoute = require('./sqlRoutes/SubCategory.route');
const colorRoute = require('./sqlRoutes/Color.route');
const authRoute = require('./sqlRoutes/Auth.route');
const userRoute = require('./sqlRoutes/User.route');

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

require('./config/db.config').connect();

function createURL({ scheme, server, path = '', ...rest }) {
  let url = `${scheme}://${server}/${path}`;
  let param = new URLSearchParams(getEntries(rest)).toString();
  if (param)
    url += "?" + param;
  return url
}

function getEntries(o = {}) {
  const entries = [];
  for (const [k, v] of Object.entries(o)) {
    if (Array.isArray(v))
      entries.push(...v.flatMap(getEntries))
    else if (typeof v === 'object')
      entries.push(...getEntries(v))
    else entries.push([k, v])
  }
  return entries;
}
const url = createURL({
  scheme: "http",
  server: "localhost:9000",
  path: "wallpaper",

})

console.log(url);


const server = http.createServer((req,res)=>{
  const urlObject = myurl.parse(url, true);
  fs.readFile('./myWallpaper.json', (err,data)=>{
    res.writeHead(200, {'Cintent-Type': 'application/json'});
    res.write(data);
  })
})



// const codestring = jsonData;

// // Build the post string from an object
// var post_data = querystring.stringify({
//   compilation_level: 'ADVANCED_OPTIMIZATIONS',
//   output_format: 'json',
//   output_info: 'compiled_code',
//   warning_level: 'QUIET',
//   js_code: codestring,
// });

// // An object of options to indicate where to post to
// var post_options = {
//   host: 'mywallpap.com',
//   port: '443',
//   path: '/wallpaper',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(post_data),
//   },
// };

// // Set up the request
// const post_req = https.request(post_options, function (res) {
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('Response: ' + chunk);
//   });
// });

// // post the data
// post_req.write(post_data);
// post_req.end();



// // console.log(jsonData);
// request({
//   url: url,
//   method: "POST",
//   json: true,   // <--Very important!!!
//   body: jsonData
// }, function (error, response, body){
//   console.log("response",error);
// });

app.use('/auth', authRoute.router);
// app.use('/admin', adminRoute.router);
app.use('/category', categoriesRoute.router);
app.use('/subcategory', subCategoriesRoute.router);
app.use('/wallpaper', wallPaperRoute.router);
app.use('/color', colorRoute.router);
app.use('/user', userRoute.router);

app.listen(process.env.API_PORT, () => console.log(`code is running on port ${process.env.API_PORT}`));
server.listen(9000,()=>console.log("server running on 9000"))