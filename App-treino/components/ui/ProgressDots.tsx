// components/ui/ProgressDots.tsx
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

type Props = { step: number; total: number };

export default function ProgressDots({ step, total }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, { backgroundColor: i <= step ? COLORS.saude : COLORS.surfaceAlt }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 12 },
  dot: { height: 6, flex: 1, borderRadius: 999 },
});