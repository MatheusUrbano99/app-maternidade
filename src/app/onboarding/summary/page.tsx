'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Baby, Calendar, User } from 'lucide-react';

export default function SummaryPage() {
  const router = useRouter();
  const { data, saveToLocalStorage } = useOnboarding();

  useEffect(() => {
    // Redirecionar se não tiver completado os passos anteriores
    if (!data.name || !data.status) {
      router.push('/onboarding/step1');
    }
  }, [data, router]);

  const handleStart = () => {
    saveToLocalStorage();
    router.push('/inicio');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (!data.name || !data.status) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tudo pronto!</h1>
          <p className="text-gray-600">Confira suas informações</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
              <User className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600 font-medium">Seu nome</p>
                <p className="text-lg font-semibold text-gray-900">{data.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
              {data.status === 'pregnant' ? (
                <Heart className="h-6 w-6 text-pink-600 mt-1" />
              ) : (
                <Baby className="h-6 w-6 text-pink-600 mt-1" />
              )}
              <div>
                <p className="text-sm text-gray-600 font-medium">Status</p>
                <p className="text-lg font-semibold text-gray-900">
                  {data.status === 'pregnant' ? 'Grávida' : 'Bebê já nasceu'}
                </p>
              </div>
            </div>

            {data.status === 'pregnant' ? (
              <>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Idade gestacional</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.gestationalWeeks} semanas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Data prevista do parto</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.dueDate && formatDate(data.dueDate)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <Baby className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Nome do bebê</p>
                    <p className="text-lg font-semibold text-gray-900">{data.babyName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Data de nascimento</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {data.birthDate && formatDate(data.birthDate)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={handleStart}
            className="w-full h-14 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Começar
          </Button>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
        </div>
      </div>
    </div>
  );
}
