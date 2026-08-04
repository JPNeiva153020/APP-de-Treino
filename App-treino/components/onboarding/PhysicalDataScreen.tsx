// components/onboarding/PhysicalDataScreen.tsx
// Campos mapeiam diretamente para as colunas de public.usuarios no schema
// Supabase: data_nascimento, sexo_biologico, peso_kg, altura_cm.
// Altura/peso opcionais (mesmo princípio já registrado no onboarding: dado
// de segurança/personalização não deve ter fricção obrigatória excessiva).

import { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import ScreenHeader from '../ui/ScreenHeader';
import ProgressDots from '../ui/ProgressDots';
import PrimaryButton from '../ui/PrimaryButton';

type SexoBiologico = 'masculino' | 'feminino' | 'prefiro_nao_informar';

type Props = {
  onBack: () => void;
  onNext: (dados: {
    dataNascimento: string; // formato AAAA-MM-DD, pronto para salvar no banco
    sexoBiologico: SexoBiologico;
    pesoKg: number | null;
    alturaCm: number | null;
  }) => void;
};

const OPCOES_SEXO: { id: SexoBiologico; label: string }[] = [
  { id: 'masculino', label: 'Masculino' },
  { id: 'feminino', label: 'Feminino' },
  { id: 'prefiro_nao_informar', label: 'Prefiro não informar' },
];

export default function PhysicalDataScreen({ onBack, onNext }: Props) {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [sexoBiologico, setSexoBiologico] = useState<SexoBiologico | null>(null);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const diaNum = parseInt(dia, 10);
  const mesNum = parseInt(mes, 10);
  const anoNum = parseInt(ano, 10);
  const dataValida =
    dia.length > 0 &&
    mes.length > 0 &&
    ano.length === 4 &&
    diaNum >= 1 &&
    diaNum <= 31 &&
    mesNum >= 1 &&
    mesNum <= 12 &&
    anoNum >= 1920 &&
    anoNum <= new Date().getFullYear();

  const formValido = dataValida && sexoBiologico !== null;

  const handleAvancar = () => {
    if (!formValido || !sexoBiologico) return;
    const dataNascimento = `${ano.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    onNext({
      dataNascimento,
      sexoBiologico,
      pesoKg: peso.trim() ? Number(peso.replace(',', '.')) : null,
      alturaCm: altura.trim() ? Number(altura.replace(',', '.')) : null,
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Dados físicos" onBack={onBack} />
      <ProgressDots step={0} total={8} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionLabel}>Data de nascimento</Text>
        <View style={styles.dateRow}>
          <TextInput
            value={dia}
            onChangeText={setDia}
            placeholder="DD"
            placeholderTextColor={COLORS.textFaint}
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, styles.dateInputSmall]}
          />
          <TextInput
            value={mes}
            onChangeText={setMes}
            placeholder="MM"
            placeholderTextColor={COLORS.textFaint}
            keyboardType="number-pad"
            maxLength={2}
            style={[styles.input, styles.dateInputSmall]}
          />
          <TextInput
            value={ano}
            onChangeText={setAno}
            placeholder="AAAA"
            placeholderTextColor={COLORS.textFaint}
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.input, styles.dateInputLarge]}
          />
        </View>

        <Text style={styles.sectionLabel}>Sexo biológico</Text>
        <Text style={styles.hint}>
          Relevante para alguns módulos de saúde e contraindicações específicas.
        </Text>
        <View style={styles.chipsRow}>
          {OPCOES_SEXO.map((opt) => {
            const isSel = sexoBiologico === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => setSexoBiologico(opt.id)}
                style={[styles.chip, isSel && styles.chipSelected]}
              >
                <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{opt.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Peso e altura (opcional)</Text>
        <View style={styles.rowFields}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              value={peso}
              onChangeText={setPeso}
              placeholder="Ex: 78"
              placeholderTextColor={COLORS.textFaint}
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              value={altura}
              onChangeText={setAltura}
              placeholder="Ex: 175"
              placeholderTextColor={COLORS.textFaint}
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton disabled={!formValido} onPress={handleAvancar}>
          Continuar
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, gap: 8 },
  sectionLabel: {
    fontFamily: FONTS.displaySemibold,
    fontSize: 14,
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 4,
  },
  hint: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textMuted, marginBottom: 8 },
  dateRow: { flexDirection: 'row', gap: 10 },
  dateInputSmall: { flex: 1, textAlign: 'center' },
  dateInputLarge: { flex: 1.6, textAlign: 'center' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: { backgroundColor: COLORS.saude, borderColor: COLORS.saude },
  chipText: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.text },
  chipTextSelected: { color: '#0B0E12' },
  rowFields: { flexDirection: 'row', gap: 12 },
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
  footer: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 12 },
});