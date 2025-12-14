import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFQpJl5_orO4qnCv6cX9p6kZHeTfBjCrs",
  authDomain: "digital-zen-mvp.firebaseapp.com",
  projectId: "digital-zen-mvp",
  storageBucket: "digital-zen-mvp.firebasestorage.app",
  messagingSenderId: "718536539604",
  appId: "1:718536539604:web:ba29f2759c16d62504ea41"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
