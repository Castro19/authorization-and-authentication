"use client";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Navigate, Link } from "react-router-dom";
// Importing component
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ErrorMessage } from "../../components/register/ErrorMessage";
// Importing Contexts
import { useAuth } from "@/contexts/authContext";

export function LoginFormDemo() {
  const auth = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState<string | undefined>("");

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSignInError("");

    if (!userName || !password) {
      setSignInError("Please fill in all fields.");
      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);
      const userData = await auth.login(userName, password);
      setIsSigningIn(false);
      console.log("User DATTAAAA: ", userData);
      if (userData.code) {
        setSignInError(userData.message);
      }
    }
  };

  return (
    <div>
      {auth.userLoggedIn && auth.currentUser?.userName && (
        <Navigate to={`/${auth.currentUser?.userName}`} replace={true} />
      )}
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome Back!
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="userName">Username</Label>
            <Input
              id="userName"
              placeholder="Test123"
              type="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </LabelInputContainer>
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
              type="button" // Ensure the button does not submit the form
              onClick={togglePasswordVisibility}
              style={{ background: "none", border: "none" }}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </LabelInputContainer>
          {signInError ? <ErrorMessage text={signInError} /> : <></>}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full my-8 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
            <BottomGradient />
          </button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"} className="hover:underline font-bold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
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
