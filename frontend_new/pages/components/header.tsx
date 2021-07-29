import React, { ReactNode, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/header.module.scss";
import useFirebaseTwitterAuth from "../../hooks/useFirebaseTwitterAuth";

export const Header = () => {
  const { user, loading, login, logout } = useFirebaseTwitterAuth();
  const router = useRouter();

  const handleLoginClick: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await login();
    },
    [login]
  );
  const handleLogoutClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await logout();
    },
    [logout]
  );

  const loggedIn: ReactNode = useMemo(() => {
    return (
      <div className={styles.dropdown}>
        <span>{user?.displayName}</span>
        <div className={styles.dropdown_content}>
          <div
            className={styles.dropdown_item}
            onClick={() => router.push(`/${false}`)}
          >
            <a>내 페이지</a>
          </div>
          <div className={styles.dropdown_item} onClick={handleLogoutClick}>
            <a>로그아웃</a>
          </div>
        </div>
      </div>
    );
  }, [user]);
  const notLoggedIn: ReactNode = useMemo(() => {
    return (
      <a className={styles.login_with_twitter} onClick={handleLoginClick}>
        트위터로 로그인
      </a>
    );
  }, [handleLoginClick]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <h1>homete!</h1>
          </a>
        </Link>
      </div>
      <div className={styles.login_status}>
        {loading ? (
          <p className={styles.loading}>로딩중...</p>
        ) : user ? (
          loggedIn
        ) : (
          notLoggedIn
        )}
      </div>
    </div>
  );
};
