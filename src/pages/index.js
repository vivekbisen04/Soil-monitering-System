import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { uid } from "uid";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqLs5E-QIEY1l3ZAGO8qJSn4NadyxYvJE",
  authDomain: "new-iotbsms.firebaseapp.com",
  databaseURL: "https://new-iotbsms-default-rtdb.firebaseio.com",
  projectId: "new-iotbsms",
  storageBucket: "new-iotbsms.appspot.com",
  messagingSenderId: "1083773607041",
  appId: "1:1083773607041:web:9367c84872418edfbec180",
  measurementId: "G-KZDRTP7HHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

export default function Home() {
  const [todos, setTodos] = useState([]);

  const writedatabase = () => {
    const newPostKey = uid();
    set(ref(database, `${newPostKey}`), {
      title: "Hello World!",
      newPostKey,
    });
    console.log("write");
  };

  const Ref = ref(database, "Sensor_data/sensor_val/");

  useEffect(() => {
    console.log("useEffect");
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      setTodos(data);
      console.log("database==========", data);
    });
  }, []);

  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     setTodos([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       Object.values(data).map((todo) => {
  //         setTodos((oldArray) => [...oldArray, todo]);
  //       });
  //     }
  //   });
  // }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image 
            src="/logo.png"
           style={styles.logo}
           width={80}
           height={80}
           
             
          
        />
          </div>
          <h1 className={styles.title}>Soil Monitoring Web Application</h1>{" "}
          
          <div className={styles.info}>
            <p className={styles.head}>Sensor Data </p>
            <div className={styles.info1}>
              {" "}
              <div>
                <p className={styles.h12}>Temprature</p>
                <p className={styles.h13}>
                  {todos.Temperature != null
                    ? todos.Temperature
                    : "loading....."}
                </p>
              </div>
              <div>
                <p className={styles.h12}>Moisture</p>
                <p className={styles.h13}>
                  {todos.moisture != null ? todos.moisture : "loading....."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
