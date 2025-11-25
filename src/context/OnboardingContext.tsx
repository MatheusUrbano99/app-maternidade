'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OnboardingData {
  name: string;
  status: 'pregnant' | 'born' | null;
  gestationalWeeks?: string;
  dueDate?: string;
  babyName?: string;
  birthDate?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  saveToLocalStorage: () => void;
  isCompleted: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>({
    name: '',
    status: null,
  });

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Carregar dados do localStorage ao iniciar
    const saved = localStorage.getItem('onboardingData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setData(parsedData);
        setIsCompleted(true);
      } catch (error) {
        console.error('Erro ao carregar dados do onboarding:', error);
      }
    }
  }, []);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('onboardingData', JSON.stringify(data));
    setIsCompleted(true);
  };

  return (
    <OnboardingContext.Provider value={{ data, updateData, saveToLocalStorage, isCompleted }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding deve ser usado dentro de OnboardingProvider');
  }
  return context;
}
