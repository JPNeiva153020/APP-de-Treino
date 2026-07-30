// components/ui/PrimaryButton.tsx
import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = PressableProps & {
  children: string;
  color?: string;
  disabled?: boolean;
};

export default function PrimaryButton({ children, color = COLORS.saude, disabled, style, ...rest }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? COLORS.surfaceAlt : color, opacity: disabled ? 0.6 : 1 },
        style as object,
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color: disabled ? COLORS.textFaint : '#0B0E12' }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.displaySemibold,
    fontSize: 14,
  },
});