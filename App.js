import React, { Component } from 'react'
import { View, Text }  from 'react-native'
import firebase from 'firebase/compat/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen, { Main } from './components/Main';
import AddScreen from './components/main/Add'


const store = createStore(rootReducer, applyMiddleware(thunk))
const firebaseConfig = {
  apiKey: "AIzaSyAEm_oeO5lkvuCT436KDgysEXRbLj-qBeU",
  authDomain: "social-91033.firebaseapp.com",
  projectId: "social-91033",
  storageBucket: "social-91033.appspot.com",
  messagingSenderId: "965790182972",
  appId: "1:965790182972:web:31687261858f4ca70add39",
  measurementId: "G-67Y27S0WC7"
};

const app = firebase.initializeApp(firebaseConfig)
const Stack = createStackNavigator();

export class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
      }
    )
  }
}
)
}
  render() {
    const {loggedIn, loaded} = this.state
    if(!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName = "Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options ={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
    return(
      <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName = "Main">
          <Stack.Screen name="Main" component={MainScreen} options ={{ headerShown: false}}/>
          <Stack.Screen name="Add" component={AddScreen}/>
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>   
    )
  }
}
export default App