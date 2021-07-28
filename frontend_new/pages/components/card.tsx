import React from "react";
import cn from "classnames";
import styles from "../../styles/card.module.scss";

export const NormalCard: React.FC = ({ children }) => {
  return <div className={cn(styles.card, styles.normal_card)}>{children}</div>;
};

export const NormalHometeCard: React.FC<
  Partial<React.DOMAttributes<HTMLDivElement>>
> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(styles.card, styles.normal_homete_card)}
    >
      {children}
    </div>
  );
};

export const TemporaryHometeCard: React.FC = ({ children }) => {
  return (
    <div className={cn(styles.card, styles.temporary_homete_card)}>
      {children}
    </div>
  );
};
