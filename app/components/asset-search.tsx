"use client";

import { Input } from "@/components/ui/input";

interface AssetSearchProps {
  onSearch: (searchTerm: string) => void;
}

export function AssetSearch({ onSearch }: AssetSearchProps) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search assets..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
