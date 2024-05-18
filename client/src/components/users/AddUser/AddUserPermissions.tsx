import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./AddUserPermissions.module.css";
import { User } from "@/types"; // Define these types accordingly
import SetPermissionContainer from "@/components/permissions/permissionContainer/PermissionContainer";
// Fetch Funciton:
import createUserPermissions from "./creatUserPermissions";
import removeUserPermission from "@/components/permissions/deletePermissions/removeUserPermission";
import fetchPermissions from "@/components/permissions/permissionContainer/fetchPermissions";

type AddUserPermissionsProps = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  users: User[] | undefined;
  secretId: string;
};
type RoleType = string;

type PermissionType = {
  userId: string;
  roles: RoleType[];
};

const AddUserPermissions = ({
  trigger,
  setTrigger,
  users,
  secretId,
}: AddUserPermissionsProps) => {
  const popupInnerRef = useRef<HTMLDivElement>(null);
  const [permissions, setPermissions] = useState<{
    [userId: string]: { [key: string]: boolean };
  }>({});
  const [permissionsUpdated, setPermissionsUpdated] = useState<boolean>(false);

  useEffect(() => {
    const getPerms = async () => {
      const currPerms: PermissionType[] = await fetchPermissions(secretId);
      console.log("FetchedPerms: ", currPerms);

      // Transform the fetched permissions into the required state structure
      const transformedPerms = currPerms.reduce(
        (acc: { [userId: string]: { [key: string]: boolean } }, perm) => {
          acc[perm.userId] = perm.roles.reduce(
            (roleAcc: { [key: string]: boolean }, role: string) => {
              roleAcc[role] = true;
              return roleAcc;
            },
            {}
          );
          return acc;
        },
        {}
      );

      // Set the transformed permissions into the state
      setPermissions(transformedPerms);
    };
    getPerms();
  }, [secretId, permissionsUpdated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupInnerRef.current &&
        !popupInnerRef.current.contains(event.target as Node)
      ) {
        setTrigger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [secretId, setTrigger]);

  const handleCloseButton = () => {
    setTrigger(false);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    userId: string,
    option: string
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [option]: e.target.checked,
      },
    }));
  };

  const handleSetPermissions = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: string,
    option: string
  ) => {
    e.preventDefault();
    const userPermissions = permissions[userId];
    let response = "";

    if (userPermissions) {
      const selectedPermissions = Object.keys(userPermissions).filter(
        (key) => userPermissions[key]
      );
      console.log(
        `${option} permissions: ${selectedPermissions} for user ${userId} on secret ${secretId}`
      );
      if (option === "grant") {
        response = await createUserPermissions(
          userId,
          secretId,
          selectedPermissions
        );
      } else if (option === "remove") {
        console.log("REMOVING");
        response = await removeUserPermission(userId, secretId);
      }
      console.log("RESPONSE FROM SENDING DATA PERMISSIONS: ", response);
    }
    setPermissionsUpdated(!permissionsUpdated);
  };

  return trigger ? (
    <div className={styles.popup}>
      <div ref={popupInnerRef} className={styles.popupInner}>
        <button onClick={handleCloseButton} className={styles.closeBtn}>
          Close
        </button>
        <SetPermissionContainer
          users={users}
          permissions={permissions}
          handleCheckboxChange={handleCheckboxChange}
          handleSetPermissions={handleSetPermissions}
        />
      </div>
    </div>
  ) : null;
};

export default AddUserPermissions;
