type User = {
  uid: string;
  name: string;
  screen_name: string;
  description: string;
  profile_image_url: string;
  profile_image_url_https: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

export type { User };
