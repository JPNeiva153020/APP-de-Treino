// app/onboarding/welcome.tsx
import { router } from 'expo-router';
import WelcomeScreen from '../../components/onboarding/WelcomeScreen';

export default function Welcome() {
  return <WelcomeScreen onNext={() => router.push('/onboarding/login')} />;
}