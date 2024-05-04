// import { secrets } from "@/types";
import Secret from "@/components/secrets/Secret/Secret";
import styles from "./SecretsPage.module.css";
// import { Outlet } from "react-router-dom";
import AddSecret from "@/components/secrets/AddSecret/AddSecret";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { SecretsType } from "@/types";

const SecretsPage = () => {
  const [trigger, setTrigger] = useState(false);
  const [secrets, setSecrets] = useState<SecretsType[]>([]);
  const secretsFetched = useLoaderData();

  useEffect(() => {
    setSecrets(secretsFetched);
    console.log(secrets);
  }, []);

  return (
    <div className={styles.container}>
      {secrets.map((secret, index) => (
        <Secret key={index} secret={secret} />
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
