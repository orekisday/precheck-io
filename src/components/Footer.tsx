
import { Link } from "react-router-dom";
import { 
  Info, 
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
            <h3 className="text-lg font-semibold text-primary">LungScan AI</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering healthcare professionals with AI-powered lung scan analysis for faster, more accurate diagnoses.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:contact@lungscan.ai" 
                className="text-sm text-muted-foreground hover:text-primary flex items-center"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 mr-1" />
                contact@lungscan.ai
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <Info className="h-4 w-4 mr-2" />
                About Our Technology
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Data Security
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Healthcare Partners
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>+1 (888) 123-4567</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>123 Medical Center Drive, Boston, MA 02115</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-primary/10" />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LungScan AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
