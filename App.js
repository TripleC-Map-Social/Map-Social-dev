import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, TouchableWithoutFeedback, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };


// const App = () => {
//   return (
//     <NavigationContainer>
//       {<View style={styles.container}>
//          <Text>Hello from mapSocial!!!!</Text>
//          <View style={styles.buttonContainer}>
//           <Button 
//            title="Select a place"
//            color="black"
//            onPress={() => setCurrent(EventCreatorScreen)
//            //navigation.navigate('EventCreatorScreen', {placeName: 'REPLACE_WITH_NAME_OF_SELECT_LOCATION'})
//                    }
//            // width = {168}
//            // height = {26}
//            // left = {111}
//            // top = {747}
//            ></Button>
//          </View>
//        </View>}


//     </NavigationContainer>
//   );
// };

// const HomeScreen = ({navigation}) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         navigation.navigate('Profile', {name: 'Jane'})
//       }
//     />
//   );
// };

// const ProfileScreen = ({navigation, route}) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

// export default App;

 export default function App() {
  
  
    const [current, setCurrent] = useState('Home');

    const HomeScreen =  (
      <View style={styles.container}>
        <Text>Hello from mapSocial!!!!</Text>
        <View style={styles.buttonContainer}>
         <Button 
          title="Select a place"
          color="black"
          onPress={() => setCurrent(EventCreatorScreen)
          //navigation.navigate('EventCreatorScreen', {placeName: 'REPLACE_WITH_NAME_OF_SELECT_LOCATION'})
                  }
          // width = {168}
          // height = {26}
          // left = {111}
          // top = {747}
          ></Button>
        </View>
      </View>
    );
    
    const EventCreatorScreen = (
      <View>
         <Text>This is second Screen!!!!</Text>

      </View>

    );

    return current === 'Home' ? HomeScreen: current;
 
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
   
    backgroundColor: '#D9D9D9',
    width: 235,
    height: 77,
    position: 'absolute',
    top: 721,
    left: 78,
    fontWeight: 400,
    
    
    
  }
})
