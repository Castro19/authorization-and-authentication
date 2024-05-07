import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { doSignOut } from "@/firebase/auth";
import { Button } from "../../components/ui/button";
import styles from "./Home.module.css";
import fetchUserName from "@/components/users/fetchUsername.ts";

const Home: React.FC = () => {
  const [secretsVisibe, setSecretsVisible] = useState<boolean>(false);
  const { currentUser, userId, userName, setUserName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async (userId) => {
      const userNameFetched = await fetchUserName(userId);
      setUserName(userNameFetched);
    };
    getUserName(userId);
  }, []);

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/");
    });
  };

  const handleViewSecrets = (secretsVisibe: boolean) => {
    console.log("Button Clicked for secrets!");
    if (!secretsVisibe) {
      navigate(`/${userName}/secrets`);
      setSecretsVisible(true);
    } else {
      navigate(`/${userName}`);
      setSecretsVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        Hello {currentUser?.displayName || currentUser?.email}, you are now
        logged in.
      </div>
      <div className={styles.buttonFlexContainer}>
        <Button onClick={() => handleViewSecrets(secretsVisibe)}>
          {secretsVisibe ? "Click to Hide Secrets" : "Click to View Secrets"}
        </Button>
        <Button onClick={handleSignOut}> Sign Out</Button>
      </div>
      <div className={styles.cardContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
