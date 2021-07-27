import React from "react";
import cn from "classnames";
import styles from "../../styles/card.module.scss";

export const NormalCard = ({ children }) => {
  return <div className={cn(styles.card, styles.normal_card)}>{children}</div>;
};

export const TemporaryCard = ({ children }) => {
  return (
    <div className={cn(styles.card, styles.temporary_card)}>{children}</div>
  );
};
