
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Check, Circle } from "lucide-react";
import * as React from "react";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  status: "In Storage" | "Borrowed";
  borrower?: string;
  borrowDate?: Date | null;
};

const initialInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Football",
    quantity: 10,
    status: "In Storage",
  },
  {
    id: "2",
    name: "Basketball",
    quantity: 5,
    status: "Borrowed",
    borrower: "Alice Smith",
    borrowDate: new Date(),
  },
  {
    id: "3",
    name: "Cones",
    quantity: 20,
    status: "In Storage",
  },
];

const statusColors = {
  "In Storage": "bg-in-storage",
  Borrowed: "bg-borrowed",
};

const InventoryList = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [selectedStatus, setSelectedStatus] = useState<
    "In Storage" | "Borrowed"
  >("In Storage");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const updateItemStatus = (
    itemId: string,
    newStatus: "In Storage" | "Borrowed",
    borrower?: string,
    borrowDate?: Date | null
  ) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: newStatus,
              borrower: borrower,
              borrowDate: borrowDate,
            }
          : item
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Borrower</TableHead>
            <TableHead>Borrow Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      statusColors[item.status]
                    }`}
                  ></span>
                  <span>{item.status}</span>
                </div>
              </TableCell>
              <TableCell>{item.borrower || "-"}</TableCell>
              <TableCell>
                {item.borrowDate ? format(item.borrowDate, "PPP") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
