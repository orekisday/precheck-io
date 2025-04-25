
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import VersionInfo from "@/components/VersionInfo";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error'>('checking');

  useEffect(() => {
    // First check if we can connect to Supabase
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking');
        const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        
        if (error && error.code === 'PGRST116') {
          // This is actually a success case - the error just means we don't have permission, but connection works
          setConnectionStatus('success');
        } else if (error) {
          console.error('Connection test error:', error);
          setConnectionStatus('error');
          setAuthError('Cannot connect to Supabase. Please check your network connection.');
        } else {
          setConnectionStatus('success');
        }
      } catch (error) {
        console.error('Unexpected connection error:', error);
        setConnectionStatus('error');
        setAuthError('Failed to connect to authentication service.');
      }
    };

    checkConnection();

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
      }
    };

    checkUser();
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleTestSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Test connection to Supabase by checking auth status
      const { error: connectionError } = await supabase.auth.getSession();
      
      if (connectionError) {
        setAuthError("Cannot connect to Supabase. Please check your network connection and Supabase configuration.");
        console.error("Connection error:", connectionError);
        setIsLoading(false);
        return;
      }
      
      // Try sign in with test account
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: "test@example.com",
        password: "password123",
      });
      
      if (signInError) {
        if (signInError.message.includes('Failed to fetch')) {
          setAuthError("Network error when connecting to authentication service. Please check your internet connection.");
        } else if (signInError.message.includes('Invalid login credentials')) {
          setAuthError("Test account not found. This is expected in a new project.");
          toast({
            title: "Test account not found",
            description: "This is normal. Please use the sign-up form to create a new account.",
          });
        } else {
          setAuthError(`Authentication error: ${signInError.message}`);
        }
        console.error("Sign in error:", signInError);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setAuthError("An unexpected error occurred. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-12 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-center flex-1">Welcome to LungScan AI</h1>
        <VersionInfo />
      </div>
      <div className="bg-card p-6 rounded-lg shadow-lg">
        {connectionStatus === 'error' && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Connection Error</p>
              <p className="text-sm">Unable to connect to Supabase authentication service.</p>
              <p className="text-xs mt-1">
                This could be due to network issues or Supabase project configuration. Please try again later or check your
                Supabase project settings.
              </p>
            </div>
          </div>
        )}
        
        {authError && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Authentication Error</p>
              <p className="text-sm">{authError}</p>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleTestSignIn} 
          variant="outline" 
          className="w-full mb-4" 
          disabled={isLoading || connectionStatus === 'checking'}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing connection...
            </>
          ) : connectionStatus === 'checking' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking connection...
            </>
          ) : (
            "Test Supabase Connection"
          )}
        </Button>
        
        {connectionStatus !== 'error' && (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
