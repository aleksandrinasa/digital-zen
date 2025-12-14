import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function clearAllUserData(userId = "demo-user") {
  // Удаляем цели
  const goalsRef = collection(db, `users/${userId}/goals`);
  const goalsSnap = await getDocs(goalsRef);
  for (const d of goalsSnap.docs) {
    await deleteDoc(d.ref);
  }

  // Удаляем сессии
  const sessionsRef = collection(db, `users/${userId}/sessions`);
  const sessionsSnap = await getDocs(sessionsRef);
  for (const d of sessionsSnap.docs) {
    await deleteDoc(d.ref);
  }

  return true;
}
