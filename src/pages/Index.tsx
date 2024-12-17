import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, Upload, CheckCircle, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Lung Health Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Quick, accurate analysis of your lung fluorography scans using advanced
            AI technology.
          </p>
          <Button size="lg" asChild className="animate-fadeIn">
            <Link to="/upload">Start Analysis</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Upload className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-600">
              Simply upload your fluorography scan and get instant results.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quick Results</h3>
            <p className="text-gray-600">
              Receive clear, easy-to-understand analysis within seconds.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your health data is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;