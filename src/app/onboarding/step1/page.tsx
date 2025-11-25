'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

export default function Step1Page() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  const [name, setName] = useState(data.name || '');

  const handleNext = () => {
    if (name.trim()) {
      updateData({ name: name.trim() });
      router.push('/onboarding/step2');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vinda!</h1>
          <p className="text-gray-600">Vamos começar conhecendo você</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-medium">
              Qual é o seu nome?
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12"
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim()}
            className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
