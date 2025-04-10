"use client";

import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusSelector from "@/components/StatusSelector";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  status: "In Storage" | "Borrowed";
  borrower?: string;
  borrowDate?: Date | null;
};

interface InventoryListProps {
  inventory: InventoryItem[];
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory }) => {
  const updateItemStatus = (
    itemId: string,
    newStatus: "In Storage" | "Borrowed",
    borrower?: string,
    borrowDate?: Date | null
  ) => {
    // This function would need to be passed from the parent component
    // to update the inventory state correctly
    console.log(
      `Update item ${itemId} to status ${newStatus} with borrower ${borrower} and date ${borrowDate}`
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
