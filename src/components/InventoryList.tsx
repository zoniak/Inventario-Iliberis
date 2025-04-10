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
import StatusSelector from "@/components/StatusSelector";
import { format } from "date-fns";

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

const InventoryList = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {item.status}
              </TableCell>
              <TableCell>{item.borrower || "-"}</TableCell>
              <TableCell>
                {item.borrowDate ? format(item.borrowDate, "PPP") : "-"}
              </TableCell>
              <TableCell>
                  <StatusSelector
                    itemId={item.id}
                    currentStatus={item.status}
                    onStatusChange={updateItemStatus}
                  />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
