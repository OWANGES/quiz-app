import React from 'react';
import { View, Text } from 'react-native';

const Summary = ({ route }) => {
  const { data, selectedAnswers } = route.params;
  let score = 0;

  const renderAnswer = (question, selectedAnswer) => {
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      const isCorrect = selectedAnswer === question.correct;
      return (
        <Text style={{ textDecorationLine: isCorrect ? 'none' : 'line-through' }}>
          {question.choices[selectedAnswer]} {isCorrect ? '' : '(Incorrect)'}
        </Text>
      );
    }

    if (question.type === 'multiple-answer') {
      return question.choices.map((choice, index) => {
        const isCorrect = question.correct.includes(index);
        const isSelected = selectedAnswer.includes(index);
        return (
          <Text
            key={index}
            style={{
              textDecorationLine: isSelected && !isCorrect ? 'line-through' : 'none',
              fontWeight: isCorrect && isSelected ? 'bold' : 'normal',
            }}
          >
            {choice} {isSelected && !isCorrect ? '(Incorrect)' : ''}
          </Text>
        );
      });
    }
  };

  return (
    <View>
      <Text>Total Score: {score}</Text>
      {data.map((question, index) => {
        const selectedAnswer = selectedAnswers[index];
        const isCorrect = Array.isArray(question.correct)
          ? question.correct.includes(selectedAnswer)
          : selectedAnswer === question.correct;

        if (isCorrect) score++;

        return (
          <View key={index}>
            <Text>{question.prompt}</Text>
            {renderAnswer(question, selectedAnswer)}
          </View>
        );
      })}
    </View>
  );
};

export default Summary;
