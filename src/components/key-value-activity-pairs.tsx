"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { activityOptions } from "@/lib/data"

interface ComboboxProps {
  options: { value: string; label: string }[];
  defaultLabel: string;
}

function Combobox({ options, defaultLabel }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [customOptions, setCustomOptions] = React.useState(options);
  const [inputValue, setInputValue] = React.useState('');

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      const newOption = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      };
      if (!customOptions.some(option => option.value === newOption.value)) {
        setCustomOptions([...customOptions, newOption]);
      }
      setValue(newOption.value);
      setOpen(false);
      setInputValue('');
    }
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          className="w-[200px] justify-between bg-muted/50"
        >
          {value
            ? customOptions.find((option) => option.value === value)?.label
            : defaultLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search or create..."
            value={inputValue}
            onChangeCapture={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <CommandEmpty>
            {inputValue ? `Press Enter to add "${inputValue}"` : "No option found."}
          </CommandEmpty>
          <CommandGroup>
            {customOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function KeyValueActivityPairs() {
    return (
        <Card className="border bg-card rounded-md">
            <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="text-left font-semibold text-base">Key:Value Activity Pairs</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <span>Meditation</span>
                        <Combobox options={activityOptions.meditation} defaultLabel="Select type..."/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Movement</span>
                        <Combobox options={activityOptions.movement} defaultLabel="Select type..."/>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Online Learning</span>
                        <Combobox options={activityOptions.onlineLearning} defaultLabel="Select type..."/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
