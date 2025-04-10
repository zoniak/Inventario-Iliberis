
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, Circle } from "lucide-react";
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

  return (
    <div>
      <RadioGroup
        defaultValue={status}
        className="flex space-x-2"
        onValueChange={(value) => handleStatusChange(value as Status)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="In Storage" id="in_storage" />
          <Label htmlFor="in_storage">In Storage</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Borrowed" id="borrowed" />
          <Label htmlFor="borrowed">Borrowed</Label>
        </div>
      </RadioGroup>

      {status === "Borrowed" && (
        <div className="mt-4">
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
        </div>
      )}
    </div>
  );
};

export default StatusSelector;
