import styles from "../../styles/header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>homete!</h1>
      </div>
      <div className={styles.login_status}>
        <p className={styles.login_with_twitter}>트위터로 로그인</p>
      </div>
    </div>
  );
};

export default Header;
