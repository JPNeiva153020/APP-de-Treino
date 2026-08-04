// app/onboarding/physical-data.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo (o placeholder) por este.

import { router } from 'expo-router';
import PhysicalDataScreen from '../../components/onboarding/PhysicalDataScreen';

export default function PhysicalData() {
  return (
    <PhysicalDataScreen
      onBack={() => router.back()}
      onNext={(dados) => {
        // Isso vira o payload salvo em public.usuarios quando conectarmos
        // o Supabase. Por enquanto só loga e avança a navegação.
        console.log('Dados físicos (mock):', dados);
        router.push('/onboarding/goal');
      }}
    />
  );
}