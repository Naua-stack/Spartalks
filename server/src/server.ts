import express from "express";
import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

const app = express();

let expo = new Expo({});

app.get("/:expoToken/notification", (req, res) => {
  const expoToken = req.params.expoToken;

  if (!Expo.isExpoPushToken(expoToken)) {
    console.error(`Push token ${expoToken}`);
  }

  let tickets = [] as ExpoPushTicket[];

  (async () => {
    try {
      let messages = [];

      const message: ExpoPushMessage = {
        to: expoToken,
        sound: "default",
        body: "Somente por 4.500 com controle e fifa",
        title: "Promoção PS5",
        subtitle: "Promoção PS5 imperdível",
        categoryId: "ChatMessage",
        data: {
          page: "ProductDetail",
          params: {
            id: "2836",
            name: "Playstation 5",
            price: "R$ 4500.00",
          },
        },
      };

      messages.push(message);

      let ticket = await expo.sendPushNotificationsAsync(messages);

      tickets.push(...ticket);
    } catch (error) {
      console.error(error);
    }

    for (let ticket of tickets) {
      if (ticket.status === "ok") {
        return res.status(200).json("sucesso");
      } else {
        console.error("deu erro");
      }
    }
  })();
});

app.listen(3333);
