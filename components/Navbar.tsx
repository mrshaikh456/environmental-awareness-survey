"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const ADMIN_PASSWORD = "admin123"; // In a real application, this should be securely stored and not hardcoded

interface NavbarProps {
  onAdminLogin: () => void;
}

export function Navbar({ onAdminLogin }: NavbarProps) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onAdminLogin();
    } else {
      alert("Incorrect password. Access denied.");
    }
    setPassword("");
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Environmental Survey</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Admin Login</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin} className="w-full">Login</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}

