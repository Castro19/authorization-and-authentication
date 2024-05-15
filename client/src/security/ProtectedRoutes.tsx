import { PropsWithChildren, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userLoggedIn, currentUser } = useAuth();
  console.log("USERNAME: ", currentUser?.userName);
  const navigate = useNavigate();
  const { userName: urlUserName } = useParams(); // This captures the userId from the URL

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login", { replace: true });
    } else if (userLoggedIn && currentUser?.userName !== urlUserName) {
      navigate(`/${currentUser?.userName}`); // Redirects to the correct user page
    }
  }, [navigate, userLoggedIn, currentUser?.userName, urlUserName]);

  return children;
};

export default ProtectedRoute;
