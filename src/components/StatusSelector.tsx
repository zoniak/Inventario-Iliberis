"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import * as React from "react";

type Status = "In Storage" | "Borrowed";

interface StatusSelectorProps {
  itemId: string;
  currentStatus: Status;
  onStatusChange: (
    itemId: string,
    newStatus: Status,
    borrower?: string,
    borrowDate?: Date | null
  ) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  itemId,
  currentStatus,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [borrower, setBorrower] = useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    onStatusChange(itemId, newStatus, borrower, date);
  };

  const handleBorrowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrower(e.target.value);
  };

  const returnItem = () => {
    // Clear borrower and borrow date when returning an item
    setBorrower("");
    setDate(undefined);
    onStatusChange(itemId, "In Storage", undefined, undefined);
    setStatus("In Storage");
  };

  const borrowItem = () => {
    onStatusChange(itemId, "Borrowed", borrower, date);
    setStatus("Borrowed");
  };

  return (
    <div>
      {currentStatus === "In Storage" ? (
        <div>
          <Input
            type="text"
            placeholder="Borrower's Name"
            value={borrower}
            onChange={handleBorrowerChange}
            className="mb-2"
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("2020-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={borrowItem} disabled={!borrower || !date}>
            Borrow
          </Button>
        </div>
      ) : (
        <Button onClick={returnItem}>Return</Button>
      )}
    </div>
  );
};

export default StatusSelector;
