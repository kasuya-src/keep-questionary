import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";  
import { serverTimestamp } from "firebase/firestore";
import { QuestionnaireSchema } from "./schema";


const firebaseConfig = {
  apiKey: "AIzaSyCqM_k3F0_KiezoaoYshtC7NSCDsRIpuCM",
  authDomain: "keepcast.firebaseapp.com",
  projectId: "keepcast",
  storageBucket: "keepcast.firebasestorage.app",
  messagingSenderId: "446279303752",
  appId: "1:446279303752:web:008b53a2f9148ededfce7d"
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

