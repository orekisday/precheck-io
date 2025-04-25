
import { Link } from "react-router-dom";
import { 
  Info, 
  Github, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="border-t mt-auto bg-gradient-to-r from-sky-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">PreCheck.io</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Leading the way in medical imaging analysis with advanced AI technology, helping doctors make accurate diagnoses faster.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:contact@precheck.io" 
                className="text-sm text-muted-foreground hover:text-primary flex items-center"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 mr-1" />
                contact@precheck.io
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <Info className="h-4 w-4 mr-2" />
                About Us
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Support
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+1 (800) 555-1234</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>123 Medical Drive, San Francisco, CA 94107</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-primary/10" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PreCheck.io. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
