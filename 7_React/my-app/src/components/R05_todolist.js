import React, { useState } from 'react';


// useState복습
const InputName = () => {

    // state : 컴포넌트의 상태
    // useState : 컴포넌트의 상태를 관리
    //          -> state 의 변화가 감지되면 컴포넌트를 리렌더링

    const [name, setName] = useState("");
    // name:  변수명 
    // setName : name의 setter
    // useState('') : name 변수에 대입되는 초기값을 ''(빈칸)으로 지정

    return (
        <div>
            <p>이름을 입력하세요</p>
            <input type='text' onChange={e => setName(e.target.value)} />
            <h3>{name}</h3>
        </div>
    );
};


const TodoList = (e) => {
    // 할 일을 저장할 변수
    // -> 상태가 변하면 컴포넌트(TodoList)를 리렌더링
    const [todos, setTodos] = useState([
        { text: "프로젝트", completed: false },
        { text: "점심먹기", completed: false }
    ]);

    // console.log(todos);


    /* 할 일 입력 컴포넌트 */
    const InputTodo = () => {
        // -> 상태가 변하면 컴포넌트(InputTodo)를 리렌더링
        const [inputText, setInputText] = useState('');

        // 버튼 클릭시 할 일 추가하는 함수
        const addTodo = () => {
            const newTodo = { text: inputText, completed: false }

            // todos에 newTodo를 추가한 객체 배열 newTodos
            const newTodos = [...todos, newTodo];
            // console.log(newTodos);

            // 새로운 객체배열 newTodos를 todos에 대입
            // -> 상태변화 인식 -> 리렌더링
            setTodos(newTodos);
            setInputText(''); // 입력된 할 일 삭제
        }

        return (
            <div>
                <h4>할 일 추가</h4>
                <input type='text' onChange={(e) => setInputText(e.target.value)} />
                <button onClick={addTodo}>추가하기</button>
            </div>
        );
    };

    // 체크박스 값 변경시
    const todoChange = (index) => {
        // todos 배열 복사              // 전개연산자로
        const newTodos = [...todos]; // todos를 풀어서 새로운 배열 생성
        // -> 전개연산자를 이용한 배열의 깊은 복사

        // 선택된 todo의 completed 상태를 반전
        // boolean값 반대로 변경해서 대입
        newTodos[index].completed = !newTodos[index].completed;

        // 상태 업데이트
        setTodos(newTodos);

    };

    console.log(todos);

    const delTodo = (index) => {

        //1
        //filter 함수를 사용하여 index에 해당하지 않는 항목만 새로운 배열로 반환
        // const newTodos = todos.filter((_, i) => i !== index);
        // setTodos(newTodos); 
        //  필터 매개변수가 뭔지 이해가 안됨.

        //2
        // // todos 배열의 얕은 복사본을 만듭니다.
        const newTodos = [...todos];
        // // splice를 사용하여 index에 해당하는 항목을 제거합니다.
        newTodos.splice(index, 1);
        setTodos(newTodos);

    };

    return (
        <>
            <InputName />
            <hr />

            <h1>Todo List</h1>

            {/* 입력 */}
            <InputTodo />

            {/* 할 일 목록 */}
            {/* 배열.map( (배열요소 , 인덱스 )=>{ return 값;} ) 
                -> 기존 배열을 이용해서 새로운 배열을 만드는 함수
                -> 새로운 배열의 요소는 map에서 return되는 값으로 이루어짐
            */}
            <ul>
                {todos.map((todo, index) => {
                    return (
                        <>
                            <li key={index}>
                                <input type='checkbox'
                                    checked={todo.completed}
                                    onChange={() => { todoChange(index) }}
                                />
                                <span className={todo.completed ? 'completed' : ''}>
                                    {todo.text} <button onClick={() => { delTodo(index) }}>삭제하기</button>
                                </span>
                            </li>
                        </>

                    );
                })}
            </ul>

        </>
    );
};
// 외부에서 해당 파일을 import시, TodoList 함수를 내보내는 것을 기본값으로 지정
export default TodoList;