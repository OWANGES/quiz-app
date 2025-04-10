import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './components/Question';
import Summary from './components/Summary';

const Stack = createStackNavigator();

export default function App() {
  const data = [
    {
      prompt: "This is the question...",
      type: "multiple-choice",
      choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
      correct: 0,
    },
    {
      prompt: "This is another question...",
      type: "multiple-answer",
      choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
      correct: [0, 2],
    },
    {
      prompt: "This is the third question...",
      type: "true-false",
      choices: ["choice 1", "choice 2"],
      correct: 1,
    },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen name="Question">
          {props => <Question {...props} data={data} index={0} />}
        </Stack.Screen>
        <Stack.Screen name="Summary">
          {props => <Summary {...props} data={data} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
