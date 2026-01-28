import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";  
import { serverTimestamp } from "firebase/firestore";
import { QuestionnaireSchema } from "./schema";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveFormData(data: unknown) {
  const validatedData = QuestionnaireSchema.parse(data);
  try {
    await addDoc(collection(db, "questionnaires"), {
      ...validatedData,
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving form data:", error);
    return { success: false, error };
  }
}

