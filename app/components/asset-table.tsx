"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Asset } from "../types";

interface AssetTableProps {
  assets: Asset[];
  onUpdate: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export function AssetTable({ assets, onUpdate, onDelete }: AssetTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedAsset, setEditedAsset] = useState<Asset | null>(null);

  const handleEdit = (asset: Asset) => {
    setEditingId(asset.id);
    setEditedAsset(asset);
  };

  const handleSave = () => {
    if (editedAsset) {
      onUpdate(editedAsset);
      setEditingId(null);
      setEditedAsset(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedAsset) {
      setEditedAsset({ ...editedAsset, [e.target.name]: e.target.value });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Serial Number</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell>
              {editingId === asset.id ? (
                <Input
                  name="name"
                  value={editedAsset?.name}
                  onChange={handleChange}
                />
              ) : (
                asset.name
              )}
            </TableCell>
            <TableCell>
              {editingId === asset.id ? (
                <Input
                  name="type"
                  value={editedAsset?.type}
                  onChange={handleChange}
                />
              ) : (
                asset.type
              )}
            </TableCell>
            <TableCell>
              {editingId === asset.id ? (
                <Input
                  name="serialNumber"
                  value={editedAsset?.serialNumber}
                  onChange={handleChange}
                />
              ) : (
                asset.serialNumber
              )}
            </TableCell>
            <TableCell>
              {editingId === asset.id ? (
                <Input
                  name="purchaseDate"
                  type="date"
                  value={editedAsset?.purchaseDate}
                  onChange={handleChange}
                />
              ) : (
                asset.purchaseDate
              )}
            </TableCell>
            <TableCell>
              {editingId === asset.id ? (
                <Input
                  name="assignedTo"
                  value={editedAsset?.assignedTo}
                  onChange={handleChange}
                />
              ) : (
                asset.assignedTo
              )}
            </TableCell>
            <TableCell>
              {editingId === asset.id ? (
                <Button onClick={handleSave}>Save</Button>
              ) : (
                <>
                  <Button onClick={() => handleEdit(asset)} className="mr-2">
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(asset.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
