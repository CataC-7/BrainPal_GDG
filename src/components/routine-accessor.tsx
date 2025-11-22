import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { dailyWorkflows, emergencyInterventions } from "@/lib/data";
import { ClipboardList, Siren } from "lucide-react";

export function RoutineAccessor() {
  const morningRoutines = dailyWorkflows.filter(
    (r) => r.category === 'morning'
  );
  const flowRoutines = dailyWorkflows.filter((r) => r.category === 'flow');
  const nightRoutines = dailyWorkflows.filter((r) => r.category === 'night');

  return (
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-secondary">
        <TabsTrigger value="daily" className="gap-2">
          <ClipboardList className="h-4 w-4" />
          Daily Workflows
        </TabsTrigger>
        <TabsTrigger value="emergency" className="gap-2">
          <Siren className="h-4 w-4" />
          Emergency Interventions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="daily" className="pt-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Morning Routine</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {morningRoutines.length > 0 ? (
              morningRoutines.map((workflow) => (
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
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No morning routines saved yet.
              </p>
            )}
          </Accordion>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Today's Flow</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {flowRoutines.length > 0 ? (
              flowRoutines.map((workflow) => (
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
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No flows saved yet.
              </p>
            )}
          </Accordion>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Night Routine</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {nightRoutines.length > 0 ? (
              nightRoutines.map((workflow) => (
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
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No night routines saved yet.
              </p>
            )}
          </Accordion>
        </div>
      </TabsContent>
      <TabsContent value="emergency">
        <Accordion type="single" collapsible className="w-full space-y-2 pt-4">
          {emergencyInterventions.length > 0 ? (
            emergencyInterventions.map((intervention) => (
              <AccordionItem
                value={intervention.id}
                key={intervention.id}
                className="border border-destructive/50 bg-destructive/10 rounded-md px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-destructive hover:no-underline [&[data-state=open]>svg]:text-destructive">
                  {intervention.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-inside list-decimal space-y-2 pl-2 text-destructive/90">
                    {intervention.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No emergency interventions saved yet.
            </p>
          )}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}
