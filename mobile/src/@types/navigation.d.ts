import { NavigatorScreenParams } from "@react-navigation/native";

export interface ProductDetailParams {
  id: string;
  name: string;
  price: string;
}

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: ProductDetailParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
