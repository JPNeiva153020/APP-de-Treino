// app/(tabs)/_layout.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo por este.
//
// Esta é uma versão temporária e simplificada — o layout original do
// template do Expo dependia do arquivo constants/theme.ts que sobrescrevemos
// no commit anterior (ele tinha um formato diferente, com Colors.light/dark).
// Quando construirmos a navegação real do app (5 abas: Meu Plano, Treinos,
// Progresso, Exercícios, Perfil — Bloco J do roadmap), este arquivo inteiro
// será substituído de novo, então não vale a pena investir em deixá-lo bonito
// agora — só precisa parar de quebrar.

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
      <Tabs.Screen name="explore" options={{ title: 'Explorar' }} />
    </Tabs>
  );
}