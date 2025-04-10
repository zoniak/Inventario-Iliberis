
import InventoryList from "@/components/InventoryList";
import Reporting from "@/components/Reporting";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Club Inventory Tracker</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SearchBar />
          <InventoryList />
          <Reporting />
        </CardContent>
      </Card>
    </div>
  );
}

