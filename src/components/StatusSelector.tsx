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
  itemName: string;
  itemQuantity: number;
  currentStatus: Status;
  onStatusChange: (
    itemId: string,
    newStatus: Status,
    borrower?: string,
    borrowDate?: Date | null,
    borrowQuantity?: number,
  ) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  itemId,
  itemName,
  itemQuantity,
  currentStatus,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [borrower, setBorrower] = useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [borrowQuantity, setBorrowQuantity] = useState<number>(1);

  const handleStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    onStatusChange(itemId, newStatus, borrower, date, borrowQuantity);
  };

  const handleBorrowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrower(e.target.value);
  };

  const handleBorrowQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBorrowQuantity(value);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const returnItem = () => {
    setBorrower("");
    setDate(undefined);
    setBorrowQuantity(1);
    onStatusChange(itemId, "In Storage", undefined, undefined, 0);
    setStatus("In Storage");
  };

  const borrowItem = () => {
    onStatusChange(itemId, "Borrowed", borrower, date, borrowQuantity);
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
          <Input
            type="number"
            placeholder="Quantity Borrowed"
            value={borrowQuantity}
            onChange={handleBorrowQuantityChange}
            className="mb-2"
            min="1"
            max={itemQuantity}
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
                onSelect={handleDateChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("2020-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={borrowItem} disabled={!borrower || !date || !borrowQuantity}>
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

    