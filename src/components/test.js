import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './components/theme';
import { StatusBar } from 'expo-status-bar';
import Input from './components/input';
import React, { useState, useEffect, useCallback } from 'react';

import IconButton from './components/iconButton';
// import myButton from './components/myButton';
// import { images } from './components/images';
import Task from './components/task';
import { Dimensions } from 'react-native';
import { Button, StyleSheet, Text, View } from 'react-native';


const Container = styled.SafeAreaView.attrs(null)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

/*
const Button = styled.Button`
        ${sizeStyles}
`;
*/
// font-size : 1.25rem;
// height : 3rem;
// alignItems:center;
// backgroundColor =#DDDDDD :
// padding : 10;
/*
const sizeStyles = `
  ${(props) =>
    props.size === "large" `
      height: 3rem;
      font-size: 1.25rem;
    `}
  ${(props) =>
    props.size === "medium" `
      height: 2.25rem;
      font-size: 1rem;
    `}
    ${(props) =>
    props.size === "small" `
      height: 1.75rem;
      font-size: 0.875rem;
    `}
`;
*/




const App = () => {
    const [newTask, setNewTask] = useState('');
    const h_onChangeText = text => setNewTask(text);
    const h_onSubmitEditing = () => {
      alert(`newTask`);
      setNewTask('');
    };

    const deleteAllCompletedItems = () => {
        alert(`delete`);
      };

    // 작업목록을 저장하는 상태변수
    const [tasks, setTasks] = useState({});

    const width = Dimensions.get('window').width;

  return (

    <ThemeProvider theme={theme}>
        <Container>
            <StatusBar 
            barStyle="light-content"
            backgroundColor={theme.background}
            />
            <Title>버킷 리스트</Title>
            <Input 
            placeholder="+ 항목 추가"  
            value={newTask}
            onChangeText={h_onChangeText}
            onSubmitEditing={h_onSubmitEditing}
            // onBlur
            />
          <List width={width}>
            {Object.values(tasks)
              .reverse()
              .map(item => (
                <Task  key={item.id} text={item.text} />
              ))}
          </List>
          <Button 
            title="완료항목 전체삭제"
            onClick={deleteAllCompletedItems}
            style={{ fontSize: '40px' }}
             />

        </Container>
    </ThemeProvider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

export default App;