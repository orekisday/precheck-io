
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";

const VersionInfo = () => {
  // These versions are based on the package.json dependencies
  const versions = {
    React: "^18.3.1",
    ReactDom: "^18.3.1",
    Vite: "using @vitejs/plugin-react-swc",
    TypeScript: "Uses .tsx files with tsconfig",
    TanstackQuery: "^5.56.2",
    Tailwind: "Using tailwind.config.ts",
    Supabase: {
      SupabaseJS: "^2.47.8",
      AuthUI: "^0.4.7",
    },
    ShadcnUI: "Using Radix UI Components",
    RadixUI: {
      Accordion: "^1.2.0",
      Alert: "^1.1.1",
      Avatar: "^1.1.0",
      Dialog: "^1.1.2",
      DropdownMenu: "^2.1.1",
      Label: "^2.1.0",
      Toast: "^1.2.1",
    },
    Other: {
      LucideReact: "^0.462.0",
      Recharts: "^2.12.7",
      ReactRouter: "^6.26.2",
      ReactHookForm: "^7.53.0",
      Zod: "^3.23.8",
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Version Information">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Project Technologies</DialogTitle>
        </DialogHeader>
        <Card className="border-none shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="text-lg">Core Technologies</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">React</span>
                <span className="text-muted-foreground">{versions.React}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">React DOM</span>
                <span className="text-muted-foreground">{versions.ReactDom}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Vite</span>
                <span className="text-muted-foreground">{versions.Vite}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">TypeScript</span>
                <span className="text-muted-foreground">{versions.TypeScript}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Tanstack Query</span>
                <span className="text-muted-foreground">{versions.TanstackQuery}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Tailwind CSS</span>
                <span className="text-muted-foreground">{versions.Tailwind}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Separator />
        
        <Card className="border-none shadow-none">
          <CardHeader className="p-0 pt-4">
            <CardTitle className="text-lg">Supabase</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Supabase JS</span>
                <span className="text-muted-foreground">{versions.Supabase.SupabaseJS}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Auth UI</span>
                <span className="text-muted-foreground">{versions.Supabase.AuthUI}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Separator />
        
        <Card className="border-none shadow-none">
          <CardHeader className="p-0 pt-4">
            <CardTitle className="text-lg">UI Components</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <p className="mb-2">shadcn/ui with Radix UI components:</p>
            <ul className="space-y-2 text-sm">
              {Object.entries(versions.RadixUI).map(([name, version]) => (
                <li key={name} className="flex justify-between">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">{version}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default VersionInfo;
