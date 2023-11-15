import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePoliticPartyScreen from "./screens/CreatePoliticPartyScreen";
import CreateVoterScreen from "./screens/CreateVoterScreen";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import PoliticPartiesListScreen from "./screens/PoliticPartiesListScreen";
import VotersListScreen from "./screens/VotersListScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        }

        if (route.name === 'PoliticPartiesListScreen') {
          iconName = focused
            ? 'file-tray-sharp'
            : 'file-tray-outline';
        }

        if (route.name === 'VotersListScreen') {
          iconName = focused
            ? 'person'
            : 'person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      // tabBarActiveTintColor: '',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={Home}
        options={{ title: 'Casa', headerLeft: () => <></>, }} />
      <Tab.Screen name="PoliticPartiesListScreen"
        component={PoliticPartiesListScreen}
        options={{ title: 'Partidos' }} />
      <Tab.Screen name="VotersListScreen"
        component={VotersListScreen}
        options={{ title: 'Votantes' }} />
    </Tab.Navigator>
  )
}

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Login' }} />
      <Stack.Screen name="HomePrincipal" component={HomeStack} options={{
        gestureEnabled: false,
        headerShown: false,
      }} />
      <Stack.Screen name="CreatePoliticPartyScreen"
        component={CreatePoliticPartyScreen}
        options={{ title: 'Crear partido' }} />
      <Stack.Screen name="CreateVoterScreen"
        component={CreateVoterScreen}
        options={{ title: 'Crear votante' }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer >
      <MyStack></MyStack>
    </NavigationContainer>
  );
}