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
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://www.img.in.th/images/e1008b27b0847f532a1f67255e5ac241.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "Line",
          uri: "https://linecorp.com/",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "baseline",
            margin: "md",
            contents: [
              {
                type: "text",
                text: "กรุณาเชื่อมต่อบัญชี",
                weight: "bold",
                size: "lg",
                color: "#000000FF",
                align: "center",
                gravity: "center",
                margin: "xs",
                wrap: true,
                style: "normal",
                contents: [],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        flex: 0,
        spacing: "sm",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "เชื่อมต่อบัญชี",
              uri: "https://linecorp.com",
            },
            color: "#1CB430FF",
            margin: "md",
            style: "primary",
          },
          {
            type: "spacer",
            size: "sm",
          },
        ],
      },
    };

    return client.replyMessage(event.replyToken, payload);
  } else {
    const dispay_name = event.source.type;
    const else_text = {
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://www.img.in.th/images/e1008b27b0847f532a1f67255e5ac241.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "Line",
          uri: "https://linecorp.com/",
        },
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "baseline",
            margin: "md",
            contents: [
              {
                type: "text",
                text: "กรุณาเชื่อมต่อบัญชี",
                weight: "bold",
                size: "lg",
                color: "#000000FF",
                align: "center",
                gravity: "center",
                margin: "xs",
                wrap: true,
                style: "normal",
                contents: [],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        flex: 0,
        spacing: "sm",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "เชื่อมต่อบัญชี",
              uri: "https://linecorp.com",
            },
            color: "#1CB430FF",
            margin: "md",
            style: "primary",
          },
          {
            type: "spacer",
            size: "sm",
          },
        ],
      },
    };
    return client.replyMessage(event.replyToken, else_text);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
