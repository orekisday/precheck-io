
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Info } from "lucide-react";
import VersionInfo from "@/components/VersionInfo";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
          navigate("/");
        }
      }
    );

    // Check if user is already signed in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setAuthError("Unable to check authentication status. Please try again.");
      }
    };

    checkUser();
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  // Monitor connection errors from Supabase
  useEffect(() => {
    const handleConnectionErrors = () => {
      const testConnection = async () => {
        try {
          // Simple ping to Supabase to check connection
          await fetch(SUPABASE_URL, { 
            method: 'HEAD', 
            mode: 'no-cors',
            cache: 'no-store'
          });
          setConnectionError(false);
        } catch (error) {
          console.error("Connection test failed:", error);
          setConnectionError(true);
        }
      };
      
      testConnection();
      
      // Setup event listeners for online/offline events
      window.addEventListener('online', () => setConnectionError(false));
      window.addEventListener('offline', () => setConnectionError(true));
      
      return () => {
        window.removeEventListener('online', () => setConnectionError(false));
        window.removeEventListener('offline', () => setConnectionError(true));
      };
    };
    
    handleConnectionErrors();
  }, []);

  // Custom error handler for Auth UI errors
  const handleAuthError = (error: Error) => {
    console.error("Auth error:", error);
    if (error.message.includes("Failed to fetch") || error.message.includes("Network") || error.message.includes("offline")) {
      setConnectionError(true);
      setAuthError(null);
    } else {
      setAuthError(error.message);
      setConnectionError(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-12 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-center flex-1">Welcome to LungScan AI</h1>
        <VersionInfo />
      </div>
      <div className="bg-card p-6 rounded-lg shadow-lg">
        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Unable to connect to authentication service. This may be due to network issues or the service being temporarily unavailable. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {authError && !connectionError && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Authentication Error</p>
              <p className="text-sm">{authError}</p>
            </div>
          </div>
        )}
        
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
        />

        <div className="mt-4 pt-4 border-t border-muted">
          <Alert variant="default" className="bg-muted/50">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs text-muted-foreground">
              If you're experiencing connection issues, please make sure your network connection is stable and try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Login;
