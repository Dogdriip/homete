import cn from "classnames";
import styles from "../../styles/homete.module.scss";
import { Homete } from "../../types/homete";

export const HometeContent = ({ homete }: { homete: Homete }) => {
  const timestampStr = new Date(
    homete.timestamp.seconds * 1_000 + homete.timestamp.nanoseconds
  ).toLocaleString("ko-KR");

  return (
    <div
      className={cn(styles.homete, {
        [styles.unresolved_homete]: !homete.resolved,
      })}
    >
      <p>{homete.description}</p>
      <p className={styles.homete_timestamp}>{timestampStr}</p>
    </div>
  );
};
