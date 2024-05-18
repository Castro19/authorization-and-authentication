import { useEffect, useState } from "react";
import fetchUsers from "./fetchUsers";
import { FaUserPlus } from "react-icons/fa";
import { User } from "@/types";
import AddUserPermissions from "../AddUser/AddUserPermissions";

interface ViewAllUsers {
  secretId: string;
}

const ViewAllUsers = ({ secretId }: ViewAllUsers) => {
  const [users, setUsers] = useState<User[]>();
  const [permissionPopupVisible, setPermissionPopupVisible] = useState(false);
  const onClick = async () => {
    if (users === undefined || users.length === 0) {
      const usersFetched = await fetchUsers();
      setUsers(usersFetched.users);
    }

    setPermissionPopupVisible(true);
  };

  useEffect(() => {
    console.log("VIEW ALL USERS: ", users);
  }, [users]);

  return (
    <div>
      <button onClick={onClick} title="Clear fields">
        <FaUserPlus />
      </button>
      {permissionPopupVisible && (
        <AddUserPermissions
          trigger={permissionPopupVisible}
          setTrigger={setPermissionPopupVisible}
          users={users}
          secretId={secretId}
        />
      )}
    </div>
  );
};

export default ViewAllUsers;
