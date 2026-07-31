// app/onboarding/register.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo (o placeholder) por este.

import { router } from 'expo-router';
import RegisterScreen from '../../components/onboarding/RegisterScreen';

export default function Register() {
  return (
    <RegisterScreen
      onBack={() => router.back()}
      onCriarConta={(dados) => {
        // Criação de conta real via Supabase Auth entra quando conectarmos
        // o backend. Por enquanto só confirma navegação + validação.
        console.log('Cadastro (mock):', dados);
        router.push('/onboarding/physical-data');
      }}
    />
  );
}