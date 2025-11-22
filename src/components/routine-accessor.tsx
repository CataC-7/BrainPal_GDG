import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { dailyWorkflows, protocols } from '@/lib/data';
import { ClipboardList, Siren, ShieldAlert, ToyBrick, Route } from 'lucide-react';
import { Button } from './ui/button';

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
       <div className="flex flex-col sm:flex-row gap-2 justify-stretch">
        <Button variant="destructive" className="flex-1">
          <ShieldAlert className="mr-2" /> Emergency Protocol
        </Button>
        <Button variant="outline" className="flex-1">
          <ToyBrick className="mr-2" /> Boredom Protocol
        </Button>
        <Button variant="outline" className="flex-1">
          <Route className="mr-2" /> Re-routing Protocol
        </Button>
      </div>
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="daily" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Daily Workflows
          </TabsTrigger>
          <TabsTrigger value="protocols" className="gap-2">
            <Siren className="h-4 w-4" />
            Protocols
          </TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="pt-4 space-y-2">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {morningRoutines.map((workflow) => (
              <AccordionItem
                value={workflow.id}
                key={workflow.id}
                className="border bg-card rounded-md px-4"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {workflow.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                    {workflow.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {flowRoutines.map((workflow) => (
              <AccordionItem
                value={workflow.id}
                key={workflow.id}
                className="border bg-card rounded-md px-4"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {workflow.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                    {workflow.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {nightRoutines.map((workflow) => (
              <AccordionItem
                value={workflow.id}
                key={workflow.id}
                className="border bg-card rounded-md px-4"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {workflow.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                    {workflow.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="protocols">
          <Accordion type="single" collapsible className="w-full space-y-2 pt-4">
              <AccordionItem value="emergency-protocol" className="border border-destructive/50 bg-destructive/10 rounded-md px-4">
                <AccordionTrigger className="text-left font-semibold text-destructive hover:no-underline [&[data-state=open]>svg]:text-destructive">
                  Emergency Protocol
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-destructive/90">
                    {emergencyProtocols.flatMap(p => p.steps).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="boredom-protocol" className="border bg-card rounded-md px-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Boredom Protocol
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                     {boredomProtocols.flatMap(p => p.steps).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="rerouting-protocol" className="border bg-card rounded-md px-4">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Re-routing Protocol
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-muted-foreground">
                     {reroutingProtocols.flatMap(p => p.steps).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
