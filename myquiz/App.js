import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ButtonGroup } from 'react-native-elements';
import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

// Sample questions related to Pokémon starters
const data = [
  {
    "prompt": "Do you prefer a fire-type Pokémon?",
    "type": "true-false",
    "choices": ["No", "Yes"],
    "correct": 1  // Yes, fire-type means Charmander
  },
  {
    "prompt": "Would you enjoy battling in water?",
    "type": "true-false",
    "choices": ["No", "Yes"],
    "correct": 1  // Yes, water-type means Squirtle
  },
  {
    "prompt": "Do you like grass and nature?",
    "type": "true-false",
    "choices": ["No", "Yes"],
    "correct": 1  // Yes, grass-type means Bulbasaur
  },
  {
    "prompt": "Which is your preferred environment?",
    "type": "multiple-choice",
    "choices": ["Desert", "Forest", "Ocean", "Mountain"],
    "correct": 0  // Desert is related to Charmander
  },
  {
    "prompt": "Pick a trait you prefer:",
    "type": "multiple-answer",
    "choices": ["Adventurous", "Calm", "Loyal", "Energetic"],
    "correct": [0, 3]  // Adventurous and Energetic relate to Charmander
  },
];

const Question = ({ route, navigation }) => {
  // Default to an empty array if route.params is undefined
  const { index = 0, answers = [] } = route.params || {};
  const question = data[index];

  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerSelect = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
  };

  const handleNextQuestion = () => {
    // Add the selected answer to the answers array
    const updatedAnswers = [...answers, selectedAnswer];

    if (index + 1 < data.length) {
      // Navigate to the next question
      navigation.navigate('Question', { index: index + 1, answers: updatedAnswers });
    } else {
      // If no more questions, go to Summary
      navigation.navigate('Summary', { answers: updatedAnswers });
    }
  };

  return (
    <View>
      <Text>{question.prompt}</Text>
      <ButtonGroup
        onPress={handleAnswerSelect}
        selectedIndex={selectedAnswer}
        buttons={question.choices}
        containerStyle={{ height: 200 }}
        testID="choices"
      />
      <Button
        title="Next Question"
        onPress={handleNextQuestion}
        testID="next-question"
      />
    </View>
  );
};

const Summary = ({ route }) => {
  const { answers } = route.params;

  // Calculate the total score
  const totalScore = answers.filter((answer, index) => answer === data[index].correct).length;

  return (
    <View>
      <Text>Total Score: {totalScore}</Text>
      {data.map((question, index) => (
        <View key={index}>
          <Text>{question.prompt}</Text>
          <Text style={{ color: answers[index] === question.correct ? 'green' : 'red' }}>
            {question.choices[answers[index]]}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
