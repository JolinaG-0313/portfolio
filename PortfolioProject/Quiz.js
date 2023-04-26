import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const quizQuestions = [
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Claude Monet'],
    answer: 'Leonardo da Vinci'
  },
  {
    question: 'What art movement is characterized by vivid colors and bold brushstrokes?',
    options: ['Cubism', 'Surrealism', 'Impressionism', 'Fauvism'],
    answer: 'Fauvism'
  },
  {
    question: 'Who created the sculpture David?',
    options: ['Donatello', 'Michelangelo', 'Raphael', 'Leonardo da Vinci'],
    answer: 'Michelangelo'
  },
  {
    question: 'Who painted The Persistence of Memory?',
    options: ['Salvador Dali', 'Edvard Munch', 'Pablo Picasso', 'Vincent van Gogh'],
    answer: 'Salvador Dali'
  },
  {
    question: 'What art movement is characterized by distorted and dreamlike imagery?',
    options: ['Surrealism', 'Cubism', 'Expressionism', 'Realism'],
    answer: 'Surrealism'
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
  
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  
    setTimeout(() => {
      setSelectedOption('');
      if (currentQuestion === quizQuestions.length - 1) {
        // if the current question is the last one, show the result
        setCurrentQuestion(0);
        setTimer(0); // stop the timer
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1000);
  };
  

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption('');
    setTimer(60);
  };

  const renderQuestion = () => {
    const { question, options } = quizQuestions[currentQuestion];
    return (
      <>
        <Text style={styles.question}>{question}</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedOption === option && styles.selectedOption]}
            onPress={() => handleAnswer(option)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  const renderResult = () => {
    return (
      <>
        <Text style={styles.result}>You scored {score} out of {quizQuestions.length}!</Text>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {timer > 0 && (
        <>
          <Text style={styles.timer}>Time remaining: {timer} seconds</Text>
          {renderQuestion()}
        </>
      )}
      {timer === 0 && renderResult()}
    </View>
  )}

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    listContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    artistItem: {
      width: '45%',
      margin: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    artistImage: {
      width: '100%',
      height: 150,
      marginBottom: 10,
    },
    artistName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };
  export default Quiz;
