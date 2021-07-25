import React from "react";
import styles from "../../styles/layout.module.css";

const Layout: React.ReactNode = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
