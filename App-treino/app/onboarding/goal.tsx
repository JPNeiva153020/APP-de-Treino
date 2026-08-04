// app/onboarding/goal.tsx
// PLACEHOLDER — a tela real de Objetivo (5 opções: Saúde/Reabilitação,
// Estética/Hipertrofia, Performance/Força, Mobilidade/Bem-estar, Full Body
// — com descrições reescritas por persona, itens G2/G3 do roadmap) é a
// próxima a ser construída.

import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import ScreenHeader from '../../components/ui/ScreenHeader';

export default function Goal() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Seu objetivo" onBack={() => router.back()} />
      <View style={styles.center}>
        <Text style={styles.text}>Tela de objetivo — próxima a ser construída.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  text: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
});