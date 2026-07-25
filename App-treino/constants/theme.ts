// constants/theme.ts
// Tokens de design portados do protótipo (prototipo_app_treino.jsx) —
// mesma paleta e fontes, agora em formato reutilizável para React Native.

export const COLORS = {
  bg: '#0B0E12',
  surface: '#141A21',
  surfaceAlt: '#1B222C',
  border: '#252E38',
  text: '#F1F3F2',
  textMuted: '#8C96A3',
  textFaint: '#5B6471',
  saude: '#45C9A0',
  saudeSoft: 'rgba(69,201,160,0.14)',
  estetica: '#FF7A59',
  eteticaSoft: 'rgba(255,122,89,0.14)',
  forca: '#7C8CFF',
  forcaSoft: 'rgba(124,140,255,0.14)',
  danger: '#F2545B',
  dangerSoft: 'rgba(242,84,91,0.14)',
  warn: '#F2B33D',
  warnSoft: 'rgba(242,179,61,0.14)',
};

export const CATEGORIES = {
  saude: { label: 'Saúde', color: COLORS.saude, soft: COLORS.saudeSoft },
  estetica: { label: 'Estética/Hipertrofia', color: COLORS.estetica, soft: COLORS.eteticaSoft },
  forca: { label: 'Força/Performance', color: COLORS.forca, soft: COLORS.forcaSoft },
};

// Nomes das fontes exatamente como o hook useFonts registra (ver app/_layout.tsx)
export const FONTS = {
  display: 'Montserrat_700Bold',
  displaySemibold: 'Montserrat_600SemiBold',
  displayMedium: 'Montserrat_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
};