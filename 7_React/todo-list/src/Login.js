import React, { useContext, useState } from 'react';
import { TodoListContext } from './App';
// 중괄호 : App.js에서 변수 이름이 TodoListContext 인 것을 가져오겠다.

const LoginComponent = () => {
    // 전역변수 Context를 사용
    const { setTodoList, setLoginMember, loginMember } = useContext(TodoListContext);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const login = () => {

        fetch("/login", {
            method: "post",
            headers: {
                //전달되는 데이터 타입
                "Content-Type": "application/json",

                // 응답 데이터 타입
                'Accept': "application/json"
            },
            body: JSON.stringify({
                id: id,
                pw: pw
            })
        })
            .then(resp => resp.json())
            .then(map => {

                console.log(map);

                // 로그인 실패 시 
                if(map.loginMember == null){
                    alert("아이디 또는 비밀번호가 일치하지 않습니다.")
                }

                // 로그인 성공 시 
                setLoginMember(map.loginMember);
                setTodoList(map.todoList);
                setId('');
                setPw('');


            })
            .catch(err => console.log(err));

    }
    
    /* 로그아웃 함수 */
    const logOut = () => {

        setLoginMember(null);
        setTodoList(null);

    }

    return (
        <div className='loginContainer'>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>
                            <input type='text' value={id} onChange={e => { setId(e.target.value) }} />
                        </td>
                    </tr>

                    <tr>
                        <th>PW</th>
                        <td>
                            <input type='password' value={pw} onChange={e => { setPw(e.target.value) }} />
                        </td>

                        <td>
                            <button onClick={login}>Login</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {loginMember && (
                <button onClick={logOut}>로그 아웃</button>
            )}
            {/* 왼쪽 참 && 수행 */}
        </div>
    );

}

export default LoginComponent;