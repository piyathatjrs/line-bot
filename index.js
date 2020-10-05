'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
// create LINE SDK config from env variables

const mysql = require("mysql"); // เรียกใช้ mysql
const db = mysql.createConnection({
  // config ค่าการเชื่อมต่อฐานข้อมูล
  host: "localhost",
  user: "root",
  password: "",
  database: "myproject",
});
db.connect(); // เชื่อมต่อฐานข้อมูล


const config = {
  channelAccessToken: "Trkk6NZiJgsrk7qFr1klaMA32EKjvqmigI48XGk6hKPw2AIVyxw6IU6tdj5rOBQRrU+H/dm0IZoQNoqtVsjfttxAlmTwoVggvUBGgyDRaFqT6ZVQTeN99kqaDJx9ycxKTGYUXwxuxq7k6hv/qVkJvQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "197977fb67765940cb7528882342c8d2",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

});
// event handler
function handleEvent(event) {

  let sql = "SELECT * FROM sensor";
  let query = db.query(sql, (err, results) => {
    // สั่ง Query คำสั่ง sql
    if (err) throw err; // ดัก error
    console.log(results); // แสดงผล บน Console

    //res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
    res.send({ message: "Ahoy!" });
  });








  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }else if(event.message.text === "Hello"){
    const userId = event.source.userId;
    const payload = {
      type:"text",
      text: event.replyToken
    };
     return client.replyMessage(event.replyToken ,payload);
  }
  if(event.type != 'message' || event.message.type != 'text'){
    return Promise.resolve(null);
  }else if(event.message.text === 'charonesak_P@silpakorn.edu'){
    const str  = {
      type : "text",
      text:"เริ่มต้นการใช้งาน : โดยที่แจ้งเตือนไปยัง ---> email : charonesak_P@silpakorn.edu"
    };
    return client.replyMessage(event.replyToken , str);
  }
}



// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});





