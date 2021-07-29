import React from "react";
import styles from "../../styles/layout.module.scss";

export const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
