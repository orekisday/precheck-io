
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Stethoscope } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if user is already logged in
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate("/");
    }
  };

  // Call on component mount
  useState(() => {
    checkSession();
  }, []);

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      let response;

      if (isSignUp) {
        // Sign up
        response = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        // Sign in
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response.error) {
        throw response.error;
      }

      if (isSignUp && response.data?.user && !response.data?.session) {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link.",
        });
      } else if (response.data?.session) {
        toast({
          title: "Success!",
          description: isSignUp ? "Account created successfully." : "You have successfully signed in.",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setErrorMessage(error.message || "An error occurred during authentication");
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "An error occurred during authentication",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-12 p-4">
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">PreCheck.io</h1>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          {isSignUp ? "Create an account" : "Sign in to your account"}
        </h2>

        <form onSubmit={handleAuthentication} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {errorMessage && (
            <div className="text-destructive text-sm">
              {errorMessage}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : isSignUp
              ? "Create account"
              : "Sign in"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-primary text-sm hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>By signing in, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  );
};

export default Login;
