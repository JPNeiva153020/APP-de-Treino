// app/onboarding/register.tsx
// PLACEHOLDER — a tela de Cadastro de verdade (nome, e-mail, senha) é a
// próxima a ser construída. Este arquivo só existe para o botão "Entrar" e
// o link "Criar conta" da tela de Login terem para onde navegar sem quebrar.

import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme';
import ScreenHeader from '../../components/ui/ScreenHeader';

export default function Register() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Criar conta" onBack={() => router.back()} />
      <View style={styles.center}>
        <Text style={styles.text}>Tela de cadastro — próxima a ser construída.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  text: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, textAlign: 'center' },
});