import firebase from "firebase/app";

type Homete = {
  recipient: string;
  description: string;
  timestamp: firebase.firestore.Timestamp;
};

export type { Homete };
