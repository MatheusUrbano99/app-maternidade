'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/OnboardingContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Baby, Heart } from 'lucide-react';

export default function Step2Page() {
  const router = useRouter();
  const { updateData } = useOnboarding();

  const handleChoice = (status: 'pregnant' | 'born') => {
    updateData({ status });
    router.push('/onboarding/step3');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Sua jornada</h1>
          <p className="text-gray-600">Conte-nos um pouco mais sobre você</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-2 text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Você está grávida ou o bebê já nasceu?
            </h2>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleChoice('pregnant')}
              className="w-full h-20 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 flex items-center justify-center gap-3"
            >
              <Heart className="h-6 w-6" />
              Estou grávida
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={() => handleChoice('born')}
              className="w-full h-20 text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 flex items-center justify-center gap-3"
            >
              <Baby className="h-6 w-6" />
              O bebê já nasceu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-purple-500"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
          <div className="w-8 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
