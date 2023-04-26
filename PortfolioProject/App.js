import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { CheckBox, Input, Button } from 'react-native-elements';
import ReactDOM from 'react-dom'
import { useState } from 'react';
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainScreen from './components/MainScreen';
import ArtistsScreen from './components/ArtistsScreen';
import ArtistDetailsScreen from './components/ArtistDetails';
import ArtMovementsScreen from './components/ArtMovements';
import Quiz from './components/Quiz'




const Stack = createNativeStackNavigator();

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}


export default function App() {
  cacheFonts([FontAwesome.font])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="ArtMovementsScreen" component={ArtMovementsScreen} />
        <Stack.Screen name="ArtistDetails" component={ArtistDetailsScreen} />
        <Stack.Screen name="ArtistsScreen" component={ArtistsScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// for some reason every possible usage of AsyncStorage and using AsyncStorage.setItem and .get Item did not want to work
//importing useAsyncStorage allowed me to store the data as specified.


function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const storage = useAsyncStorage()

  const handleLogin = async () => {
    if (username === 'test' && password === 'Test1@') {
      // Stores Login
      const loginData = [{ username: 'test', password: 'Test1@' }];
      storage.setItem('loginData', JSON.stringify(loginData));
      navigation.navigate('MainScreen');
    } else {
      alert('Invalid username or password, please re-enter your credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
        testID="login-user"
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        testID="login-password"
      />
      <Button title="Login" onPress={handleLogin} testID="login-button" />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Registration')}
        testID="login-register"
      />
    </View>
  );
}

// Taken from Ex7
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25
  },
});

function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');


  const ifValid = (inputValue, setErrorFunction, errorMessage) => {
    let valid = true;
    if (!/^[^\d=?\\/@#%^&*()]+$/.test(inputValue)) {
      setErrorFunction(''); // clears input if there is an error
      setErrorFunction(errorMessage);
      valid = false;
    } else {
      setErrorFunction('');
    }
    return valid;
  };

  const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!pattern.test(phoneNumber)) {
      setPhoneNumberError('Phone number must be in format (xxx) xxx-xxxx, please try again.');
    } else {
      // May take out, leave for troubleshooting
      setPhoneNumberError('');
    }
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      setEmailError('Email must be in a valid format, please try again.');
    } else {
      setEmailError('');
    }
  };
  const validateZipCode = (zipcode) => {

    if (/^\d{5}$/.test(zipcode)) {
      setZipCode(zipcode);
      setError(null);
    } else {
      setError(`Error: ZIP code must be 5 digits long and contain only digits.`);
    }
  }

  const handleBlur = (inputName, inputValue) => {
    switch (inputName) {
      case 'firstname':
        ifValid(inputValue, setFirstName, 'First name can only include word or symbol characters, no numbers. Please Try Again.');
        break;
      case 'lastname':
        ifValid(inputValue, setLastName, 'Last name can only include word or symbol characters, no numbers. Please Try Again.');
        break;
      case 'username':
        validateUsername();
        break;
      case 'phonenumber':
        validatePhoneNumber(inputValue);
        break;
      case 'password':
        validatePassword();
        break;
      case 'confirmpassword':
        confirmPassword()
        break;
      case 'email':
        validateEmail(inputValue);
        break;
      case 'zip':
        validateZipCode(zipcode);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    // add username and password to AsyncLocalStorage array
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="First Name"
        testID="firstname"
        onChangeText={setFirstName}
        onBlur={() => handleBlur('firstname', firstName)}
      />
      <Input
        placeholder="Last Name"
        testID="lastname"
        onChangeText={setLastName}
        onBlur={() => handleBlur('lastname', lastName)}
      />
      <Input
        placeholder="Username"
        testID="username"
        onChangeText={setUsername}
        onBlur={() => handleBlur('username', username)}
      />
      <Input
        placeholder="Phone Number"
        testID="phonenumber"
        onChangeText={setPhoneNumber}
        onBlur={() => handleBlur('phonenumber', phoneNumber)}
        errorMessage={phoneNumberError}
      />
      <Input
        placeholder="Password"
        testID="password"
        onChangeText={setPassword}
        onBlur={() => handleBlur('password', password)}
      />
      <Input
        placeholder="Confirm Password"
        testID="confirmpassword"
        onChangeText={setConfirmPassword}
        onBlur={() => handleBlur('confirmpassword', confirmPassword)}
      />
      <Input
        placeholder="Email"
        testID="email"
        onChangeText={setEmail}
        onBlur={() => handleBlur('Email', Email)}
      />
      <Input
        placeholder="Zip Code"
        testID="zipcode"
        onChangeText={setZipCode}
        onBlur={() => handleBlur('zipcode', zipcode)}
      />
      <Input
        placeholder="Sign Up For Newsletter"
        testID="newsletter"
        onChangeText={setNewsletter}
        onBlur={() => handleBlur('newsletter', newsletter)}
      />
      <Button
        title="Submit"
        onPress={() => {
          handleSubmit()
          navigation.navigate('Login')
        }}
        testID="submit-register"
      />

    </View>
  );
}
