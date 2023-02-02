import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, TouchableWithoutFeedback, Text, SafeAreaView, TextInput } from 'react-native';
import React, {useState} from 'react';

 export default function App() {
  
  
    const [current, setCurrent] = useState('Home');

    const HomeScreen =  (
      <SafeAreaView style={styles.container}>
        <Text>Hello from mapSocial!!!!</Text>
        <SafeAreaView style={styles.buttonContainer}>
         <Button 
          title="Select a place"
          color="black"
          onPress={() => setCurrent('EventPost')}
          />
        </SafeAreaView>
      </SafeAreaView>
    );
    
    const EventPost = (
      <SafeAreaView style={styles.eventPost}>
        <Button 
          title="Back to World"
          color="black"
          onPress={() => setCurrent('Home')}
        />

        <TextInput style={styles.input} placeholder="Selected location" />

        <TextInput style={styles.input} placeholder="Event name" />

        <TextInput style={styles.input} placeholder="Description (optional)" />
        
        

      </SafeAreaView>

    );

    const Navigator = {
      'Home': HomeScreen,
      'EventPost': EventPost,
    }

    return Navigator[current];
 
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventPost: {
    flex: 1,
    backgroundColor:'#F5F5F5',
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#5470FF',
    borderWidth: 1,
    borderRadius: 15, 
    fontSize: 16,

    width: 233,
    height: 36,
    left: 76,
    top: 127,
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