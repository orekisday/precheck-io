import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export const Navigation = () => {
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
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};