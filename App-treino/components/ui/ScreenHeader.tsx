// components/ui/ScreenHeader.tsx
// SUBSTITUA TODO O CONTEÚDO ATUAL deste arquivo por este.
//
// Mudança: agora usa useSafeAreaInsets() para empurrar o cabeçalho para
// baixo da área segura do aparelho (barra de status, notch, câmera
// perfurada, etc.). Sem isso, o botão de voltar ficava embaixo da barra de
// notificações em alguns Android.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
  title: string;
  onBack?: () => void;
};

export default function ScreenHeader({ title, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.row, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={onBack}
        style={[styles.backButton, { opacity: onBack ? 1 : 0 }]}
        disabled={!onBack}
      >
        <ChevronLeft size={18} color={COLORS.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 30 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceAlt,
  },
  title: {
    fontFamily: FONTS.displaySemibold,
    fontSize: 16,
    color: COLORS.text,
  },
});