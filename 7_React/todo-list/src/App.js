import React, { useState, createContext } from 'react';
import SignupContainer from './Signup';
import Login from './Login';
import TodoList from './TodoList';



import './App.css';


export const TodoListContext = createContext(); // 전역 변수 생성
// 변수를 내보낼 수 있음


function App() {

  // 회원 가입, 로그인, 회원의 Todo List 출력 추가/제거

  const [signupView, seSignupView] = useState(false);


  // 로그인한 회원의 정보 저장
  const [loginMember, setLoginMember] = useState(null);

  // 로그인한 회원의 todoList 저장할 변수
  const [todoList, setTodoList] = useState([]);

  return (

    /*  */                            // setter외에 모든 변수 사용 가능
    <TodoListContext.Provider value={{ setTodoList, setLoginMember, loginMember , todoList }}>
                        {/* 자식 컴포넌트에게 제공 */}
      <button onClick={() => { seSignupView(!signupView) }} >
        {signupView ? ('회원 가입 닫기') : ('회원 가입 열기')}
      </button>

      <div className='signup-wrapper'>
        {/* signupView가 true인 경우에만 회원 가입 컴포넌트 렌더링 */}
        {/* 조건식 && (true인 경우 실행될 코드) */}
        {signupView === true && (<SignupContainer />)}
      </div>

      <h1>Todo List</h1>
      <Login />

      <hr />
      {/* 로그인이 되어 있을 때만 Todo-List 출력 */}
      { loginMember && (<TodoList />)}



    </TodoListContext.Provider>

  );
}

export default App;
