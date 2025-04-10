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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAddItem: (item: { name: string; quantity: number; status: "En Almacén" | "Prestado" }) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ open, setOpen, onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);

  const handleAddItem = () => {
    if (itemName && itemQuantity > 0) {
      onAddItem({
        name: itemName,
        quantity: itemQuantity,
        status: "En Almacén", // Default status
      });
      setItemName("");
      setItemQuantity(0);
      setOpen(false); // Close the dialog after adding
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Añadir Nuevo Objeto</AlertDialogTitle>
          <AlertDialogDescription>
            Introduce el nombre y la cantidad del objeto a añadir al inventario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
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
              Cantidad
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
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleAddItem}>Añadir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddItemDialog;
