
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">About LungScan AI</h1>
        
        <div className="prose max-w-none">
          <p>
            LungScan AI is a cutting-edge medical imaging analysis platform that leverages artificial intelligence to assist healthcare professionals in detecting potential lung abnormalities through fluorography scans.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
          <p>
            Our mission is to improve early detection of lung conditions by providing fast, accurate, and accessible analysis of lung fluorography scans. We aim to support healthcare professionals in making informed decisions and ultimately enhance patient care.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Technology</h2>
          <p>
            Our AI-powered analysis platform offers several key advantages:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Advanced machine learning algorithms trained on extensive medical imaging datasets</li>
            <li>Rapid analysis with results available within seconds</li>
            <li>High accuracy rates in detecting potential abnormalities</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p>
            For any inquiries about our technology or partnership opportunities, please reach out to our team at contact@lungscan.ai. We're committed to working with healthcare providers to improve patient outcomes through innovative technology.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
