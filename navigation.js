import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import AcceleroMeterScreen from './screens/AcceleroMeterScreen';

const Stack = createNativeStackNavigator();


function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} >
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="details" component={TaskDetailScreen} />
          <Stack.Screen name="acc" component={AcceleroMeterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default Navigation;