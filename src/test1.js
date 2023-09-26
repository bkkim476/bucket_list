import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
// import { Alert } from 'react-native';

const SampleComponent = () => {
  const [tasks, setTasks] = useState({
    '1': { id: '1', text: 'Hanbit', completed: false },
    '2': { id: '2', text: 'React Native', completed: true },
    '3': { id: '3', text: 'React Native Sample', completed: false },
    '4': { id: '4', text: 'Edit TODO Item', completed: false }
  });

  const deleteTask = (taskId) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Delete the task if "Yes" is selected
            const updatedTasks = { ...tasks };
            delete updatedTasks[taskId];
            setTasks(updatedTasks);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Text>List of Tasks:</Text>
      <FlatList
        data={Object.values(tasks)}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default SampleComponent;