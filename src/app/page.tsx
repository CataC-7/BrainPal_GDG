"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoutineAccessor } from '@/components/routine-accessor';
import { EmergencyProtocolDialog } from '@/components/emergency-protocol-dialog';
import { WelcomeDialog } from '@/components/welcome-dialog';
import { AlertTriangle, ToyBrick, Route } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids issues with `localStorage` being unavailable on the server.
    const storedName = localStorage.getItem('brainpal-username');
    if (storedName) {
      setUserName(storedName);
    }
    setIsLoading(false);
  }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('brainpal-username', name);
    setUserName(name);
  };

  const protocolInDevMessage = "This sample protocol is being built - once shipped, you will be able to access it and its associated key activities and sub-tasks";

  if (isLoading) {
    return (
      <div className="min-h-screen w-full container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            🧠BrainPal
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Support yourself when it matters the most
          </p>
        </header>
        <div className="flex flex-col items-center">
           <Skeleton className="h-[150px] w-full lg:w-3/4" />
        </div>
      </div>
    );
  }

  if (!userName) {
    return <WelcomeDialog open={true} onNameSubmit={handleNameSubmit} />;
  }


  return (
    <div className="min-h-screen w-full">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            🧠BrainPal
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Support yourself when it matters the most
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <EmergencyProtocolDialog>
              <Button variant="destructive">
                <AlertTriangle />
                Emergency Protocol
              </Button>
            </EmergencyProtocolDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="accent1">
                  <ToyBrick />
                  Boredom Protocol
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Feature in Development</AlertDialogTitle>
                  <AlertDialogDescription>
                    {protocolInDevMessage}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Got it!</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="accent2">
                  <Route />
                  Re-routing Protocol
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Feature in Development</AlertDialogTitle>
                  <AlertDialogDescription>
                    {protocolInDevMessage}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Got it!</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>

        <div className="flex flex-col items-center">
          <Card className="shadow-lg transition-shadow hover:shadow-xl w-full lg:w-3/4">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome {userName}, let&apos;s create your routine for today!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RoutineAccessor />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
