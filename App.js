import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateVoterScreen from "./screens/CreateVoterScreen";
import VotersListScreen from "./screens/VotersListScreen";
import PoliticPartiesListScreen from "./screens/PoliticPartiesListScreen";
import CreatePoliticPartyScreen from "./screens/CreatePoliticPartyScreen";
import LoginScreen from "./screens/LoginScreen";
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PoliticPartiesListScreen" component={PoliticPartiesListScreen} />
      <Stack.Screen name="CreateVoterScreen" component={CreateVoterScreen} />
      <Stack.Screen name="CreatePoliticPartyScreen" component={CreatePoliticPartyScreen} />
      <Stack.Screen name="VotersListScreen" component={VotersListScreen} />
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