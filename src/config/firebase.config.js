import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBxo33o13hZN4dCHl_sW-Sw8BHLMyegESQ",
  authDomain: "ictcomputer-academy.firebaseapp.com",
  projectId: "ictcomputer-academy",
  storageBucket: "ictcomputer-academy.appspot.com",
  messagingSenderId: "15301100611",
  appId: "1:15301100611:web:c055502d3f3f4741b240f6",
  measurementId: "G-YTP07JQFW8",
};

const app = initializeApp(firebaseConfig);
export {app};
