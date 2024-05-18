import { User } from "@/types";
import styles from "./PermissionContainer.module.css";
import SetPermissionForm from "../setPermissionForm/SetPermissionForm";
import { ChangeEvent, MouseEvent } from "react";
import DeletePermission from "../deletePermissions/DeletePermission";

interface SetPermissionContainerProps {
  users: User[] | undefined;
  permissions: { [key: string]: { [key: string]: boolean } };
  handleCheckboxChange: (
    e: ChangeEvent<HTMLInputElement>,
    userId: string,
    option: string
  ) => void;
  handleSetPermissions: (
    e: MouseEvent<HTMLButtonElement>,
    userId: string,
    action: string
  ) => Promise<void>;
}

const SetPermissionContainer = ({
  users,
  permissions,
  handleCheckboxChange,
  handleSetPermissions,
}: SetPermissionContainerProps) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>User</th>
            <th className={styles.tableHeader}>Permissions</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.userId} className={styles.userItem}>
                <td className={styles.tableCell}>{user.userName}</td>
                <td className={styles.tableCell}>
                  <SetPermissionForm
                    permissions={permissions[user.userId] || {}}
                    handleCheckboxChange={(e, option) =>
                      handleCheckboxChange(e, user.userId, option)
                    }
                  />
                </td>
                <td className={styles.btnTableCell}>
                  <button
                    onClick={(e) =>
                      handleSetPermissions(e, user.userId, "grant")
                    }
                    className={styles.grantButton}
                  >
                    Grant Permissions
                  </button>
                  <DeletePermission
                    handleSetPermissions={(e) =>
                      handleSetPermissions(e, user.userId, "remove")
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetPermissionContainer;
