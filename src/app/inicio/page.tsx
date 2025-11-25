'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { Heart, Baby } from 'lucide-react';

export default function InicioPage() {
  const { data } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Olá, {data.name || 'Mamãe'}! 👋
        </h1>
        
        {data.status === 'pregnant' ? (
          <div className="flex items-center gap-3 text-pink-600">
            <Heart className="h-6 w-6" />
            <p className="text-lg">
              Você está na {data.gestationalWeeks}ª semana de gestação
            </p>
          </div>
        ) : data.status === 'born' ? (
          <div className="flex items-center gap-3 text-purple-600">
            <Baby className="h-6 w-6" />
            <p className="text-lg">
              {data.babyName} está crescendo saudável!
            </p>
          </div>
        ) : (
          <p className="text-gray-600">
            Bem-vinda ao seu hub de maternidade!
          </p>
        )}
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Sua jornada começa aqui
        </h2>
        <p className="text-gray-700">
          Acompanhe cada momento especial dessa fase única da sua vida.
        </p>
      </div>
    </div>
  );
}
