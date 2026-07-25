// components/onboarding/WelcomeScreen.tsx
// Porte 1:1 da WelcomeScreen do protótipo (prototipo_app_treino.jsx),
// trocando <div>/<button> por <View>/<Pressable> e Tailwind por StyleSheet.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
  onNext: () => void;
};

export default function WelcomeScreen({ onNext }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.iconCircle}>
          <Sparkles size={28} color={COLORS.saude} />
        </View>
        <Text style={styles.title}>Treino com profundidade{'\n'}de fisioterapia</Text>
        <Text style={styles.subtitle}>
          Vamos te conhecer melhor para montar um plano por grupo muscular — no seu tempo, com o
          equipamento que você tem.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Começar</Text>
      </Pressable>
      <Text style={styles.footnote}>Leva cerca de 4 minutos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.saudeSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 24,
    lineHeight: 30,
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  button: {
    backgroundColor: COLORS.saude,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.displaySemibold,
    fontSize: 14,
    color: '#0B0E12',
  },
  footnote: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textFaint,
    textAlign: 'center',
    marginTop: 12,
  },
});