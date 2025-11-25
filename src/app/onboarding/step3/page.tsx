'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

export default function Step3Page() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();
  
  // Estados para grávida
  const [gestationalWeeks, setGestationalWeeks] = useState(data.gestationalWeeks || '');
  const [dueDate, setDueDate] = useState(data.dueDate || '');
  
  // Estados para bebê nascido
  const [babyName, setBabyName] = useState(data.babyName || '');
  const [birthDate, setBirthDate] = useState(data.birthDate || '');

  useEffect(() => {
    // Redirecionar se não tiver escolhido o status
    if (!data.status) {
      router.push('/onboarding/step2');
    }
  }, [data.status, router]);

  const handleNext = () => {
    if (data.status === 'pregnant') {
      if (gestationalWeeks.trim() && dueDate) {
        updateData({ gestationalWeeks: gestationalWeeks.trim(), dueDate });
        router.push('/onboarding/summary');
      }
    } else if (data.status === 'born') {
      if (babyName.trim() && birthDate) {
        updateData({ babyName: babyName.trim(), birthDate });
        router.push('/onboarding/summary');
      }
    }
  };

  const isValid = data.status === 'pregnant' 
    ? gestationalWeeks.trim() && dueDate
    : babyName.trim() && birthDate;

  if (!data.status) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Quase lá!</h1>
          <p className="text-gray-600">Mais algumas informações importantes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {data.status === 'pregnant' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="weeks" className="text-lg font-medium">
                  Idade gestacional (semanas)
                </Label>
                <Input
                  id="weeks"
                  type="number"
                  placeholder="Ex: 12"
                  value={gestationalWeeks}
                  onChange={(e) => setGestationalWeeks(e.target.value)}
                  className="text-lg h-12"
                  min="0"
                  max="42"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-lg font-medium">
                  Data prevista do parto
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="babyName" className="text-lg font-medium">
                  Nome do bebê
                </Label>
                <Input
                  id="babyName"
                  type="text"
                  placeholder="Digite o nome do bebê"
                  value={babyName}
                  onChange={(e) => setBabyName(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-lg font-medium">
                  Data de nascimento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </>
          )}

          <Button
            onClick={handleNext}
            disabled={!isValid}
            className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
