
import { theme } from '@/styles/theme';
import { StyleSheet } from 'react-native';

// use const for all variable declarations to prevent accidental reassignment
// This is a colorpalette for the app, which can be used throughout the app for consistent styling
export const colors = {
  background: theme.background,
  header: theme.background,
  surface: theme.stone,
  primary: theme.gold,
  text: theme.text,
  textSecondary: theme.mutedText,
  alert: theme.chakras.root,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.parchment,
    textAlign: 'center',
    marginBottom: 12,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.button,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: theme.gold,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  buttonText: {
    color: theme.parchment,
    fontSize: 16,
    fontWeight: '600',
  },

  // Main RPG titles, using MedievalSharp
  screenTitle: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 32,
    color: theme.parchment,
    textAlign: "center",
  },

  // Smaller headings throughout the app
  sectionTitle: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 22,
    color: theme.gold,
  },

  // Story paragraphs and narration
  storyText: {
    fontFamily: "CormorantGaramond_400Regular",
    fontSize: 22,
    lineHeight: 29,
    color: theme.parchment,
    textAlign: "center",
  },

  // Italic story text
  storyItalic: {
    fontFamily: "CormorantGaramond_400Regular_Italic",
    fontSize: 22,
    lineHeight: 29,
    color: theme.parchment,
  },

  // Regular UI descriptions
  bodyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: theme.mutedText,
  },

  // Workout names and important labels
  workoutTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 19,
    color: theme.parchment,
  },

  // Small labels, weekdays, etc.
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: theme.gold,
  },

  rpgButton: {
  backgroundColor: theme.button,
  borderWidth: 2,
  borderColor: theme.gold,
  borderRadius: 0,
  paddingVertical: 16,
  paddingHorizontal: 28,
  width: 245,
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
},

rpgButtonText: {
  fontFamily: "MedievalSharp_400Regular",
  fontSize: 20,
  color: theme.parchment,
  textAlign: "center",
},

});
