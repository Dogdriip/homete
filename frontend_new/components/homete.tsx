import React, { useCallback } from "react";
import cn from "classnames";
import styles from "../styles/homete.module.scss";
import { Homete } from "../types/homete";
import { approveHometeById, deleteHometeById } from "../lib/homete";
import useFirebaseTwitterAuth from "../hooks/useFirebaseTwitterAuth";

export const HometeContent = ({ homete }: { homete: Homete }) => {
  const { user } = useFirebaseTwitterAuth();
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
      const text = `칭찬받았어요! 😊 — ${homete.description}`;
      const url = `https://homete.driip.me/${homete.recipient}/${homete.id}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURI(
          text
        )}&url=${url}&hashtags=homete`
      );
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
      {!homete.resolved && user && user.screen_name === homete.recipient && (
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
