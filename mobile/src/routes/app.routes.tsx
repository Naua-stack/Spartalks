import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLastNotificationResponse } from "expo-notifications";
import Home from "../screens/Home";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductDetail from "../screens/ProductDetail";
import { ProductDetailParams, RootStackParamList } from "../@types/navigation";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  const lastNotificationResponse = useLastNotificationResponse();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (lastNotificationResponse) {
      const pageToNavigate = lastNotificationResponse.notification.request
        .content.data.page as any;

      const pageToNavigateParams = lastNotificationResponse.notification.request
        .content.data.params as any;

      console.log(pageToNavigateParams);

      if (pageToNavigate) {
        navigate(pageToNavigate, pageToNavigateParams);
      }
    }
  }, [lastNotificationResponse]);

  return (
    <Navigator>
      <Screen name="Home" component={Home} />

      <Screen name="ProductDetail" component={ProductDetail} />
    </Navigator>
  );
}
