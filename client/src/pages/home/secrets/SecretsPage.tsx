import React, { useState } from "react";
import Secret from "@/components/secrets/Secret/Secret";
import AddEditSecret from "@/components/secrets/AddSecret/AddSecret";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { SecretsType } from "@/types";
import styles from "./SecretsPage.module.css";

const SecretsPage = () => {
  const secretsFetched = useLoaderData();
  const [trigger, setTrigger] = useState(false);
  const [secrets, setSecrets] = useState<SecretsType[]>(secretsFetched);
  const [editSecret, setEditSecret] = useState<SecretsType | null>(null); // State to manage the secret being edited

  const handleAddSecret = () => {
    setEditSecret(null);
    setTrigger(true);
  };

  const handleEditSecret = (secret: SecretsType) => {
    setEditSecret(secret);
    setTrigger(true);
  };

  return (
    <div className={styles.container}>
      {secrets.map((secret) => (
        <Secret
          key={secret.secretId}
          secret={secret}
          setSecrets={setSecrets}
          triggerEdit={handleEditSecret}
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
          />
        )}
      </div>
    </div>
  );
};

export default SecretsPage;
