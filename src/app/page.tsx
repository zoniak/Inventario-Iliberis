'use client';

import InventoryList from "@/components/InventoryList";
import Reporting from "@/components/Reporting";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "@/components/AddItemDialog";
import { useState } from "react";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  status: "In Storage" | "Borrowed";
  borrower?: string;
  borrowDate?: Date | null;
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
    },
    {
      id: "3",
      name: "Cones",
      quantity: 20,
      status: "In Storage",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Ilíberis Inventory Tracker</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <SearchBar onSearch={handleSearch} />
            <Button onClick={() => setOpen(true)}>Add Item</Button>
          </div>
          <InventoryList inventory={inventory} onDeleteItem={deleteItem} onUpdateItem={updateItem} searchQuery={searchQuery} />
          <Reporting inventory={inventory} />
        </CardContent>
      </Card>
      <AddItemDialog open={open} setOpen={setOpen} onAddItem={addItem} />
    </div>
  );
}

