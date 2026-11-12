import { globalStyles } from '@/styles/global';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    //Initialize router using useRouter
    const router = useRouter();
    return (
    
        <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Welcome to RPG Fitness Sim!</Text>
        <Text style={styles.subtitle}>Start your next adventure and level up your habits.</Text>
        <Text style={styles.subtitle}>Click Begin My Journey to Start.</Text>
        
        {/* We want to add interactability for the button */}
        <Pressable 
            style={({ pressed }) => [
                globalStyles.button,
                {
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                }        
            ]}
            onPress={() => router.replace('/onboarding')}
            >
            <Text style={globalStyles.buttonText}>Begin Journey</Text>
        </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24
    // fontFamily:'Times New Roman'
  }
});
