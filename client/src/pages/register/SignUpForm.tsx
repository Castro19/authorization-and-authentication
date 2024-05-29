import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ErrorMessage } from "../../components/register/ErrorMessage";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/authContext";
import { Navigate, Link } from "react-router-dom";

export function SignupFormDemo() {
  const auth = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [signUpError, setSignupError] = useState<string | undefined>(undefined);
  const [isRegistering, setIsRegistering] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSignupError("");

    // Handling Errors:
    // Validate input fields are not empty
    if (!userName || !password || !confirmedPassword) {
      setSignupError("Please fill in all fields.");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setSignupError("Password must be at least 8 characters long.");
      return;
    }

    // Checking if the passwords match
    if (password !== confirmedPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      const userData = await auth.signup(userName, password);
      console.log("USER DATA: ", userData);

      if (userData.code) {
        setSignupError(userData.message);
        setIsRegistering(false);
      } else {
        setSignupError(""); // Clear error on successful registration
      }
    }
  };

  return (
    <>
      {auth.userLoggedIn && auth.currentUser?.userName && (
        <Navigate to={`/${auth.currentUser?.userName}`} replace={true} />
      )}
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Create an account!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="User"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder=""
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{ background: "none", border: "none" }}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              placeholder=""
              type={passwordVisible ? "text" : "password"}
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </LabelInputContainer>
          {signUpError ? <ErrorMessage text={signUpError} /> : <></>}
          <button
            disabled={isRegistering}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 mt-8 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
            <BottomGradient />
          </button>
          <div className="text-sm text-center">
            Already have an account? {"   "}
            <Link
              to={"/login"}
              className="text-center text-sm hover:underline font-bold"
            >
              Continue
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
