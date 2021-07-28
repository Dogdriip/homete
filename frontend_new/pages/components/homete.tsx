import cn from "classnames";
import styles from "../../styles/homete.module.scss";
import { Homete } from "../../types/homete";

export const HometeContent = ({ homete }: { homete: Homete }) => {
  const timestampStr = new Date(
    homete.timestamp.seconds * 1_000
  ).toLocaleString("ko-KR");

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
          <button className={cn(styles.negative, styles.button)}>삭제</button>
          <button className={cn(styles.positive, styles.button)}>승인</button>
        </div>
      )}
    </div>
  );
};
