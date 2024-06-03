import { useState } from "react";
import Secret from "@/components/secrets/Secret/Secret";
import AddEditSecret from "@/components/secrets/AddSecret/AddSecret";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { SecretsType } from "@/types";
import styles from "./SecretsPage.module.css";

const SecretsPage = () => {
  const [secretResponse, setSecretResponse] = useState<string | undefined>();

  const secretsFetched = useLoaderData() as SecretsType[];
  console.log("secrets FETCHED!!", secretsFetched);
  const [trigger, setTrigger] = useState<boolean>();
  const [secrets, setSecrets] = useState<SecretsType[]>(secretsFetched);
  const [editSecret, setEditSecret] = useState<SecretsType | undefined>(
    undefined
  ); // State to manage the secret being edited

  const handleAddSecret = () => {
    setEditSecret(undefined);
    setTrigger(true);
  };

  const handleEditSecret = (secret: SecretsType) => {
    setEditSecret(secret);
    setTrigger(true);
  };

  console.log("Secretsss:", secrets);
  return (
    <div className={styles.container}>
      {secrets.length !== 0 &&
        secrets.map((secret) => (
          <Secret
            key={secret.secretId}
            secret={secret}
            setSecrets={setSecrets}
            triggerEdit={handleEditSecret}
            secretResponse={secretResponse}
            setSecretResponse={setSecretResponse}
          />
        ))}
      <div>
        <Button onClick={handleAddSecret} className={styles.addSecretButton}>
          Add a Secret
        </Button>
        {trigger && (
          <AddEditSecret
            trigger={trigger}
            setTrigger={setTrigger}
            setSecrets={setSecrets}
            editSecret={editSecret}
            secretResponse={secretResponse}
            setSecretResponse={setSecretResponse}
          />
        )}
      </div>
    </div>
  );
};

export default SecretsPage;
