
import { globalStyles } from '@/styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import useSQLiteContext to store values
import { theme } from '@/styles/theme';
import { useSQLiteContext } from 'expo-sqlite';

export default function OnboardingScreen() {

	// button hover state as used and updated in title screen
	const [hovered, setHovered] = useState(false);
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

            router.replace('/weeklyplan');
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
						          onHoverIn={() => setHovered(true)}
						          onHoverOut={() => setHovered(false)}
						          onPress={handleProceed}
						          style={({ pressed }) => [
							          globalStyles.rpgButton,
							          {
							            opacity: pressed ? 0.65 : hovered ? 0.8 : 1,
							            transform: [{ scale: pressed ? 0.96 : 1 }],
							          },
						          ]}
						            // Replace push with .replace to prevent going back to onboarding
                        //onPress={() => handleProceed()} -> This creates another function that calls handleProceed, 
                        // we can just call handleProceed directly since its already a function
                    >
                        <Text style={globalStyles.rpgButtonText}>Proceed →</Text>
                    </Pressable>                   

                    {/* Button for Restarting the assessment */}
                    <Pressable
					            onHoverIn={() => setHovered(true)}
						          onHoverOut={() => setHovered(false)}   
					            onPress={() => {
					              setAnswers({});
						            setCurrentQuestion(0);
					            }}
                      style={({ pressed }) => [
							          globalStyles.rpgButton,
							          {
							            opacity: pressed ? 0.65 : hovered ? 0.8 : 1,
							            transform: [{ scale: pressed ? 0.96 : 1 }],
							          },
						          ]}
                    >
                        <Text style={globalStyles.rpgButtonText}>
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
	backgroundColor: theme.black,
  },

  scrollContent: {
	flexGrow: 1,
	paddingHorizontal: 24,
	paddingTop: 80,
	paddingBottom: 40,
	gap: 20,
  },

  title: {
	fontFamily: "MedievalSharp_400Regular",
	fontSize: 32,
	color: theme.parchment,
	textAlign: 'center',
	marginBottom: 12,
  },

  progressText: {
	fontFamily: "Inter_600SemiBold",
	fontSize: 14,
	color: theme.parchment,
	textAlign: 'center',
  },

  progressTrack: {
	height: 8,
	backgroundColor: theme.stoneDark,
	borderRadius: 4,
	overflow: 'hidden',
  },

  progressFill: {
	height: '100%',
	backgroundColor: theme.gold,
	borderRadius: 4,
  },

  questionBox: {
	backgroundColor: theme.panel,
	borderWidth: 2,
	borderColor: theme.goldDark,
	borderRadius: 0,
	padding: 20,
	gap: 20,
  },

  questionText: {
	fontFamily: "CormorantGaramond_600SemiBold",
	color: theme.parchment,
	fontSize: 26,
	textAlign: 'center',
	marginBottom: 12,
  },

  optionsContainer: {
	width: '100%',
	gap: 12,
  },

  button: {
	backgroundColor: theme.stone,
	paddingVertical: 16,
	paddingHorizontal: 20,
	borderRadius: 0,
	borderWidth: 1,
	borderColor: theme.goldDark,
	width: '100%',
	alignItems: 'center',
	shadowColor: theme.black,
	shadowOffset: { width: 0, height: 4 },
	shadowOpacity: 0.2,
	shadowRadius: 6,
	elevation: 4,
  },

  selectedButton: {
	backgroundColor: theme.button,
	borderWidth: 2,
	borderColor: theme.gold,
  },

  buttonText: {
	fontFamily: "Inter_600SemiBold",
	color: theme.parchment,
	fontSize: 17,
  },

  navigationContainer: {
	flexDirection: 'row',
	gap: 12,
	justifyContent: 'flex-end',
  },

  backButton: {
	paddingVertical: 16,
	paddingHorizontal: 24,
	borderRadius: 0,
	borderWidth: 2,
	borderColor: theme.goldDark,
  },

  backButtonText: {
	fontFamily: "Inter_700Bold",
	color: theme.parchment,
	fontSize: 16,
  },

  nextButton: {
	backgroundColor: theme.button,
	paddingVertical: 16,
	paddingHorizontal: 30,
	borderRadius: 0,
	borderWidth: 2,
	borderColor: theme.gold,
	alignItems: 'center',
  },

  nextButtonText: {
	fontFamily: "MedievalSharp_400Regular",
	color: theme.parchment,
	fontSize: 17,
  },

  disabledButton: {
	opacity: 0.4,
  },

  completedBox: {
	backgroundColor: theme.panel,
	borderWidth: 2,
	borderColor: theme.goldDark,
	borderRadius: 0,
	padding: 28,
	alignItems: 'center',
	gap: 24,
  },

  completedTitle: {
	fontFamily: "MedievalSharp_400Regular",
	color: theme.parchment,
	fontSize: 36,
	textAlign: 'center',
  },

  completedDescription: {
	fontFamily: "CormorantGaramond_400Regular",
	color: theme.parchment,
	fontSize: 22,
	textAlign: 'center',
	lineHeight: 28,
  },

});



//We are currently not saving any information, we need to save information using
//AsyncStorage or a database(for long term we need SQLite)