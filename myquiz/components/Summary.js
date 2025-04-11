import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Summary = ({ route }) => {
  const { data, answers } = route.params; 
  let score = 0;

  const renderAnswer = (question, selectedAnswer) => {
    if (question.type === 'multiple-choice' || question.type === 'true-false') {
      const isCorrect = selectedAnswer === question.correct;
      return (
        <Text
          style={[
            styles.answerText,
            {
              textDecorationLine: isCorrect ? 'none' : 'line-through',
              color: isCorrect ? 'green' : 'red',
            },
          ]}
        >
          {question.choices[selectedAnswer]} {isCorrect ? '(Correct)' : '(Incorrect)'}
        </Text>
      );
    }

    if (question.type === 'multiple-answer') {
      return question.choices.map((choice, index) => {
        const isCorrect = question.correct.includes(index);
        const isSelected = selectedAnswer.includes(index);
        const isIncorrect = isSelected && !isCorrect;

        if (isSelected && isCorrect) score++; 

        return (
          <Text
            key={index}
            style={[
              styles.answerText,
              {
                textDecorationLine: isIncorrect ? 'line-through' : 'none',
                fontWeight: isCorrect && isSelected ? 'bold' : 'normal',
                color: isIncorrect ? 'red' : 'green',
              },
            ]}
          >
            {choice} {isIncorrect ? '(Incorrect)' : ''}
          </Text>
        );
      });
    }
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Total Score: {score}</Text>
      {data.map((question, index) => {
        const selectedAnswer = answers[index]; 
        const isCorrect = Array.isArray(question.correct)
          ? question.correct.every((ans) => selectedAnswer.includes(ans))
          : selectedAnswer === question.correct;

        if (isCorrect) score++;

        return (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.prompt}</Text>
            {renderAnswer(question, selectedAnswer)}
          </View>
        );
      })}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Summary;
