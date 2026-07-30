// components/onboarding/LoginScreen.tsx
// Tela nova (não existia no protótipo web original). Autenticação real via
// Supabase Auth entra na próxima etapa (conectar backend) — por enquanto é
// só a interface, com os campos e a navegação funcionando.

import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import PrimaryButton from '../ui/PrimaryButton';

type Props = {
  onEntrar: (email: string, senha: string) => void;
  onIrParaCadastro: () => void;
};

export default function LoginScreen({ onEntrar, onIrParaCadastro }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar seu plano.</Text>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor={COLORS.textFaint}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            placeholderTextColor={COLORS.textFaint}
            secureTextEntry
            style={styles.input}
          />
        </View>
      </View>

      <PrimaryButton onPress={() => onEntrar(email, senha)} disabled={!email || !senha}>
        Entrar
      </PrimaryButton>

      <Pressable onPress={onIrParaCadastro} style={styles.linkWrapper}>
        <Text style={styles.link}>Não tem conta? Criar conta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
  },
  form: { flex: 1, justifyContent: 'center', gap: 16 },
  title: { fontFamily: FONTS.display, fontSize: 22, color: COLORS.text },
  subtitle: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textMuted, marginBottom: 8 },
  field: { gap: 6 },
  label: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.textMuted },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.text,
  },
  linkWrapper: { marginTop: 16 },
  link: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.saude, textAlign: 'center' },
});