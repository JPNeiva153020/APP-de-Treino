// components/onboarding/RegisterScreen.tsx
// Tela nova. Validação client-side de verdade (formato de e-mail, senha
// mínima, confirmação de senha batendo) — a criação de conta real via
// Supabase Auth entra quando conectarmos o backend.

import { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import ScreenHeader from '../ui/ScreenHeader';
import PrimaryButton from '../ui/PrimaryButton';

type Props = {
  onBack: () => void;
  onCriarConta: (dados: { nome: string; email: string; senha: string }) => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ onBack, onCriarConta }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const nomeValido = nome.trim().length >= 2;
  const emailValido = EMAIL_REGEX.test(email.trim());
  const senhaValida = senha.length >= 6;
  const senhasIguais = senha.length > 0 && senha === confirmarSenha;
  const formValido = nomeValido && emailValido && senhaValida && senhasIguais;
  const mostrarErroSenha = confirmarSenha.length > 0 && !senhasIguais;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Criar conta" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Como podemos te chamar"
            placeholderTextColor={COLORS.textFaint}
            style={styles.input}
          />
        </View>

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
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={COLORS.textFaint}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Repita a senha"
            placeholderTextColor={COLORS.textFaint}
            secureTextEntry
            style={[styles.input, mostrarErroSenha && styles.inputErro]}
          />
          {mostrarErroSenha && <Text style={styles.erro}>As senhas não coincidem</Text>}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          disabled={!formValido}
          onPress={() => onCriarConta({ nome: nome.trim(), email: email.trim(), senha })}
        >
          Criar conta
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 24, paddingTop: 8, gap: 16 },
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
  inputErro: { borderColor: COLORS.danger },
  erro: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.danger },
  footer: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 12 },
});