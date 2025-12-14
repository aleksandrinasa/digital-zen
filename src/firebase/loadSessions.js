import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function loadSessions(userId) {
    const ref = collection(db, "users", userId, "sessions");
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => doc.data());
}
