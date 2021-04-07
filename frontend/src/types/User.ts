import firebase from "firebase/app";

type User = {
  uid: string;
  name: string;
  screen_name: string;
  description: string;
  profile_image_url: string;
  profile_image_url_https: string;
  timestamp: firebase.firestore.FieldValue;
};

export type { User };
