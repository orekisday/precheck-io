
import { Link } from "react-router-dom";
import { Info, Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PreCheck.io. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary flex items-center">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary flex items-center"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary flex items-center"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 mr-1" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
