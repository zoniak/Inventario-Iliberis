'use client';

import InventoryList from "@/components/InventoryList";
import Reporting from "@/components/Reporting";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "@/components/AddItemDialog";
import { useState } from "react";
import Image from 'next/image';
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  status: "In Storage" | "Borrowed";
  borrower?: string;
  borrowDate?: Date | null;
  borrowedQuantity?: number;
};

type LoanHistoryItem = {
  name: string;
  quantity: number;
  borrower: string;
  borrowDate: Date;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([
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
      borrowedQuantity: 2,
    },
    {
      id: "3",
      name: "Cones",
      quantity: 20,
      status: "In Storage",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loanHistory, setLoanHistory] = useState<LoanHistoryItem[]>([]);

  const addItem = (newItem: Omit<InventoryItem, 'id'>) => {
    setInventory(prevInventory => [
      ...prevInventory,
      { ...newItem, id: String(Date.now()) } // Generate a unique ID
    ]);
  };

  const deleteItem = (id: string) => {
    setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
  };

  const updateItem = (updatedItem: InventoryItem) => {
    setInventory(prevInventory =>
      prevInventory.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addLoanHistory = (item: LoanHistoryItem) => {
    setLoanHistory(prevHistory => [...prevHistory, item]);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <Image
            src="/iliberis_logo.png"
            width={50}
            height={50}
            alt="Ilíberis Logo"
            className="mr-4"
          />
          <CardTitle>Ilíberis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <SearchBar onSearch={handleSearch} />
            <Button onClick={() => setOpen(true)}>Add Item</Button>
          </div>
          <InventoryList inventory={inventory} onDeleteItem={deleteItem} onUpdateItem={updateItem} searchQuery={searchQuery} onAddLoanHistory={addLoanHistory} />
          <Reporting inventory={inventory} />
          <LoanHistory history={loanHistory} />
        </CardContent>
      </Card>
      <AddItemDialog open={open} setOpen={setOpen} onAddItem={addItem} />
    </div>
  );
}

interface LoanHistoryProps {
  history: LoanHistoryItem[];
}

const LoanHistory: React.FC<LoanHistoryProps> = ({ history }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Loan History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead>Borrow Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.borrower}</TableCell>
                  <TableCell>{format(item.borrowDate, "PPP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
