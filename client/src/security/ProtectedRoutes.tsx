import { PropsWithChildren, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userLoggedIn, userName } = useAuth();
  console.log("USERNAME: ", userName);
  const navigate = useNavigate();
  const { userName: urlUserName } = useParams(); // This captures the userId from the URL

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login", { replace: true });
    } else if (userLoggedIn && userName !== urlUserName) {
      navigate(`/${userName}`); // Redirects to the correct user page
    }
  }, [navigate, userLoggedIn, userName, urlUserName]);

  return children;
};

export default ProtectedRoute;
