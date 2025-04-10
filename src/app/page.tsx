'use client';

import InventoryList from "@/components/InventoryList";
import Reporting from "@/components/Reporting";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "@/components/AddItemDialog";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Club Inventory Tracker</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <SearchBar />
            <Button onClick={() => setOpen(true)}>Add Item</Button>
          </div>
          <InventoryList />
          <Reporting />
        </CardContent>
      </Card>
      <AddItemDialog open={open} setOpen={setOpen} />
    </div>
  );
}

