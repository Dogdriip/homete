import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import firebaseConfig from "../config/firebaseConfig";
import { Homete } from "../types/homete";

export const getHometesByScreenName = async (screenName: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  const q = query(
    collection(db, "hometes"),
    orderBy("timestamp", "desc"),
    where("recipient", "==", screenName)
  );
  const querySnapshot = await getDocs(q);

  const hometes: Homete[] = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Homete)
  );
  return hometes;
};
