import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, TouchableWithoutFeedback, Text, View } from 'react-native';
import React, {useState} from 'react';

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
      <View style={styles.eventPost}>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>
        <Text>This is second Screen!!!!</Text>

        

      </View>

    );

    return current === 'Home' ? HomeScreen: EventCreatorScreen;
 
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // eventPost: {
  //   backgroundColor:'',
  // },
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