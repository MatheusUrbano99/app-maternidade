"use client";

import { Home, Clock, Circle, Image } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Início",
      icon: Home,
      href: "/",
    },
    {
      label: "Linha do Tempo",
      icon: Clock,
      href: "/timeline",
    },
    {
      label: "Estatísticas",
      icon: Circle,
      href: "/stats",
    },
    {
      label: "Galeria",
      icon: Image,
      href: "/gallery",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-around px-2 py-3 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-300"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
