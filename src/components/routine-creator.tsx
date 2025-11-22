"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckCircle, ClipboardList, Siren } from "lucide-react";
import { useState } from "react";

export function RoutineCreator() {
  const [dailyTitle, setDailyTitle] = useState("");
  const [dailySteps, setDailySteps] = useState("");
  const [protocolTitle, setProtocolTitle] = useState("");
  const [protocolSteps, setProtocolSteps] = useState("");

  const [isDailySaved, setIsDailySaved] = useState(false);
  const [isProtocolSaved, setIsProtocolSaved] = useState(false);

  const handleSave = (type: "daily" | "protocol") => {
    if (type === "daily") {
      if (!dailyTitle || !dailySteps) return;
      setIsDailySaved(true);
      setTimeout(() => {
        setIsDailySaved(false);
        setDailyTitle("");
        setDailySteps("");
      }, 2000);
    } else {
      if (!protocolTitle || !protocolSteps) return;
      setIsProtocolSaved(true);
      setTimeout(() => {
        setIsProtocolSaved(false);
        setProtocolTitle("");
        setProtocolSteps("");
      }, 2000);
    }
  };

  return (
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-secondary">
        <TabsTrigger value="daily" className="gap-2">
          <ClipboardList className="h-4 w-4" />
          Daily Workflow
        </TabsTrigger>
        <TabsTrigger value="protocol" className="gap-2">
          <Siren className="h-4 w-4" />
          Protocol
        </TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="daily-title">Title</Label>
            <Input
              id="daily-title"
              placeholder="e.g., Morning Startup"
              value={dailyTitle}
              onChange={(e) => setDailyTitle(e.target.value)}
              disabled={isDailySaved}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="daily-steps">Steps</Label>
            <Textarea
              id="daily-steps"
              placeholder="1. Turn on computer&#10;2. Check emails&#10;3. ..."
              className="min-h-[150px]"
              value={dailySteps}
              onChange={(e) => setDailySteps(e.target.value)}
              disabled={isDailySaved}
            />
          </div>
          <Button
            className={cn(
              "w-full transition-colors",
              isDailySaved && "bg-accent hover:bg-accent text-accent-foreground"
            )}
            onClick={() => handleSave("daily")}
            disabled={isDailySaved || (!dailyTitle || !dailySteps)}
          >
            {isDailySaved ? (
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" /> Saved!
              </span>
            ) : (
              "Save Workflow"
            )}
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="protocol">
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="protocol-title">Protocol Title</Label>
            <Input
              id="protocol-title"
              placeholder="e.g., Emergency Protocol"
              value={protocolTitle}
              onChange={(e) => setProtocolTitle(e.target.value)}
              disabled={isProtocolSaved}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protocol-steps">Procedure</Label>
            <Textarea
              id="protocol-steps"
              placeholder="1. Press the emergency button&#10;2. Call for help&#10;3. ..."
              className="min-h-[150px]"
              value={protocolSteps}
              onChange={(e) => setProtocolSteps(e.target.value)}
              disabled={isProtocolSaved}
            />
          </div>
          <Button
            variant={isProtocolSaved ? "default" : "destructive"}
            className={cn(
              "w-full transition-colors",
              isProtocolSaved &&
                "bg-accent hover:bg-accent text-accent-foreground border-accent"
            )}
            onClick={() => handleSave("protocol")}
            disabled={isProtocolSaved || (!protocolTitle || !protocolSteps)}
          >
            {isProtocolSaved ? (
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" /> Saved!
              </span>
            ) : (
              "Save Protocol"
            )}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
