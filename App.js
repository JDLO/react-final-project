import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateVoterScreen from "./screens/CreateVoterScreen";
import VotersListScreen from "./screens/VotersListScreen";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateVoterScreen" component={CreateVoterScreen} />
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