import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { BlurView } from 'expo-blur';

export default function App() {

  const [current, setCurrent] = useState('Home');   // navigation
  const [poi, setPoi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState({ latitude: 32.88123691352959, longitude: -117.23760781304348 });
  const [eventForm, setEventForm] = useState({ title: '', description: '', category: '', location: '' });

  function onPress(e) {
    console.log("onPress ++++++++");
    console.log(e.nativeEvent.coordinate);
    // console.log(e.placeId, e.name, e.coordinate);  // undefined x3 
    // 需要后端：(经度、纬度) --> 从已创建的events中找到最近的event(groups)。
    // If there's are event(s) here around, show them as popup(s)
    setPoi(e.nativeEvent);
  }



  const HomeScreen = (
    <View style={styles.container}>
      <MapView style={styles.map}
        //template for region I guess
        initialRegion={{
          latitude: 32.8815919,
          longitude: -117.2379339,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={e => onPress(e)}>
        {poi && (
          <Marker coordinate={poi.coordinate}>
            <Callout>
              <View>
                <Text>Place Id: {poi.placeId}</Text>
                <Text>Name: {poi.name}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>



      {/* Create Event button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Create Event"
          color="black"
          // onPress={() => setCurrent(EventCreatorScreen)}
          onPress={() => setModalVisible(true)}

        ></Button>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <BlurView style={{ flex: 1 }} intensity={60}>
          <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.title}> Create your event </Text>

            <Text style={styles.label}> Title </Text>
            <TextInput style={styles.input} placeholder="Event name"
              value={eventForm.title}
              onChangeText={txt => setEventForm({ ...eventForm, title: txt })} />

            <Text style={styles.labelSmall}> Description (optional) </Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="What this event is about/ how to find it"
              value={eventForm.description}
              onChangeText={txt => { setEventForm({ ...eventForm, description: txt }); console.log(eventForm) }} />

            <Text style={styles.label}> Category </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>

              <TouchableOpacity
                style={eventForm.category == 'Food' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                onPress={e => setEventForm({ ...eventForm, category: 'Food' })}>
                <Text style={styles.buttonText}>Food</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={eventForm.category == 'Study' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                onPress={e => setEventForm({ ...eventForm, category: 'Study' })}>
                <Text style={styles.buttonText}>Study</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={eventForm.category == 'Hangout' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                onPress={e => setEventForm({ ...eventForm, category: 'Hangout' })}>
                <Text style={styles.buttonText}>Hangout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={eventForm.category == 'Other' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                onPress={e => setEventForm({ ...eventForm, category: 'Other' })}>
                <Text style={styles.buttonText}>Other</Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.label}> Location </Text>

            <TextInput style={styles.inputSmall} placeholder="Search for location" />


            <MapView
              style={styles.mapSmall}
              initialRegion={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0007, longitudeDelta: 0.0007, }}
            >
              <Marker coordinate={location} />
            </MapView>



            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


              <TouchableOpacity style={styles.controlButton} onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>


            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    </View>




  );

  return current === 'Home' ? HomeScreen : EventCreatorScreen;



}



const styles = StyleSheet.create({
  title: {
    fontSize: 37,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'left',
    marginLeft: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventPost: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 30,

    fontSize: 18,
  },
  labelSmall: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 30,

    fontSize: 14,
  },
  input: {
    // width: 300,
    height: 40,
    marginHorizontal: 30,
    marginTop: 5,
    paddingHorizontal: 20,
    // borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'stretch',

    backgroundColor: '#fff',
    borderColor: 'green',


    fontSize: 18,
  },
  inputSmall: {
    height: 35,
    marginHorizontal: 30,
    marginTop: 5,
    paddingHorizontal: 20,
    // borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'stretch',

    backgroundColor: '#fff',
    borderColor: 'green',

    fontSize: 15,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,

    borderRadius: 15,

  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  mapSmall: {
    height: 200,
    marginVertical: 10,
    marginHorizontal: 30,
  },

  controlButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,

  },
  // Create Event button
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: 235,
    height: 77,
    position: 'absolute',
    top: 721,
    left: 78,
    borderRadius: 15,

  },
  map: {
    width: '100%',
    height: '100%',
  }
});

const searchBarStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,

  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
  },
  listView: {
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    elevation: 1,
    zIndex: 1,
  },
  poweredContainer: {
    height: 0,
    opacity: 0,
  },
});