import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function loadGoals(userId) {
  const ref = collection(db, "users", userId, "goals");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
}
