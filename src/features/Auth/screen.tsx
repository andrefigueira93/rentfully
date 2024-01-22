import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const AuthPage: React.FC = () => {
  const [method, setMethod] = React.useState<"signin" | "signup">("signin");
  const { isAuthenticated } = useAuth();
  function handleMethodChange() {
    setMethod((prev) => (prev === "signin" ? "signup" : "signin"));
  }

  const isSignIn = useMemo(() => method === "signin", [method]);

  const authComponent = useMemo(() => {
    if (isSignIn) {
      return <SignInForm />;
    } else {
      return <SignUpForm />;
    }
  }, [isSignIn]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card className="max-w-xs w-full mx-auto shadow-md p-8 rounded-lg">
      <CardHeader>
        <CardTitle>
          {isSignIn ? "Sign in to your account" : "Create your account"}
        </CardTitle>
      </CardHeader>
      {authComponent}
      <CardFooter className="flex flex-col justify-center mt-12">
        <p className="mb-4">
          {isSignIn ? `Don’t have an account?` : "Already have an account?"}
        </p>
        <Button onClick={handleMethodChange} variant="outline">
          {isSignIn ? "Sign Up" : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthPage;
