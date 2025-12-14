import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveGoal(userId, goal) {
    const ref = collection(db, "users", userId, "goals");

    await addDoc(ref, {
        target: goal.target,
        limit: Number(goal.limit),
        created_at: new Date().toISOString()
    });

    return true;
}
