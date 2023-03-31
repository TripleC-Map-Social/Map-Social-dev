import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View, TextInput,  Alert,
  Animated,
  TouchableOpacity,} from 'react-native';
import React, {useState} from 'react';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer }  from '@react-navigation/native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRef } from 'react';

 

 export default function App() {
  
  
    const [current, setCurrent] = useState('Home');

    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {_renderIcon(routeName, selectedTab)}
        </TouchableOpacity>
      );
    };

    //home screen compenents
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

      <View style={styles.searchSection}>
      <Icon style={styles.searchIcon} name="search" size={20} color="#000"/>
      <TextInput
        style={styles.input}
        placeholder="Search Event"
        onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
      />
      </View>
      <View style={styles.navbackground}>
      <AntDesign style= {styles.addBar} name={'pluscircle'} color="#5CC392" size={66} 
      onPress={() => Alert.alert('Click Action')}/>

        </View>

      

      
        </View>
      );

    
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
 
  map: {
    width: '100%',
    height: '100%',
     
  }, 

  //for textbox
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position:'absolute',
    top: 67,
    left: 30,
    width:261,
    height:44,
    borderRadius:45,
    
},
navbackground:{
  
  width: 66,
  height: 66,
  borderRadius: 33,
  backgroundColor: 'white',
  bottom: 16,
  position: 'absolute',
    
},
addBar: {
 
  width: 66,
  height: 66,
  position: 'absolute',

  
 
  
  //  top: 500,


},
searchIcon: {
    padding: 10,
    color:"#808080",
    
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    
    
},


    

})

