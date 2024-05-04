import { SecretsType } from "@/types";
import styles from "./Secrets.module.css";
import DeleteSecret from "../DeleteSecret/DeleteSecret";
import deleteSecret from "../DeleteSecret/deleteSecret";

interface SecretsProps {
  setSecrets: React.Dispatch<React.SetStateAction<SecretsType[]>>;
  secret: SecretsType;
}
const Secret = ({ setSecrets, secret }: SecretsProps) => {
  const handleDelete = async (userId: number, secretId: number) => {
    console.log("On UserID: ", userId);
    console.log("Deleting SecretID: ", secretId);
    try {
      const data = await deleteSecret(userId, secretId);
      setSecrets((prevSecrets) =>
        prevSecrets.filter((secret) => secret.secretId !== secretId)
      );
      console.log("responseData: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{secret.title}</h2>
      <p className={styles.text}>{secret.description}</p>
      <p className={styles.userId}>User ID: {secret.userId}</p>
      <p className={styles.userId}>SecretID: {secret.secretId}</p>
      <DeleteSecret
        secretId={secret.secretId}
        userId={secret.userId}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default Secret;
