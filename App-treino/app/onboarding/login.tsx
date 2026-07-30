// app/onboarding/login.tsx
import { router } from 'expo-router';
import LoginScreen from '../../components/onboarding/LoginScreen';

export default function Login() {
  return (
    <LoginScreen
      onEntrar={() => {
        // Autenticação real via Supabase Auth entra quando conectarmos o
        // backend. Por enquanto só confirma que a navegação funciona.
        router.push('/onboarding/register');
      }}
      onIrParaCadastro={() => router.push('/onboarding/register')}
    />
  );
}