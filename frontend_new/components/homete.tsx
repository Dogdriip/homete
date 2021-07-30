import React, { useCallback, useState } from "react";
import cn from "classnames";
import styles from "../styles/homete.module.scss";
import { Homete } from "../types/homete";
import { approveHometeById, deleteHometeById, setHomete } from "../lib/homete";
import useFirebaseTwitterAuth from "../hooks/useFirebaseTwitterAuth";

export const HometeContent = ({
  homete,
  fetchHometes,
}: {
  homete: Homete;
  fetchHometes: VoidFunction;
}) => {
  const timestampStr = new Date(
    homete.timestamp.seconds * 1_000
  ).toLocaleString("ko-KR");

  const handleDeleteHometeClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      await deleteHometeById(homete.id);
      fetchHometes();
    },
    [fetchHometes, homete]
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
      fetchHometes();
    },
    [fetchHometes, homete]
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

export const SendHomete = ({
  recipient,
  fetchHometes,
}: {
  recipient: string;
  fetchHometes: VoidFunction;
}) => {
  const [description, setDescription] = useState<string>("");
  const onSendClick = useCallback(async () => {
    if (description.length === 0) {
      alert("내용을 입력해 주세요!");
      return;
    }

    if (description.length > 100) {
      alert("칭찬이 너무 길어요!");
      return;
    }

    await setHomete(recipient, description);
    alert("칭찬을 남겼어요!");
    setDescription("");
    fetchHometes();
  }, [description, fetchHometes, recipient]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        onSendClick();
      }
    },
    [onSendClick]
  );

  return (
    <div className={styles.input_area}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="익명으로 칭찬하기..."
      />
      <button onClick={onSendClick}>보내기</button>
    </div>
  );
};
