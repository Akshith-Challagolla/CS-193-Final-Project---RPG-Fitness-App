import { globalStyles } from '@/styles/global';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function MainScreen() {
    {/* Initialize router using useRouter */}
    const router = useRouter();
    return (
        <View style={globalStyles.container}>

        <Text style={globalStyles.title}>Fill in Dashboard here</Text>

        </View> 
        );
    }