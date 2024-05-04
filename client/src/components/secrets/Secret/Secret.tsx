import { SecretsType } from "@/types";
import styles from "./Secrets.module.css";

interface SecretsProps {
  secret: SecretsType;
}
const Secret = ({ secret }: SecretsProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{secret.title}</h2>
      <p className={styles.text}>{secret.description}</p>
      <p className={styles.userId}>{secret.userId}</p>
    </div>
  );
};
export default Secret;
