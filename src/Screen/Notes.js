import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('@notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.log('Error loading notes:', error);
    }
  };

  const saveNote = async () => {
    if (note.trim()) {
      try {
        const newNotes = [...notes, note];
        setNotes(newNotes);
        await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
        setNote('');
      } catch (error) {
        console.log('Error saving note:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput    
        style={styles.input}
        placeholder="Enter your note"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Note" onPress={saveNote} />
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item}</Text>
          </View>
              )}
              numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotesScreen;
