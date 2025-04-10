"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearch(search);
  }, [search, onSearch]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Buscar en el inventario..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
