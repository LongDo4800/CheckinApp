import { ImageURISource } from 'react-native'
import { NavigatorScreenParams } from '@react-navigation/native'


export type TopNavigatorParamsList = {
  Splash: undefined
  HomeScreen: undefined
  LoginScreen: undefined
  ForgotPasswordScreen: undefined
}
export type ModalNavigatorParamsList = {
  BoatInformation: BoatParams
  Definition: { word: string; definition: string }
}
export type BoatParams = {
  name: string
  text: string
  image: ImageURISource
  credit: string
}

export type RootNavigatorParamsList = {
  Main: NavigatorScreenParams<TopNavigatorParamsList>
  Modal: NavigatorScreenParams<ModalNavigatorParamsList>
}

export type DrawerNavigatorParamsList = {
  HomeScreen: undefined
  ContactsScreen: undefined
  TimwookScreen: undefined
}
