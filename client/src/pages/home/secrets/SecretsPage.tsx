// import { secrets } from "@/types";
import Secret from "@/components/secrets/Secret/Secret";
import styles from "./SecretsPage.module.css";
// import { Outlet } from "react-router-dom";
import AddSecret from "@/components/secrets/AddSecret/AddSecret";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { SecretsType } from "@/types";

const SecretsPage = () => {
  const secretsFetched = useLoaderData();
  const [trigger, setTrigger] = useState(false);
  const [secrets, setSecrets] = useState<SecretsType[]>(secretsFetched);

  return (
    <div className={styles.container}>
      {secrets.map((secret) => (
        <Secret key={secret.secretId} secret={secret} setSecrets={setSecrets} />
      ))}
      <div>
        <Button
          onClick={() => setTrigger(true)}
          className={styles.addSecretButton}
        >
          Add a Secret
        </Button>
        <AddSecret
          trigger={trigger}
          setTrigger={setTrigger}
          setSecrets={setSecrets}
        >
          <h3>Add a Secret</h3>
        </AddSecret>
      </div>
    </div>
  );
};

export default SecretsPage;
