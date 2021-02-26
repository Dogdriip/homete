import firebase from "firebase/app";

type Homete = {
  id: string;
  recipient: string;
  description: string;
  resolved: boolean;
  timestamp: firebase.firestore.Timestamp;
};

export type { Homete };
