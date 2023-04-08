import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Button, Text, View, SafeAreaView, TextInput, Image, Modal,
  TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Switch,
  Vibration, Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  // ---------------- Constants ----------------
  const userImage = require('./testdata/avatar1.jpeg');
  const dateFormat = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    // year: 'numeric',
    hour: 'numeric',
    // minute: 'numeric',
    hour12: true,
  };
  const ZOOM = 0.2;    // map zoom level when creating new event


  // ----------------- States -----------------
  const [current, setCurrent] = useState('Home');   // navigation
  const mapRef = useRef(null);

  // Search Component
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState({
    text: '',
    category: 'All',
    time: null,  // events within 1 hour, 1 day, 1 week, 1 month, 1 year, all time
  });

  // Create Event Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    public: false,
    location: { latitude: 32.88123691352959, longitude: -117.23760781304348 },  // G馆
    datetime: new Date((new Date()).getTime() + 1000 * 2 * 60 * 60),    // 2小时后
  });
  // Mini Map in Create Event Modal
  const newMapRef = React.useRef(null);
  const markerSize = new Animated.Value(50);
  const [region, setRegion] = useState({
    latitude: 32.88123691352959,
    longitude: -117.23760781304348,
    latitudeDelta: 0.007,
    longitudeDelta: 0.002,
  });

  // Make sure newMap is centered on mainMap initially
  useEffect(() => {
    if (modalVisible) {
      newMapRef.current.animateToRegion({ latitude: form.location.latitude, longitude: form.location.longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta });
    }
  }, [newMapRef.current]);



  // ----------------- Fake Backend -----------------
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  // ------------------------------------------------


  const handleSearchTextChange = (text) => {
    // setSearchText(text);
    // console.log(searchText);
    setSearch({ ...search, text: text });
    console.log(search);

    // send text to backend, receive matching events (async)
  }

  const handleCategoryChange = (category) => {
    // setSearchCategory(category);
    // console.log(searchCategory, category);
    setSearch({ ...search, category: category });
    console.log(search);

    // backend filter events by category
  }


  const submitForm = () => {
    // Check if form is valid
    if (form.title == '' || form.category == '') {
      alert('Your event must have a title and a category :)');
      return;
    }

    // TODO: send form to backend
    let newForm = { ...form, user: userImage }
    setEvents([...events, newForm]);

    // Set main map region to new event location
    mapRef.current.animateToRegion({ latitude: form.location.latitude, longitude: form.location.longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta });

    console.log('-----------Submitted Form-----------');
    console.log(form);
    console.log();

    // If new event is sent correctly, close modal, reset form
    setForm({
      title: '',
      description: '',
      category: '',
      public: false,
      location: { latitude: 32.88123691352959, longitude: -117.23760781304348 },  // G馆
      datetime: new Date((new Date()).getTime() + 1000 * 2 * 60 * 60),    // 2小时后
    });


    setModalVisible(false);
  }





  const HomeScreen = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* Search Component */}
      <View style={searchStyles.container}>
      <Icon style={searchStyles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
          style={searchStyles.searchBar}
          value={searchText}
          placeholder={"search for event"}
          onChangeText={handleSearchTextChange}
        > 
       </TextInput>
        <View style={searchStyles.buttonContainer}>
          <TouchableOpacity
            style={search.category == 'All' ? { ...searchStyles.button, backgroundColor: '#D3F5E4' } : searchStyles.button}
            onPress={() => handleCategoryChange('All')}>
            <Text style={searchStyles.buttonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={search.category == 'Eat' ? { ...searchStyles.button, backgroundColor: '#FFD580' } : searchStyles.button}
            onPress={() => handleCategoryChange('Eat')}>
            <Text style={searchStyles.buttonText}>Eat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={search.category == 'Study' ? { ...searchStyles.button, backgroundColor: 'yellow' } : searchStyles.button}
            onPress={() => handleCategoryChange('Study')}>
            <Text style={searchStyles.buttonText}>Study</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={search.category == 'Hangout' ? { ...searchStyles.button, backgroundColor: 'green' } : searchStyles.button}
            onPress={() => handleCategoryChange('Hangout')}>
            <Text style={searchStyles.buttonText}>Hgout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={searchStyles.button}
            onPress={() => { setEvents([]) }}>
            <Text style={searchStyles.buttonText}>ClearAll</Text>
          </TouchableOpacity>


        </View>
      </View>

      {/* Main Map Component */}
      <MapView style={styles.map}
        initialRegion={region}
        ref={mapRef}
        // onRegionChangeComplete={(reg) => {
        //   setRegion(reg);
        //   // console.log({ reg });
        //   setForm({ ...form, location: { latitude: reg.latitude, longitude: reg.longitude } });
        // }}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        {events.map((event, index) => (
          <Marker
            key={index}
            coordinate={event.location}
          >
            <Image source={event.user} style={styles.avatar} />
            {/* TODO: format Callout popup. Clickable. */}
            <Callout style={calloutStyles.callout}>
              <View >
                <Text style={calloutStyles.title}>{event.title}</Text>
                <Text style={calloutStyles.description}>{event.datetime.toLocaleString('en-US', dateFormat)}</Text>
                <Button title="Join" onPress={() => { }} />
              </View>
            </Callout>
          </Marker>))}

      </MapView>



      {/* Create Event button */}
      <View style={styles.navbackground}>


