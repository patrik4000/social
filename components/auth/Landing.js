import React from 'react'
import { View, Button } from 'react-native'

export default function Landing({ navigation: { navigate } }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button 
                title="Register"
                onPress={() => {navigate('Register') }}/>
            <Button 
                title="Log In"
                onPress={() => {navigate('Login') }}/>    
        </View>
    )
}
