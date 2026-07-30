// components/ui/ScreenHeader.tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
  title: string;
  onBack?: () => void;
};

export default function ScreenHeader({ title, onBack }: Props) {
  return (
    <View style={styles.row}>
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
    paddingTop: 8,
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