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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  status: "In Storage" | "Borrowed";
  borrower?: string;
  borrowDate?: Date | null;
  borrowedQuantity?: number;
};

interface InventoryListProps {
  inventory: InventoryItem[];
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: InventoryItem) => void;
  searchQuery: string;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onDeleteItem, onUpdateItem, searchQuery }) => {
  const [open, setOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const { toast } = useToast();

  const handleStatusChange = (
    itemId: string,
    newStatus: "In Storage" | "Borrowed",
    borrower?: string,
    borrowDate?: Date | null,
    borrowQuantity?: number
  ) => {
    const updatedItemIndex = inventory.findIndex(item => item.id === itemId);
    if (updatedItemIndex === -1) {
      return; // Item not found
    }

    const updatedItem = { ...inventory[updatedItemIndex] };
    let updatedInventory = [...inventory];

    if (newStatus === "Borrowed") {
      if (borrowQuantity && borrowQuantity > 0 && borrowQuantity <= updatedItem.quantity) {
        updatedItem.quantity -= borrowQuantity;
        updatedItem.borrowedQuantity = borrowQuantity;
        updatedItem.status = newStatus;
        updatedItem.borrower = borrower;
        updatedItem.borrowDate = borrowDate;

        updatedInventory[updatedItemIndex] = updatedItem;
          toast({
              title: "Item Borrowed",
              description: `${borrowQuantity} ${updatedItem.name}(s) borrowed by ${borrower}`,
          });
      } else {
        toast({
              title: "Error",
              description: "Invalid borrow quantity",
          });
          return;
      }
    } else if (newStatus === "In Storage") {
      if (updatedItem.borrowedQuantity) {
        updatedItem.quantity += updatedItem.borrowedQuantity;
        updatedItem.borrowedQuantity = 0;
      }
      updatedItem.status = newStatus;
      updatedItem.borrower = undefined;
      updatedItem.borrowDate = undefined;
      updatedInventory[updatedItemIndex] = updatedItem;
        toast({
            title: "Item Returned",
            description: `${updatedItem.name}(s) returned to storage`,
        });
    }

    onUpdateItem(updatedItem);
  };

  const confirmDelete = (itemId: string) => {
    setOpen(true);
    setDeleteItemId(itemId);
  };

  const deleteItem = () => {
    if (deleteItemId) {
      onDeleteItem(deleteItemId);
      setOpen(false);
      setDeleteItemId(null);
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredInventory.map((item) => (
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
                <div className="flex gap-2">
                  <StatusSelector
                    itemId={item.id}
                    itemName={item.name}
                    itemQuantity={item.quantity}
                    currentStatus={item.status}
                    onStatusChange={handleStatusChange}
                  />
                  <Button variant="destructive" size="sm" onClick={() => confirmDelete(item.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteItemId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryList;

    