import firebase from "firebase/app";

type Homete = {
  recipient: string;
  description: string;
  resolved: boolean;
  timestamp: firebase.firestore.Timestamp;
};

export type { Homete };
