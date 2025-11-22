import { RoutineAccessor } from '@/components/routine-accessor';
import { RoutineCreator } from '@/components/routine-creator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          🧠BrainPal
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Support yourself when it matters the most 
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                <BookOpen className="text-primary" />
                Access Routines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RoutineAccessor />
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-shadow hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
                <ClipboardList className="text-primary" />
                Create a Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RoutineCreator />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
