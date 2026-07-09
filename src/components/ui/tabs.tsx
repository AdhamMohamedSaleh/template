"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { LayoutGroup, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TabsActiveState {
  activeValue?: string;
}

const TabsActiveContext = React.createContext<TabsActiveState>({});

function Tabs({
  className,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const scopeId = React.useId();
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    value ?? defaultValue,
  );
  const activeValue = value ?? uncontrolledValue;

  function handleValueChange(next: string) {
    setUncontrolledValue(next);
    onValueChange?.(next);
  }

  return (
    <TabsActiveContext.Provider value={{ activeValue }}>
      <LayoutGroup id={scopeId}>
        <TabsPrimitive.Root
          data-slot="tabs"
          data-orientation={orientation}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          className={cn(
            "group/tabs flex gap-2 data-horizontal:flex-col",
            className,
          )}
          {...props}
        />
      </LayoutGroup>
    </TabsActiveContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "group/tabs-list inline-flex w-fit items-center gap-1 rounded-full bg-muted p-1 text-muted-foreground group-data-vertical/tabs:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { activeValue } = React.useContext(TabsActiveContext);
  const isActive = activeValue === value;

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors group-data-vertical/tabs:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        isActive ? "text-white" : "hover:text-foreground",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId="tabs-indicator"
          className="absolute inset-0 -z-10 rounded-full bg-teal shadow-sm"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
      </span>
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
