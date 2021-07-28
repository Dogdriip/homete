import React, { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { loginWithTwitter, logout } from "../../lib/auth";
import styles from "../../styles/header.module.scss";

export const Header = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleLoginClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      const result = await loginWithTwitter();
      if (result) {
        const user = result.user;

        const uid = user.uid;
        const displayName = user.providerData[0].displayName;

        console.log(user);
      }

      setIsLoading(false);
    },
    []
  );

  const handleLogoutClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      await logout();
      setIsLoading(false);
    },
    []
  );

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>homete!</h1>
      </div>
      <div className={styles.login_status}>
        {isLoading ? (
          <p className={styles.loading}>로딩중...</p>
        ) : user ? (
          <a className={styles.logout} onClick={handleLogoutClick}>
            로그아웃
          </a>
        ) : (
          <a className={styles.login_with_twitter} onClick={handleLoginClick}>
            트위터로 로그인
          </a>
        )}
      </div>
    </div>
  );
};
