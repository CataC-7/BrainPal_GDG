import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoutineAccessor } from '@/components/routine-accessor';

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
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="destructive">Emergency Protocol</Button>
            <Button variant="accent1">Boredom Protocol</Button>
            <Button variant="accent2">Re-routing Protocol</Button>
          </div>
        </header>

        <div className="flex flex-col items-center">
          <Card className="shadow-lg transition-shadow hover:shadow-xl w-full lg:w-3/4">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Welcome Catalina, let's create your routine for today!
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
