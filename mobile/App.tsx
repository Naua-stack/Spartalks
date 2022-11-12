import React, { useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";
import { Subscription } from "expo-modules-core";
import "./src/services/notificationConfig";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    Notifications.setNotificationCategoryAsync("ChatMessage", [
      {
        identifier: "answer-button",
        buttonTitle: "Responder",
        textInput: {
          placeholder: "Mensagem",
          submitButtonTitle: "Enviar",
        },
      },
      {
        buttonTitle: `Don't open app`,
        identifier: "first-button",
        options: {
          opensAppToForeground: false,
        },
      },
      {
        buttonTitle: "Respond with text",
        identifier: "second-button-with-text",
        textInput: {
          submitButtonTitle: "Submit button",
          placeholder: "Placeholder text",
        },
      },
      {
        buttonTitle: "Open app",
        identifier: "third-button",
        options: {
          opensAppToForeground: true,
        },
      },
    ])
      .then((_category) => {})
      .catch((error) =>
        console.warn("Could not have set notification category", error)
      );
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //console.log("received", notification.request.content)
      });

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        if (notification.actionIdentifier === "answer-button") {
          console.log(notification.userText);
        }
      });

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
