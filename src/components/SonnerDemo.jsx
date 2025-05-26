"use client";

import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SonnerDemo() {
  return (
    <>
      {/* <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button> */}
      <div>
        <Toaster />
        {/* <button onClick={() => toast("My first toast")}>Give me a toast</button> */}
      </div>
    </>
  );
}
