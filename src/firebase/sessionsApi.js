import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveSessions(userId, sessions) {
    const ref = collection(db, "users", userId, "sessions");

    for (const s of sessions) {
        await addDoc(ref, s);
    }

    return true;
}
