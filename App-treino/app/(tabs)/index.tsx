// app/(tabs)/index.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo por este.
//
// Isso substitui o "hack de teste" do commit anterior (que mostrava a
// WelcomeScreen direto na aba Home). Agora a Welcome vive na navegação real
// (app/onboarding/welcome.tsx), e esta tela só redireciona para lá assim que
// o app abre. Quando o onboarding estiver completo (última etapa do fluxo),
// vamos trocar este redirect por uma lógica real: se o usuário já completou
// o onboarding, mostra a Home de verdade; senão, redireciona para o
// onboarding — mas isso depende de já termos o Supabase conectado para
// checar o estado do usuário, então fica para depois.

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/onboarding/welcome" />;
}