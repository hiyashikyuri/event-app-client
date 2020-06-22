import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import CreateEventScreen from './screens/CreateEventScreen'
import EventDetailScreen from './screens/EventDetailScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SwipeScreen from "./screens/SwipeScreen";

const AppStack = createStackNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                title: `イベント一覧`,
            })
        },
        CreateEvent: {
            screen: CreateEventScreen,
            navigationOptions: ({ navigation }) => ({
                title: `イベント`,
            })
        },
        EventDetail: {
            screen: EventDetailScreen,
            navigationOptions: ({ navigation }) => ({
                title: `イベント詳細`,
            })
        }
    }
);

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        // こちらはheaderの戻るボタンが表示されないので、ログイン関係はこちらに入れている
        Login: LoginScreen,
        Signup: SignupScreen,
        Swipe: SwipeScreen,
        App: AppStack
    },
    { initialRouteName: 'Loading' }
);

const Router = createAppContainer(RoutesStack);

export default Router;
