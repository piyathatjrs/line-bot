"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "Trkk6NZiJgsrk7qFr1klaMA32EKjvqmigI48XGk6hKPw2AIVyxw6IU6tdj5rOBQRrU+H/dm0IZoQNoqtVsjfttxAlmTwoVggvUBGgyDRaFqT6ZVQTeN99kqaDJx9ycxKTGYUXwxuxq7k6hv/qVkJvQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "197977fb67765940cb7528882342c8d2",
};
// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event);
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.text === "รูปภาพ") {
    const userId = event.source.userId;
    const payload = {
      type: "image",
      originalContentUrl: "soil_pic",
      previewImageUrl: "soil_pic",
    };
    return client.replyMessage(event.replyToken, payload);
  }

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.text === "รับรหัส") {
    const userId = event.source.userId;

    const payload = {
      type: "imagemap",
      baseUrl:
        "https://ex10.tech/store/v1/public/content/upload/imagemap/edc91ab1-83ca-4038-8d37-0ca61ed4b71a/",
      altText: "This is an imagemap",
      baseSize: {
        width: 1040,
        height: 1040,
      },
      actions: [
        {
          type: "message",
          area: {
            x: 71,
            y: 123,
            width: 924,
            height: 859,
          },
        },
        {
          area: {
            x: 965,
            y: 872,
            width: 2,
            height: 2,
          },
        },
      ],

      // type: "text",
      // text: "กดลิงค์นี้ http://localhost/project/Login_v16/login_add_line.php?id_line="+userId+" หรือนำรหัส '"+userId+"' ไปใส่ในเว็ปตรงเมนู เชื่อต่อLINE",
    };

    return client.replyMessage(event.replyToken, payload);
  } else {
    const dispay_name = event.source.type;
    const else_text = {
      type: "text",
      text: dispay_name + "sdasdasd",
    };
    return client.replyMessage(event.replyToken, else_text);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
