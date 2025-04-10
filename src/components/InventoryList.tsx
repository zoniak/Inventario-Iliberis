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
  status: "En Almacén" | "Prestado";
  borrower?: string;
  borrowDate?: Date | null;
  borrowedQuantity?: number;
};

interface InventoryListProps {
  inventory: InventoryItem[];
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: InventoryItem) => void;
  searchQuery: string;
  onAddLoanHistory: (item: { id: string; name: string; quantity: number; borrower: string; borrowDate: Date }) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onDeleteItem, onUpdateItem, searchQuery, onAddLoanHistory }) => {
  const [open, setOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const { toast } = useToast();

  const handleStatusChange = (
    itemId: string,
    newStatus: "En Almacén" | "Prestado",
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

    if (newStatus === "Prestado") {
      if (borrowQuantity && borrowQuantity > 0 && borrowQuantity <= updatedItem.quantity) {
        updatedItem.quantity -= borrowQuantity;
        updatedItem.borrowedQuantity = borrowQuantity;
        updatedItem.status = newStatus;
        updatedItem.borrower = borrower;
        updatedItem.borrowDate = borrowDate;

        updatedInventory[updatedItemIndex] = updatedItem;
        toast({
            title: "Objeto Prestado",
            description: `${borrowQuantity} ${updatedItem.name}(s) prestado por ${borrower}`,
        });
        if (borrower && borrowDate) {
          onAddLoanHistory({
            id: String(Date.now()),
            name: updatedItem.name,
            quantity: borrowQuantity,
            borrower: borrower,
            borrowDate: borrowDate,
          });
        }
      } else {
        toast({
              title: "Error",
              description: "Cantidad de préstamo inválida",
          });
          return;
      }
    } else if (newStatus === "En Almacén") {
      if (updatedItem.borrowedQuantity) {
        updatedItem.quantity += updatedItem.borrowedQuantity;
        updatedItem.borrowedQuantity = 0;
      }
      updatedItem.status = newStatus;
      updatedItem.borrower = undefined;
      updatedItem.borrowDate = undefined;
      updatedInventory[updatedItemIndex] = updatedItem;
        toast({
            title: "Objeto Devuelto",
            description: `${updatedItem.name}(s) devuelto al almacén`,
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
            <TableHead>Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Prestatario</TableHead>
            <TableHead>Fecha de Préstamo</TableHead>
            <TableHead>Acciones</TableHead>
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
                  {item.status === 'En Almacén' ? (
                    <StatusSelector
                      itemId={item.id}
                      itemName={item.name}
                      itemQuantity={item.quantity}
                      currentStatus={item.status}
                      onStatusChange={handleStatusChange}
                    />
                  ) : (
                    <StatusSelector
                      itemId={item.id}
                      itemName={item.name}
                      itemQuantity={item.quantity}
                      currentStatus={item.status}
                      onStatusChange={handleStatusChange}
                    />
                  )}
                  <Button variant="destructive" size="sm" onClick={() => confirmDelete(item.id)}>
                    Borrar
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
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres borrar este objeto?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteItemId(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteItem}>Borrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryList;
