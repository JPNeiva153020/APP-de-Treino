// app/(tabs)/index.tsx
// SUBSTITUIÇÃO TEMPORÁRIA — só para testar a WelcomeScreen agora.
// Quando começarmos a construir o fluxo de onboarding de verdade (próxima
// etapa), isso vira uma tela própria dentro de uma pilha de navegação, e o
// conteúdo original desta tab volta a ser a Home do app.

import WelcomeScreen from '../../components/onboarding/WelcomeScreen';

export default function HomeScreen() {
  return (
    <WelcomeScreen
      onNext={() => {
        // Ainda não existe próxima tela — só confirma que o botão funciona.
        alert('Continuar pressionado! A próxima tela (Objetivo) ainda não existe.');
      }}
    />
  );
}