
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Stethoscope, Mail, Lock, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDev, setIsDev] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        // Don't show error toast here to avoid confusion on initial load
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (isDev) {
      // Development mode authentication
      setTimeout(() => {
        localStorage.setItem("mockAuthUser", JSON.stringify({ email }));
        toast({
          title: "Dev Mode Success!",
          description: isSignUp 
            ? "Account created successfully in dev mode." 
            : "You have successfully signed in using dev mode.",
        });
        navigate("/");
        setIsLoading(false);
      }, 1000);
      return;
    }

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
      
      // More specific error messages based on error type
      let errorMsg = "Authentication failed";
      
      if (error.message?.includes("fetch")) {
        errorMsg = "Network error: Unable to connect to authentication service. Please check your internet connection or try again later.";
      } else if (error.message?.includes("email")) {
        errorMsg = "Invalid email format or email already in use.";
      } else if (error.message?.includes("password")) {
        errorMsg = "Invalid password. Password must be at least 6 characters.";
      } else {
        errorMsg = error.message || "An error occurred during authentication";
      }
      
      setErrorMessage(errorMsg);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: errorMsg,
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

        {errorMessage && (
          <div className="bg-destructive/10 p-3 rounded-md mb-4 flex items-start gap-2 text-sm">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleAuthentication} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : isSignUp
              ? "Create account"
              : "Sign in"}
          </Button>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              className="text-primary text-sm hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>

            <button
              type="button"
              className="text-muted-foreground text-xs hover:underline"
              onClick={() => setIsDev(!isDev)}
            >
              {isDev ? "Disable Dev Mode" : "Enable Dev Mode"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>By signing in, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  );
};

export default Login;
