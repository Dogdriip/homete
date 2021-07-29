import { getApps, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
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

export const getHometeById = async (id: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  const docSnap = await getDoc(doc(db, "hometes", id));

  const homete: Homete = { id, ...docSnap.data() } as Homete;
  return homete;
};

export const setHomete = async (recipient: string, description: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();

  await addDoc(collection(db, "hometes"), {
    recipient: recipient,
    description: description,
    resolved: false,
    timestamp: serverTimestamp(),
  });
};

export const approveHometeById = async (id: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  const docRef = doc(db, "hometes", id);
  await updateDoc(docRef, {
    resolved: true,
  });
};

export const deleteHometeById = async (id: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  await deleteDoc(doc(db, "hometes", id));
};
