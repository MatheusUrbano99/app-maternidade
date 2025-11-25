"use client";

import { Baby, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-2xl">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Mamãe & Baby
              </h1>
              <p className="text-xs text-muted-foreground">Acompanhamento da Maternidade</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <Heart className="w-4 h-4" />
            Perfil
          </Button>
        </div>
      </div>
    </header>
  );
}
