// app/onboarding/physical-data.tsx
// PLACEHOLDER — a tela real de Dados Físicos (altura/peso como input
// numérico livre, data de nascimento — item G1 do roadmap) é a próxima a
// ser construída. Existe só para o botão "Criar conta" ter para onde ir.

import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import ScreenHeader from '../../components/ui/ScreenHeader';

export default function PhysicalData() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Dados físicos" onBack={() => router.back()} />
      <View style={styles.center}>
        <Text style={styles.text}>Tela de dados físicos — próxima a ser construída.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  text: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
});