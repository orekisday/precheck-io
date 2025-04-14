
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-grow">
                      <Index />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <div className="flex flex-col min-h-screen">
                    <Navigation />
                    <main className="flex-grow">
                      <Upload />
                    </main>
                    <Footer />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