<AntDesign style= {styles.addBar} name={'pluscircle'} color="#5CC392" size={66} 
     onPress={() => {
      setModalVisible(true);
      setForm({ ...form, location: { latitude: region.latitude, longitude: region.longitude } });
      setRegion({ ...region, latitudeDelta: region.latitudeDelta * ZOOM, longitudeDelta: region.longitudeDelta * ZOOM });
    }}/>

      </View>

      {/* Create Event Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <BlurView style={{ flex: 1 }} intensity={60}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1 }}>
              <Text style={styles.title}> Create your event </Text>

              <Text style={styles.label}> Title </Text>
              <TextInput style={styles.input} placeholder="Event name"
                value={form.title}
                onChangeText={txt => setForm({ ...form, title: txt })} />

              <Text style={styles.labelSmall}> Description (optional) </Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="What this event is about/ how to find it"
                value={form.description}
                onChangeText={txt => setForm({ ...form, description: txt })} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={styles.label}> Category </Text>
                <Text style={{ ...styles.labelSmall, marginRight: 30, }}> Public </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>

                <TouchableOpacity
                  style={form.category == 'Food' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                  onPress={e => setForm({ ...form, category: 'Food' })}>
                  <Text style={styles.buttonText}>Food</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={form.category == 'Study' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                  onPress={e => setForm({ ...form, category: 'Study' })}>
                  <Text style={styles.buttonText}>Stdy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={form.category == 'Hangout' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                  onPress={e => setForm({ ...form, category: 'Hangout' })}>
                  <Text style={styles.buttonText}>Hgout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={form.category == 'Other' ? { ...styles.button, backgroundColor: '#FFD580' } : styles.button}
                  onPress={e => setForm({ ...form, category: 'Other' })}>
                  <Text style={styles.buttonText}>Other</Text>
                </TouchableOpacity>

                <Switch
                  style={{ marginRight: 10, marginTop: 12, alignSelf: 'auto' }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={form.public ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={form.public}
                  onValueChange={() => setForm({ ...form, public: !form.public })}
                />

              </View>

              <Text style={styles.label}> Location </Text>

              <TextInput style={styles.inputSmall} placeholder="Search for location" />


              <MapView
                style={styles.mapSmall}
                // initialRegion={{ latitude: form.location.latitude, longitude: form.location.longitude, latitudeDelta: 0.0007, longitudeDelta: 0.0007, }}
                initialRegion={region}
                ref={newMapRef}

                onRegionChangeComplete={(reg) => setRegion(reg)}

              >
                <Marker
                  coordinate={form.location}
                  draggable
                  onDragStart={() => {
                    Vibration.vibrate(100);
                    Animated.timing(markerSize, {
                      toValue: 60,
                      duration: 50,
                      useNativeDriver: false,
                    }).start();
                  }}
                  onDragEnd={(e) => {
                    const coord = e.nativeEvent.coordinate;
                    setForm({ ...form, location: coord });
                    const newRegion = {
                      latitude: coord.latitude,
                      longitude: coord.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longtitudeDelta,
                    }
                    newMapRef.current.animateToRegion(newRegion);
                    Animated.timing(markerSize, {
                      toValue: 50,
                      duration: 100,
                      useNativeDriver: false,
                    }).start();

                  }}
                >
                  <Animated.Image
                    source={userImage || require('./testdata/defaultAvatar.jpg')}
                    style={{ ...styles.avatar, width: markerSize, height: markerSize }}
                  />
                </Marker>
              </MapView>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 35 }}>

                <View>
                  <Text style={{ ...styles.label, marginLeft: 0, marginBottom: 3 }}>Date</Text>
                  <DateTimePicker
                    testID="datePicker"
                    value={form.datetime}
                    onChange={(e, selectedDate) => { setForm({ ...form, datetime: selectedDate }); }}
                    mode={'date'}
                    display="compact"
                    style={{ marginRight: 30, maxWidth: 300 }}
                  />

                </View>


                <View>
                  <Text style={{ ...styles.label, marginLeft: 0, marginBottom: 3 }}>Time</Text>
                  <DateTimePicker
                    testID="timePicker"
                    value={form.datetime}
                    onChange={(e, selectedDate) => setForm({ ...form, datetime: selectedDate })}
                    mode={'time'}
                    display="compact"
                    style={{ marginRight: 50, maxWidth: 200, position: 'fixed' }}
                  />
                </View>

              </View>


              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => { setModalVisible(false); setRegion({ ...region, latitudeDelta: region.latitudeDelta / ZOOM, longitudeDelta: region.longitudeDelta / ZOOM }); }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...styles.controlButton, backgroundColor: '#5CC392' }}
                  onPress={submitForm}>
                  <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Create</Text>
                </TouchableOpacity>

              </View>

            </SafeAreaView>
          </TouchableWithoutFeedback>
        </BlurView>
      </Modal>
    </View>




  );

  return HomeScreen


}

const calloutStyles = StyleSheet.create({
  callout: {
    width: 200,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
  },
});

const searchStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '8%',
    left: '10%',
    backgroundColor: 'transparent',
    height: '5%',
    zIndex: 1,
  },
  searchBar: {
    backgroundColor: 'white',
    height: '100%',
    width: '75%',
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    zIndex:2,
    paddingStart: 35,
  

    borderColor: '#F3F3F3',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: '4%',
  },
  searchIcon: {
    left: '4%',
    color:"#808080",
    paddingRight: 5,
    // top:'70%',
    zIndex:3,
    top: '70%',
    
  
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonHighlighted: {
    backgroundColor: '#D3F5E4',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
    paddingHorizontal: 1,
  },
  category: {
    paddingHorizontal: 5,
  }
})

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'orange',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 37,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'left',
    marginLeft: 30,
  },
  navbackground:{
    backgroundColor: 'white',
    width: 66,
    height: 66,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'space-between',

    bottom: '4%',
    alignItem: 'center',
    position: 'absolute',
    zIndex: 1,
      
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

    fontSize: 19,
  },
  labelSmall: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 30,

    fontSize: 15,
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


    fontSize: 19,
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

    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,

  },
  buttonHighlighted: {
    backgroundColor: '#FFD580',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  mapSmall: {
    height: 190,
    marginVertical: 10,
    marginHorizontal: 30,
  },

  controlButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 35,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Create Event button
  buttonContainer: {
    backgroundColor: '#5CC399',
    padding: 10,
    width: 235,
    height: 77,
    position: 'absolute',
    top: 721,
    left: 78,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'relative',
    zIndex:0,
  }
});

const GMapSearchBarStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,

  },
  addBar: {
 
    width: 66,
    height: 66,
    position: 'absolute',
  

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