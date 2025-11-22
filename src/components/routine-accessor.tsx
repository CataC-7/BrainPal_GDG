import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { dailyWorkflows, protocols } from '@/lib/data';
import { ShieldAlert, ToyBrick, Route } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';
import { ListChecks, Moon, Sunrise } from 'lucide-react';
import { RoutineChecklist } from './routine-checklist';

export function RoutineAccessor() {
  const morningRoutines = dailyWorkflows.filter(
    (r) => r.category === 'morning'
  );
  const flowRoutines = dailyWorkflows.filter((r) => r.category === 'flow');
  const nightRoutines = dailyWorkflows.filter((r) => r.category === 'night');

  const emergencyProtocols = protocols.filter(
    (p) => p.category === 'emergency'
  );
  const boredomProtocols = protocols.filter((p) => p.category === 'boredom');
  const reroutingProtocols = protocols.filter(
    (p) => p.category === 'rerouting'
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2 justify-stretch">
        <Button variant="destructive" className="flex-1 text-destructive-foreground">
          <ShieldAlert className="mr-2" /> Emergency Protocol
        </Button>
        <Button variant="accent1" className="flex-1">
          <ToyBrick className="mr-2" /> Boredom Protocol
        </Button>
        <Button variant="accent2" className="flex-1">
          <Route className="mr-2" /> Re-routing Protocol
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Daily Workflows Column */}
        <div className="space-y-4">
          <RoutineChecklist
            title="Morning Routine"
            icon={<Sunrise className="text-primary" />}
            routines={morningRoutines}
          />
          <RoutineChecklist
            title="Today's Flow"
            icon={<ListChecks className="text-primary" />}
            routines={flowRoutines}
          />
          <RoutineChecklist
            title="Night Routine"
            icon={<Moon className="text-primary" />}
            routines={nightRoutines}
          />
        </div>

        {/* Protocols Column */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="emergency-protocol"
              className="border border-destructive/50 bg-destructive/10 rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold text-destructive hover:no-underline [&[data-state=open]>svg]:text-destructive">
                Emergency Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-destructive/90">
                  {emergencyProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="boredom-protocol"
              className="border bg-card rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Boredom Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                  {boredomProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="rerouting-protocol"
              className="border bg-card rounded-md px-4"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Re-routing Protocol
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                  {reroutingProtocols
                    .flatMap((p) => p.steps)
                    .map((step, index) => (
                      <li key={index}>{step.text}</li>
                    ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}