import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newTitle, setTitle] = useState("");
  const [newLocation, setLocation] = useState("");
  const [newBody, setBody] = useState("");
  const [newDate, setDate] = useState(Date.now());

  const [instances, setInstances] = useState([]);
  const instanceRef = collection(db, "instance");

  const createInstance = async () => {
    await addDoc(instanceRef, { title: newTitle, location: newLocation, body: newBody, time: newDate });
  };

  const updateInstance = async (id,body) => {
    const userDoc = doc(db, "instances", id);
    const newFields = { body: body };
    await updateDoc(userDoc, newFields);
  };


  //delet doc 后面的是instance 也就是我们database中的名称
  const deleteInstance = async (id) => {
    const userDoc = doc(db, "instance", id);
    console.log(id);
    await deleteDoc(userDoc);

    // const docRef = doc(db, 'instances', id);
    // await deleteDoc(docRef)

  };
  //this is happening when the page is rendered
  useEffect(() => {
    const getInstance = async () => {
      const data = await getDocs(instanceRef);
      setInstances(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInstance();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Title..."
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        placeholder="Location..."
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <input
        placeholder="Body..."
        onChange={(event) => {
          setBody(event.target.value);
        }}
      />
      <input
        type="Date"
        placeholder="Date..."
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />

      <button onClick={createInstance}> Create User</button>
      {instances.map((one_instance) => {
        return (
          <div>
            <h1>title: {one_instance.title}</h1>
            {/* <h1 >time:</h1>
            <h1>location: {one_instance.location}</h1>
            <h1>body: {one_instance.body}</h1> */}

            <button
              onClick={() => {
                updateInstance(one_instance.id,one_instance.body);
              }}
            >
              {" "}
              updateInstance
            </button>
            <button
              onClick={() => {
                deleteInstance(one_instance.id);
              }}
            >
              {" "}
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
