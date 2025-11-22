import { RoutineAccessor } from '@/components/routine-accessor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, ShieldAlert, ToyBrick } from 'lucide-react';

export default function Home() {
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
        </header>

        <div className="flex flex-col items-center">
          <div className="flex flex-row gap-2 justify-stretch mb-6 w-full lg:w-3/4">
            <Button
              variant="destructive"
              className="flex-1 text-destructive-foreground"
            >
              <ShieldAlert className="mr-2" /> Emergency Protocol
            </Button>
            <Button variant="accent1" className="flex-1">
              <ToyBrick className="mr-2" /> Boredom Protocol
            </Button>
            <Button variant="accent2" className="flex-1">
              <Route className="mr-2" /> Re-routing Protocol
            </Button>
          </div>
          <Card className="shadow-lg transition-shadow hover:shadow-xl w-full lg:w-3/d4">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome Catalina, here's your plan for today
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
