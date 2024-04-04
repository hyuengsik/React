import React, { useState, useContext } from 'react';
import { TodoListContext } from './App';

const TodoList = () => {

    const { todoList, setTodoList, loginMember } = useContext(TodoListContext);

    const [inputTodo, setInputTodo] = useState('');

    let keyIndex = 0;

    // 할일 추가 
    const handleAddTodo = () => {
        // 입력 X 
        if (inputTodo.trim().length === 0) {
            alert('할 일을 입력해주세요');
            return;
        }

        const todoMemberNo = loginMember.todoMemberNo;
        // console.log("todoMemberNo:" + todoMemberNo);
        // console.log("inputTodo:" + inputTodo);
        // console.log("todoList" + todoList);


        fetch("/todo", {
            method: "post",
            headers: {
                //전달되는 데이터 타입
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                todoMemberNo: todoMemberNo,
                title: inputTodo
            })
        })
            .then(resp => resp.text())
            .then(i => {

                // 새로운 할 일 객체 생성
                const newTodo = {
                    todoMemberNo: todoMemberNo,
                    title: inputTodo,
                    isDone: 'X' // 기본 상태는 'X'로 설정
                };

                // 할 일 목록 업데이트
                setTodoList([...todoList, newTodo]);

                // 입력 필드 초기화
                setInputTodo('');

            })
            .catch(err => console.log(err));


    };

    // O X 업데이트
    const handleToggleTodo = (todo, index) => {

        // todo.isDone의 값을 변경
        const updateValue = (todo.isDone === 'O' ? 'X' : 'O');

        // 변경된 isDone 값을 포함하는 새로운 todo 객체를 생성
        const updatedTodo = {
            ...todo, //todo객체 얕은 복사
            isDone: updateValue // 이렇게하면 ->isDone 속성만 새로운 값으로 업데이트
        };
        // console.log(updatedTodo);

        fetch("/todo", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
        })
            .then(resp => resp.text())
            .then(result => {
                const updatedTodoList = todoList.map((item, idx) =>idx === index ? updatedTodo : item);
                setTodoList(updatedTodoList);
            })
            .catch(err => console.log(err));
    };

    // 할일 삭제
    const handleDeleteTodo = (todoNo, index) => {

        // console.log("index:" + index);

        fetch("/todo", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoNo),
        })
            .then(resp => resp.text())
            .then(result => {

                console.log('삭제완료');
                // console.log('result:' + result);

                // setTodoList(todoList.filter(todo => todo.todoNo !== todoNo));
                // setTodoList(todoList.splice(index, 1));

                const delTodoList = [...todoList];
                delTodoList.splice(index, 1);
                setTodoList(delTodoList);

                // const delTodoList = todoList.splice(index, 1);
                // console.log(delTodoList);

            })
            .catch(err => console.log(err));

    };


    return (
        <>
            <h1> {loginMember.name}의 TodoList </h1>

            <div className="todo-container">


                <h3>할 일(Todo) 입력</h3>
                <div>
                    <input type="text" value={inputTodo} onChange={e => setInputTodo(e.target.value)} />
                    <button onClick={handleAddTodo}>Todo 추가</button>
                </div>


                <ul>
                    {todoList.map((todo, index) => (

                        <li key={keyIndex++}>
                            <div>
                                <span className={todo.isDone === 'O' ? 'todo-complete' : ''}> {todo.title} </span>


                                <span>
                                    <button onClick={() => { handleToggleTodo(todo, index) }}>{todo.isDone}</button>
                                    <button onClick={() => { handleDeleteTodo(todo.todoNo, index, keyIndex) }}>삭제</button>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>


            </div>

        </>
    );


}
export default TodoList;