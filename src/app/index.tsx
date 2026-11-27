
 //Remove globalStyles from styles/global
import { theme } from "@/styles/theme";
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    //Initialize router using useRouter
    const router = useRouter();
    // Button hover state
    const [hovered, setHovered] = useState(false);

    return (
      <View style={styles.background}>
        <Image
          source={require("../assets/intro/background-intro.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
      />
        <View style={styles.overlay}>

          <View style = {styles.titleBox}>
                {/* Main RPG title */}
              <Text style={styles.rpgTitle}>
                WELCOME TO{"\n"} ✧YUVA✧
              </Text>

              <Text style={styles.storySubtitle}>
                Start your next adventure and level up your habits.
              </Text>
          </View>

            

            {/* Animated chakra divider */}
            <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />


            <View style={styles.dividerLine} />
        </View>


            
            {/* We want to add interactability for the button */}
            <Pressable
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            onPress={() => router.replace('/onboarding')}
            style={({ pressed }) => [
                styles.rpgButton,
                {
                opacity: pressed ? 0.65 : hovered ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
                },
            ]}
            >
            <View style={styles.buttonInner}>
                <Text style={styles.rpgButtonText}>
                BEGIN JOURNEY
                </Text>
            </View>

            {/* gold corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            </Pressable>

            <Pressable
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            onPress={() => router.replace('/story')}
            style={({ pressed }) => [
                styles.rpgButton,
                {
                opacity: pressed ? 0.65 : hovered ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
                },
            ]}
            >
            <View style={styles.buttonInner}>
                <Text style={styles.rpgButtonText}>
                FASTRACK TO STORY
                </Text>
            </View>

            {/* gold corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            </Pressable>

        </View>
        </View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: theme.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 90,
  },
  subtitle: {
    fontSize: 16,
    color: theme.mutedText,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24
    // fontFamily:'Times New Roman'
  },

  rpgTitle: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 46,
    color: theme.parchment,
    textAlign: "center",
    lineHeight: 55,
    marginBottom: 24,
  },

  storySubtitle: {
    fontFamily: "CormorantGaramond_400Regular_Italic",
    fontSize: 24,
    color: theme.gold,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 30,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 35,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.gold,
  },

  chakraWheel: {
    width: 60,
    height: 60,
    marginHorizontal: 12,
  },

  rpgButton: {
    backgroundColor: theme.button,
    borderWidth: 2,
    borderColor: theme.gold,
    borderRadius: 0,
    padding: 5,
    width: 245,
    position: "relative",
  },

  buttonInner: {
    borderWidth: 1,
    borderColor: theme.buttonBorder,
    paddingVertical: 13,
    alignItems: "center",
  },

  rpgButtonText: {
    fontFamily: "MedievalSharp_400Regular",
    fontSize: 20,
    color: theme.parchment,
  },

  corner: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: theme.goldHighlight,
    borderWidth: 1,
    borderColor: theme.cornerBorder,
  },

  topLeft: { top: -3, left: -3 },
  topRight: { top: -3, right: -3 },
  bottomLeft: { bottom: -3, left: -3 },
  bottomRight: { bottom: -3, right: -3 },

  titleBox: {
    backgroundColor: theme.panelOverlay,
    borderWidth: 2,
    borderColor: theme.gold,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },
});





