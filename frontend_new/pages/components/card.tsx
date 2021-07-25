import React from "react";
import styles from "../../styles/card.module.scss";

const Card: React.ReactNode = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
