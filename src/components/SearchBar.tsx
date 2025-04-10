
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <Input type="text" placeholder="Search inventory..." className="pl-10" />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
