
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      // Check if using mock auth in development
      if (localStorage.getItem("mockAuthUser")) {
        localStorage.removeItem("mockAuthUser");
        toast({
          title: "Signed out",
          description: "You have been successfully signed out of dev mode.",
        });
        navigate("/login");
        return;
      }

      // Real auth sign out
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
      });
    }
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">PreCheck.io</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/upload">Upload Scan</Link>
          </Button>
          <Button onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
