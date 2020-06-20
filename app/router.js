import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingScreen from './components/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import CreateEventScreen from './screens/CreateEventScreen'
import EventDetailScreen from "./screens/EventDetailScreen";

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `イベント一覧`,
        }),
    },
    CreateEvent: {
        screen: CreateEventScreen,
        navigationOptions: ({ navigation }) => ({
            title: `イベント`,
        }),
    },
    EventDetail: {
        screen: EventDetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: `イベント詳細`,
        }),
    },
});

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    { initialRouteName: 'Loading' }
);

const Router = createAppContainer(RoutesStack);

export default Router;
