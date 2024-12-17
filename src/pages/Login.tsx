import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="container max-w-md mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Welcome to PreCheck.io</h1>
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;