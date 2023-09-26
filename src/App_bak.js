import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './components/theme';
import { StatusBar } from 'expo-status-bar';
import Input from './components/input';
import React, { useState, useEffect, useCallback } from 'react';
import IconButton from './components/iconButton';
import { images } from './components/images';
import Task from './components/task';
import { Dimensions, Button, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
// import { Button, StyleSheet, Text, View } from 'react-native';

//로컬에 데이터 관리
import AsyncStorage from '@react-native-async-storage/async-storage';

//앱실행시 로딩화면 제어 : 앱실행전 사전작업이 준비될때까지 로딩화면을 유지시키는 역할
import * as SplashScreen from 'expo-splash-screen';

//사전작업이 준비될때까지 로딩화면 유지
SplashScreen.preventAutoHideAsync();

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
  margin: 0 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'red',
		padding: 50,
		borderRadius: 5,
		margin: 100,
	},
	buttonText: {
		fontSize: 20,
		color: 'blue',
		fontWeight: 'bold',
	},
});





const App = () => {

    //앱 준비상태 여부를 판단하는 상태변수
  const [appIsReady, setAppIsReady] = useState(false);

    // 새로운 작업을 저장하는 상태변수
  const [newTask, setNewTask] = useState('');

    // 작업목록을 저장하는 상태변수
  const [tasks, setTasks] = useState({});

    //로컬파일에 저장
    const saveTasks = async tasks => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); // js obj => json포맷의 문자열로 저장
        setTasks(tasks);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    //로컬파일에서 읽어오기
    const loadTask = async () => {
      try {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}')); // json포맷의 문자자열 => js obj
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // 앱 실행전 1회 호출
    useEffect(() => {
      async function prepare() {
        try {
          // 앱 실행전 자원 준비 : 로컬파일의 항목리스트를 읽어와서 task상태 변수에 저장
          await loadTask();
        } catch (e) {
          console.warn(e);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
  
      prepare();
    }, []);
  
    // 앱이 마운트될때 또는 컨테이너 레이아웃이 재계산될때마다 수행
    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
        // 앱실행 준비가 되었을때 로딩 화면을 숨김.
        await SplashScreen.hideAsync();
      }
    }, [appIsReady]);
  
    // 앱이 준비상태가 되었을때만 이하로직 수행
    if (!appIsReady) return null;

/*
  const [tasks, setTasks] = useState({
    '1' : {id: '1', text :'Hanbit', completed: false},
    '2' : {id: '2', text :'React Native', completed: true},
    '3' : {id: '3', text :'React Native Sample', completed: false},
    '4' : {id: '4', text :'Edit TODO Item', completed: false},
  });  
  */

  const h_onChangeText = text => setNewTask(text);

  const width = Dimensions.get('window').width;



  const h_onSubmitEditing = () => {
    // alert(newTask);
    const key = Date.now().toString(); //중복되지 않는 유일한 임의값
    const newTaskObject = {
      [key]: { id: key, text: newTask, completed: false },
    };
    setNewTask(''); //입력항목 클리어
    // setTasks({ ...tasks, ...newTaskObject });
    // console.log(tasks);
    saveTasks({ ...tasks, ...newTaskObject });
  };

  const h_deleteTask = id => {
    const currentTasks = { ...tasks };
    // const currentTasks = Object.assign({}, tasks);

    // console.log(id);

    delete currentTasks[id];
    // setTasks(currentTasks);
    saveTasks(currentTasks);
  };
  const h_toggleTask = id => {
    const currentTasks = { ...tasks };
    //const currentTasks = Object.assign({}, tasks);

    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    saveTasks(currentTasks);
    // setTasks(currentTasks);
  };
  const h_updateTask = task => {
    const currentTasks = { ...tasks };
    // const currentTasks = Object.assign({}, tasks);
    currentTasks[task.id] = task;
    saveTasks(currentTasks);
    // setTasks(currentTasks);
  };
// 할일 등록 취소
  const h_onBlur = () => {
    setNewTask('');
  };

  const h_deleteAllTask = () => {
    alert(`삭제하시겠습니까?`);
    const currentTasks = { ...tasks };
    const taskArray = Object.values(currentTasks);

//    console.log(currentTasks); 
//    console.log(taskArray); 
// Use Array.filter() to select tasks where 'completed' is true
    const completedTasks = taskArray.filter(task => !task.completed);
//    console.log(taskArray); 

    for( let i = 0 ; i < taskArray.length ; i++)
        if(taskArray.completed == false ){
            console.log(taskArray.id);
            delete currentTasks[taskArray.id];
        }

//    console.log(completedTasks);  
    saveTasks(completedTasks);
  };

  return appIsReady ? (
    <ThemeProvider theme={theme}>
        <Container onLayout={onLayoutRootView}>
            <StatusBar 
            barStyle="light-content"
            backgroundColor={theme.background}
            />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task "
          value={newTask}
          onChangeText={h_onChangeText}
          onSubmitEditing={h_onSubmitEditing}
          onBlur={h_onBlur}
          // onSubmitEditing={h_onSubmitEditing} //추가
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(task => (
              <Task 
              key={task.id} 
              //text={task.text}
              //id={task.id}
              task={task}
              deleteTask={h_deleteTask}
              toggleTask={h_toggleTask}
              updateTask={h_updateTask}
               />
            ))}
        </List>
        <Button 
            title="완료항목 전체삭체"
            style={styles.button}
            onPress={h_deleteAllTask}
             />
        </Container>
    </ThemeProvider>
      ) : (
        <AppLoading
          startAsync={loadTask}
          onFinish={() => setAppIsReady(true)}
          onError={console.error}
        />
  );
}

export default App;

/* <IconButton type={images.uncompleted} />
<IconButton type={images.completed} />
<IconButton type={images.delete} />
<IconButton type={images.update} /> */
/* <List width={width}>
<Task text='Hanbit' />
<Task text='React Native' />
<Task text='React Native Sample' />
<Task text='Edit TODO Item' />
</List> */