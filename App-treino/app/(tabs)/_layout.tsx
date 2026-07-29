// app/(tabs)/_layout.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo por este.
//
// Removemos a aba "Explorar" (Tabs.Screen name="explore") porque ela é
// boilerplate do template padrão do Expo, não faz parte do nosso app, e
// dependia de outra propriedade do theme.ts original que já removemos.
// Em vez de consertar uma tela que vamos jogar fora de qualquer forma,
// simplesmente paramos de referenciá-la aqui.
//
// Lembrete: este arquivo inteiro é temporário — vai ser substituído pela
// navegação real de 5 abas (Meu Plano, Treinos, Progresso, Exercícios,
// Perfil) quando chegarmos no Bloco J do roadmap.

import { Tabs } from 'expo-router';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.saude,
        tabBarInactiveTintColor: COLORS.textFaint,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
    </Tabs>
  );
}