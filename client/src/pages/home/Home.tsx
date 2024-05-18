import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { Button } from "../../components/ui/button";
import styles from "./Home.module.css";
// import { getUserInfo } from "@/components/register/helpers/fetchUserInfo";

const Home: React.FC = () => {
  const [secretsVisible, setSecretsVisible] = useState<boolean>(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const handleViewSecrets = (secretsVisible: boolean) => {
    console.log("Button Clicked for secrets!");
    if (!secretsVisible) {
      navigate(`/${currentUser?.userName}/secrets`);
      setSecretsVisible(true);
    } else {
      navigate(`/${currentUser?.userName}`);
      setSecretsVisible(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeTitle}>
        Hello {currentUser?.userName}, you are now logged in.
      </div>
      <div className={styles.buttonFlexContainer}>
        <Button onClick={() => handleViewSecrets(secretsVisible)}>
          {secretsVisible ? "Click to Hide Secrets" : "Click to View Secrets"}
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
