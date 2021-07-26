import { FieldValue } from "firebase/firestore";

type User = {
  uid: string;
  name: string;
  screen_name: string;
  description: string;
  profile_image_url: string;
  profile_image_url_https: string;
  timestamp: FieldValue;
};

export type { User };
