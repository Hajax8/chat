import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "../firebase/Config";

function Login({setLogin}) {
    const [user, setUser] = useState('yks@kaks.com');
    const [password, setPassword] = useState('kolome');

    const login = () => {
        const auth = getAuth()
    
        signInWithEmailAndPassword(auth,user,password)
        .then((userCredetial) => {
            console.log(userCredetial.user)
            setLogin(true)
        }).catch((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                console.log('Invalid Credentials');
            } else if ((error.code === 'auth/too-many-requests')) {
                console.log('Too many login attempts');
            } else {
                console.log(error.code + ' ' + error.message);
            }
        })
    }
    
    function print() {
        console.log('working');
        setLogin(true)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Text style={styles.inputTexts}>Username</Text>
            <TextInput style={styles.input}
                value = {user}
                placeholder="Type email here"
                onChangeText={(value) => {
                    setUser(value)
                }} />
            <Text style={styles.inputTexts}>Password</Text>
            <TextInput style={styles.input} 
            placeholder="Type password here"
            value = {password}
            onChangeText={(value) => {
                setPassword(value)
             }} />
            <View style={styles.loginButton}>
                {/* <Button title="LOGIN" onPress={login} /> */}
                <Button title="LOGIN" onPress={login} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        marginLeft: 10,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    inputTexts: {
        marginTop: 10,
        fontSize: 20,
    },
    input: {
        borderWidth: 1,
        height: 40,
        padding: 10,
        marginBottom: 5,
        width: 400,
    },
    loginButton: {
        width: 100,
        fontSize: 50,
        marginTop: 10,

    }

})

export default Login;