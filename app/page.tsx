"use client";

import { useState, useEffect } from "react";
import { AssetForm } from "./components/asset-form";
import { AssetTable } from "./components/asset-table";
import { AssetSearch } from "./components/asset-search";
import type { Asset } from "./types";

export default function AssetRegister() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const storedAssets = localStorage.getItem("assets");
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
      setFilteredAssets(JSON.parse(storedAssets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("assets", JSON.stringify(assets));
    setFilteredAssets(assets);
  }, [assets]);

  const addAsset = (asset: Asset) => {
    setAssets([...assets, { ...asset, id: Date.now().toString() }]);
  };

  const updateAsset = (updatedAsset: Asset) => {
    setAssets(
      assets.map((asset) =>
        asset.id === updatedAsset.id ? updatedAsset : asset
      )
    );
  };

  const deleteAsset = (id: string) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = assets.filter((asset) =>
      Object.values(asset).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredAssets(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">IT Asset Register</h1>
      <AssetForm onSubmit={addAsset} />
      <AssetSearch onSearch={handleSearch} />
      <AssetTable
        assets={filteredAssets}
        onUpdate={updateAsset}
        onDelete={deleteAsset}
      />
    </div>
  );
}
