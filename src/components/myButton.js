import React from "react"; // 리액트 호출
import { TouchableOpacity, Text } from "react-native"; // 리액트 네이티브에서 제공하는 컴포넌트 추가

const MyButton = () => {
    return (
        <TouchableOpacity
            style={{ 
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
            }}
            onPress={() => alert('Click!!!')}
        >
            <Text style={{ color: 'white', fontSize: 24}}>My Button</Text>
        </TouchableOpacity>
    );
};

export default MyButton;