"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Asset } from "../types";

interface AssetFormProps {
  onSubmit: (asset: Asset) => void;
}

export function AssetForm({ onSubmit }: AssetFormProps) {
  const [asset, setAsset] = useState<Asset>({
    id: "",
    name: "",
    type: "",
    serialNumber: "",
    purchaseDate: "",
    assignedTo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(asset);
    setAsset({
      id: "",
      name: "",
      type: "",
      serialNumber: "",
      purchaseDate: "",
      assignedTo: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={asset.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          name="type"
          value={asset.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="serialNumber">Serial Number</Label>
        <Input
          id="serialNumber"
          name="serialNumber"
          value={asset.serialNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          name="purchaseDate"
          type="date"
          value={asset.purchaseDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          name="assignedTo"
          value={asset.assignedTo}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Add Asset</Button>
    </form>
  );
}
