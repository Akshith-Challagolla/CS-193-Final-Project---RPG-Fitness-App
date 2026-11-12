
import { globalStyles } from '@/styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import useSQLiteContext to store values
import { useSQLiteContext } from 'expo-sqlite';

export default function OnboardingScreen() {

    // store the possible answers for our first question, this is array storing
    // Now we'll store multiple questions, each with its own options
    const questions = [
        {
            question: 'How experienced are you with working out?',
            options: ['Beginner', 'Intermediate', 'Advanced'],
        },
        {
            question: 'How comfortable are you with weights?',
            options: ['Not comfortable', 'Somewhat comfortable', 'Very comfortable'],
        },
        {
            question: 'How often do you currently exercise?',
            options: ['Rarely', '1-2 days', '3-4 days', '5+ days'],
        },
        {
            question: 'How many days can you commit each week?',
            options: ['2 days', '3 days', '4 days', '5+ days'],
        },
        {
            question: 'What is your main fitness goal?',
            options: ['Build muscle', 'Build strength', 'Improve endurance', 'General fitness'],
        },
    ];

    // Then track which option the user has selected
    // We now store an answer for each question instead of just one answer
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Track the question the user is currently viewing
    const [currentQuestion, setCurrentQuestion] = useState(0);

    //Break Down Below:
    // 1. We define an array called options that contains the possible answers for the first question.
    // 2. We use the useState hook to create a state variable called selectedAnswer, which will store the answer that the user selects. It is initialized to null, meaning no answer is selected at the start.
    // 3. The setSelectedAnswer function is used to update the selectedAnswer state when the user selects an option.

    // Updated logic:
    // The answers object stores a selection for every question.
    // currentQuestion keeps track of the question being displayed.

    // When currentQuestion reaches questions.length, show Completed!
    const isCompleted = currentQuestion === questions.length;

    // Move forward one question
    const handleNext = () => {
        if (answers[currentQuestion] === undefined) {
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
    };

    // Move backward one question
    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const db = useSQLiteContext();

    const handleProceed = async () => {
        // Save the answers to the database
        try {
            await db.runAsync(
                // Tells SQLite to insert the answers into the user_profile table
                `INSERT INTO user_profile
                (experience, weight_comfort, exercise_frequency, commitment, fitness_goal)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    answers[0],
                    answers[1],
                    answers[2],
                    answers[3],
                    answers[4]
                ]
            );
            console.log('Profile saved successfully!');

            router.replace('/app');
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={styles.title}>Fitness Assessment</Text>

            {!isCompleted ? (
                <>
                    <Text style={styles.progressText}>
                        Question {currentQuestion + 1} of {questions.length}
                    </Text>

                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.questionBox}>
                        <Text style={styles.questionText}>
                            {questions[currentQuestion].question}
                        </Text>

                        <View style={styles.optionsContainer}>
                            {/* Generate a button for each answer */}
                            {questions[currentQuestion].options.map((option) => (
                                <Pressable
                                    key={option}
                                    onPress={() =>
                                        setAnswers((previousAnswers) => ({
                                            ...previousAnswers,
                                            [currentQuestion]: option,
                                        }))
                                    }
                                    style={({ pressed }) => [
                                        styles.button,
                                        {
                                            opacity: pressed ? 0.7 : 1,
                                            transform: [{ scale: pressed ? 0.96 : 1 }],
                                        },
                                        answers[currentQuestion] === option && styles.selectedButton,
                                    ]}
                                >
                                    <Text style={styles.buttonText}>
                                        {option}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    <View style={styles.navigationContainer}>
                        {currentQuestion > 0 && (
                            <Pressable
                                style={styles.backButton}
                                onPress={handleBack}
                            >
                                <Text style={styles.backButtonText}>Back</Text>
                            </Pressable>
                        )}

                        <Pressable
                            disabled={answers[currentQuestion] === undefined}
                            onPress={handleNext}
                            style={({ pressed }) => [
                                styles.nextButton,
                                pressed && { transform: [{ scale: 0.96 }] },
                                answers[currentQuestion] === undefined &&
                                    styles.disabledButton,
                            ]}
                        >
                            <Text style={styles.nextButtonText}>
                                {currentQuestion === questions.length - 1
                                    ? 'Finish →'
                                    : 'Next →'}
                            </Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <View style={styles.completedBox}>
                    <Text style={styles.completedTitle}>Completed!</Text>

                    <Text style={styles.completedDescription}>
                        Your fitness assessment is complete.
                        Your adventure begins now!
                    </Text>

                    {/* Button for Proceeding to the app */}
                    {/* <Pressable
                        style={styles.nextButton}
                        onPress={() => {
                            // setAnswers({});
                            // setCurrentQuestion(0);
                            //Here we need to proceed to the app
                            // Go to the next screen
                        }}
                    >
                        <Text style={styles.nextButtonText}>
                            Proceed to App →
                        </Text>
                    
                    </Pressable> */}

                    <Pressable 
                        style={({ pressed }) => [
                            globalStyles.button,
                            {
                                opacity: pressed ? 0.7 : 1,
                                transform: [{ scale: pressed ? 0.96 : 1 }],
                            }        
                        ]}
                        // Replace push with .replace to prevent going back to onboarding
                        //onPress={() => handleProceed()} -> This creates another function that calls handleProceed, 
                        // we can just call handleProceed directly since its already a function
                        onPress={handleProceed}
                        
                        >
                        <Text style={globalStyles.buttonText}>Proceed →</Text>
                    </Pressable>                   

                    {/* Button for Restarting the assessment */}
                    <Pressable
                        style={globalStyles.button}
                        onPress={() => {
                            setAnswers({});
                            setCurrentQuestion(0);
                        }}
                    >
                        <Text style={globalStyles.buttonText}>
                            Start Again ↻
                        </Text>
                    </Pressable>

                </View>
            )}
        </ScrollView>
    );
}

// Here we want to add styles that fit the questionaire screen, I might move these to global styles
//Work on formatting for question box
const styles = StyleSheet.create({
  
    container: {
    flex: 1,
    backgroundColor: '#503F0C',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
        gap: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,
    },

    progressText: {
        fontSize: 14,
        color: '#F1E4BE',
        fontWeight: '600',
        textAlign: 'center',
    },

    progressTrack: {
        height: 8,
        backgroundColor: '#75632A',
        borderRadius: 4,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#C9AC68',
        borderRadius: 4,
    },

    questionBox: {
        backgroundColor: '#63501E',
        borderWidth: 3,
        borderColor: '#C9AC68',
        borderRadius: 18,
        padding: 20,
        gap: 20,
    },

    questionText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },

    optionsContainer: {
        width: '100%',
        gap: 12,
    },

    button: {
        backgroundColor: '#1E3B2F',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#779480',
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },

    selectedButton: {
        backgroundColor: '#8579DD',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },

    navigationContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'flex-end',
    },

    backButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#C9AC68',
    },

    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    nextButton: {
        backgroundColor: '#1E3B2F',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#C9AC68',
        alignItems: 'center',
    },

    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

    disabledButton: {
        opacity: 0.4,
    },

    completedBox: {
        backgroundColor: '#63501E',
        borderWidth: 3,
        borderColor: '#C9AC68',
        borderRadius: 18,
        padding: 28,
        alignItems: 'center',
        gap: 24,
    },

    completedTitle: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
    },

    completedDescription: {
        color: '#F1E4BE',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 28,
    },

});


//We are currently not saving any information, we need to save information using
//AsyncStorage or a database(for long term we need SQLite)