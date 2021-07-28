type Homete = {
  id: string;
  recipient: string;
  description: string;
  resolved: boolean;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

export type { Homete };
