import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const VideoStack=createStackNavigator();
const FolderStack=createStackNavigator();
const SearchStack=createStackNavigator();
const ShareStack=createStackNavigator();
const Tabs =createBottomTabNavigator();

const VideoStackScreen = () => (
	<VideoStack.Navigator>
		<VideoStack.Screen name="Video" component={VideoScreen}/>
	</VideoStack.Navigator>
);

// const TabNavigator = () => (
// 	<Tabs.Navigator>
// 			<Tabs.Screen name="Image" component={ImageStackScreen}/>
// 			<Tabs.Screen name="Video" component={VideoStackScreen}/>
// 	</Tabs.Navigator>
// );