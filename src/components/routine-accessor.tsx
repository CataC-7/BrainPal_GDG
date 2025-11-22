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
      <TabsContent value="daily">
        <Accordion type="single" collapsible className="w-full space-y-2 pt-4">
          {dailyWorkflows.length > 0 ? (
            dailyWorkflows.map((workflow) => (
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
              No daily workflows saved yet.
            </p>
          )}
        </Accordion>
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
