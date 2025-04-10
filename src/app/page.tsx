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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  id: string;
  name: string;
  quantity: number;
  borrower: string;
  borrowDate: Date;
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
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

  const handleLogin = () => {
    if (username === "Junta" && password === "Jorge") {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setIsLoggedIn(false);
      setLoginError('Invalid username or password');
    }
  };

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

  const returnItemToInventory = (loan: LoanHistoryItem) => {
      const itemToUpdate = inventory.find(item => item.name === loan.name);
      if (itemToUpdate) {
          const updatedInventory = inventory.map(item => {
              if (item.id === itemToUpdate.id) {
                  return {
                      ...item,
                      quantity: item.quantity + loan.quantity,
                      status: 'In Storage',
                      borrower: undefined,
                      borrowDate: undefined,
                      borrowedQuantity: undefined,
                  };
              }
              return item;
          });
          setInventory(updatedInventory);
          setLoanHistory(prevHistory => prevHistory.filter(item => item.id !== loan.id));
      }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Card className="w-96">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {loginError && <p className="text-red-500">{loginError}</p>}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleLogin}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <LoanHistory history={loanHistory} returnItem={returnItemToInventory} />
        </CardContent>
      </Card>
      <AddItemDialog open={open} setOpen={setOpen} onAddItem={addItem} />
    </div>
  );
}

interface LoanHistoryProps {
  history: LoanHistoryItem[];
  returnItem: (loan: LoanHistoryItem) => void;
}

const LoanHistory: React.FC<LoanHistoryProps> = ({ history, returnItem }) => {
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.borrower}</TableCell>
                  <TableCell>{format(item.borrowDate, "PPP")}</TableCell>
                  <TableCell>
                      <Button onClick={() => returnItem(item)}>Return</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
