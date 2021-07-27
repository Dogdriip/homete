import { Timestamp } from "firebase/firestore";

type Homete = {
  id: string;
  recipient: string;
  description: string;
  resolved: boolean;
  timestamp: Timestamp;
};

export type { Homete };
