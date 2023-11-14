import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateVoterScreen from "./screens/CreateVoterScreen";
import VotersListScreen from "./screens/VotersListScreen";
import PoliticPartiesListScreen from "./screens/PoliticPartiesListScreen";
import CreatePoliticPartyScreen from "./screens/CreatePoliticPartyScreen";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" 
                    component={LoginScreen} 
                    options={{ title: 'Login' }} />
      <Stack.Screen name="Home" component={Home} options={{ title: 'Casa' }} />
      <Stack.Screen name="PoliticPartiesListScreen" 
                    component={PoliticPartiesListScreen} 
                    options={{ title: 'Partidos' }} />
      <Stack.Screen name="CreatePoliticPartyScreen" 
                    component={CreatePoliticPartyScreen}
                    options={{ title: 'Crear partido' }} />
      <Stack.Screen name="CreateVoterScreen" 
                    component={CreateVoterScreen} 
                    options={{ title: 'Crear votante' }}/>
      <Stack.Screen name="VotersListScreen" 
                    component={VotersListScreen} 
                    options={{ title: 'Votantes' }} />
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