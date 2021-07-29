import React, { useCallback } from "react";
import cn from "classnames";
import styles from "../../styles/homete.module.scss";
import { Homete } from "../../types/homete";
import { approveHometeById, deleteHometeById } from "../../lib/homete";

export const HometeContent = ({ homete }: { homete: Homete }) => {
  const timestampStr = new Date(
    homete.timestamp.seconds * 1_000
  ).toLocaleString("ko-KR");

  const handleDeleteHometeClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await deleteHometeById(homete.id);
    },
    [homete]
  );
  const handleApproveHometeClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await approveHometeById(homete.id);
    },
    [homete]
  );

  return (
    <div
      className={cn(styles.homete, {
        [styles.unresolved_homete]: !homete.resolved,
      })}
    >
      <p>{homete.description}</p>
      <p className={styles.homete_timestamp}>{timestampStr}</p>
      {!homete.resolved && (
        <div className={styles.button_area}>
          <button
            className={cn(styles.button, styles.negative)}
            onClick={handleDeleteHometeClick}
          >
            삭제
          </button>
          <button
            className={cn(styles.button, styles.positive)}
            onClick={handleApproveHometeClick}
          >
            승인
          </button>
        </div>
      )}
    </div>
  );
};
