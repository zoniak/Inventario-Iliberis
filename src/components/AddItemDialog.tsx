"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, setOpen }) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);

  const handleAddItem = () => {
    // Handle adding item logic here, such as updating the inventory list
    console.log("Adding item:", itemName, itemQuantity);
    setOpen(false); // Close the dialog after adding
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Item</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the name and quantity of the item to add to the inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              type="number"
              id="quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddItem}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddItemDialog;
