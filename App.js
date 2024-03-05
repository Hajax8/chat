import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { firestore, addDoc, MESSAGES, collection, serverTimestamp, getAuth, signInWithEmailAndPassword } from './firebase/Config';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { convertFireBaseTimeStampToJS } from './helpers/Functions';
import Login from './components/Login';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [logged, setLogged] = useState(false);


  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'asc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {

        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFireBaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))

    setNewMessage('')
    console.log('Message saved');
  }

  if (logged) {

    return (
      <View style={styles.container}>
        <StatusBar style = {{backgroundColor: '#158551'}}/>
        <ScrollView>
          {
            messages.map((message) => (
              <View style={styles.message} key={message.id}>
                <Text style={styles.messageInfo}>{message.created}</Text>
                <Text>{message.text}</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor:'#0c6d3e', padding:5 }}>
          <TextInput style={styles.sendMessage} placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)} />
          <View style= {styles.sendButton}>
          <Button  color = 'green' title='Send' type='button' onPress={save} />
          </View>
        </View>
      </View>
    )
  } else {
    return <Login setLogin={setLogged}/>
  }

}

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    flex: 1,
    backgroundColor: '#158551',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#11ffaf',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
  },
  sendMessage: {
    flex: 0.75,
    backgroundColor: '#11ffaf',
    borderWidth: 1,
    padding: 7,
    borderRadius:5,
  },
  sendButton: {
    backgroundColor: '#0c6d3e',
    height: 40,
  },
});
