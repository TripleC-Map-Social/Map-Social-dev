import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View, TextInput } from 'react-native';
import React, {useState} from 'react';
import MapView from 'react-native-maps';


 export default function App() {
  
  
    const [current, setCurrent] = useState('Home');

    const HomeScreen =  (
    <View style={styles.container}>
    <MapView style={styles.map}
    //template for region I guess
    initialRegion={{
      latitude: 32.8815919,
      longitude: -117.2379339,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}/>

      <Text>Hello from mapSocial!!!!</Text>
        <View style={styles.buttonContainer}>
         <Button 
          title="Select a place"
          color="black"
          onPress={() => setCurrent(EventCreatorScreen)
          
                  }
    
          ></Button>
        </View>
      </View>
    );

    //add map
    // function getInitialState() {
    //   return {
    //     region: {
    //       latitude: 32.8815919,
    //       longitude: -117.2379339,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     },
    //   };
    // }
    
    //change map region data
    function onRegionChange(region) {
      this.setState({ region });
    }
    
    //update new region
    function render() {
      return (
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      );
    }


    //screen for event post
    const EventCreatorScreen = (
      <View style={styles.eventPost}>
        
        <TextInput style={styles.input} placeholder="Selected location" />

        

      </View>

    );

    //return render;
    
    return current === 'Home' ? HomeScreen: EventCreatorScreen;

 
  
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

  },
  map: {
    width: '100%',
    height: '100%',
  }
})