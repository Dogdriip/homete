import Image from "next/image";
import styles from "../../styles/profile.module.scss";
import { User } from "../../types/user";

const Profile = ({ userData }: { userData: User }) => {
  return (
    <div className={styles.profile}>
      <Image
        src={userData.profile_image_url_https}
        alt={`Twitter profile image of ${userData.screen_name}`}
        width={200}
        height={200}
        className={styles.profile_image}
      />
      <div className={styles.profile_name_and_description}>
        <h2>{userData.name}</h2>
        <p>{userData.description}</p>
      </div>
    </div>
  );
};

export default Profile;
