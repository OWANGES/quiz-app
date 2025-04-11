import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Question = ({ route }) => {

  const { data = [], index = 0 } = route?.params || {};  
  const navigation = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = data[index] || {};

  const handleAnswerSelection = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
  };

  const handleNextQuestion = () => {
    if (index + 1 < data.length) {
      navigation.push('Question', { data, index: index + 1 });
    } else {
      navigation.navigate('Summary', { data });
    }
  };

  useEffect(() => {
    if (!data.length || !question.prompt) {
      console.error('Question data is not available');
    }
  }, [data, question]);

  return (
    <View>
      {question?.prompt ? (
        <>
          <Text>{question.prompt}</Text>
          <ButtonGroup
            onPress={handleAnswerSelection}
            selectedIndex={selectedAnswer}
            buttons={question?.choices || []}
            containerStyle={{ marginBottom: 20 }}
            testID="choices"
          />
          <Button
            title="Next Question"
            onPress={handleNextQuestion}
            testID="next-question"
          />
        </>
      ) : (
        <Text>No question available.</Text>
      )}
    </View>
  );
};

export default Question;
