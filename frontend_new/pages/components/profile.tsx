import Image from "next/image";
import styles from "../../styles/profile.module.scss";
import { User } from "../../types/user";

export const ProfileContent = ({ user }: { user: User }) => {
  return (
    <div className={styles.profile}>
      <Image
        src={user.profile_image_url_https}
        alt={`Twitter profile image of ${user.screen_name}`}
        width={200}
        height={200}
        className={styles.profile_image}
      />
      <div className={styles.profile_name_and_description}>
        <h2>{user.name}</h2>
        <p>{user.description}</p>
      </div>
    </div>
  );
};
