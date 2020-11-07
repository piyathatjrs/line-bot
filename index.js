"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    " ใส่ค่า channelAccessToken ",
  channelSecret: "ใส่ค่า channelSecret",
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
  } else if (event.message.text === "เชื่อมต่อ") {
    const userId = event.source.userId;
    const payload = {
      "type": "flex",
      "altText": "Flex Message",
      "contents": {
        "type": "bubble",
        "direction": "ltr",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "เข้าสู่ระบบเพื่อยืนยันบัญชี",
              "align": "center"
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://www.img.in.th/images/348e70511f72684eeccbec9d4d9ab777.png",
          "size": "full",
          "aspectRatio": "1.51:1",
          "aspectMode": "fit"
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Verify Account",
                "uri":  'http://localhost/project/Login_v16/login_add_line.php?id_line='+userId+''
              },
              "color": "#05B003",
              "style": "primary"
            }
          ]
        }
      }
    }
    return client.replyMessage(event.replyToken, payload);
  }

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.text === "รับรหัส") {
    const userId = event.source.userId;
    const payload = {
      type: "flex",
      altText: "Flex Message",
      contents: {
        type: "bubble",
        direction: "ltr",
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Header",
              align: "center",
            },
          ],
        },
        hero: {
          type: "image",
          url:
            "https://developers.line.biz/assets/images/services/bot-designer-icon.png",
          size: "full",
          aspectRatio: "1.51:1",
          aspectMode: "fit",
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "Body",
              align: "center",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "Button",
                uri:
                  "http://localhost/project/Login_v16/login_add_line.php?id_line=" +
                  userId +
                  "",
              },
            },
          ],
        },
      },
    };

    return client.replyMessage(event.replyToken, payload);
  } else {
    const dispay_name = event.source.type;
    const else_text = {};
    return client.replyMessage(event.replyToken, else_text);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
