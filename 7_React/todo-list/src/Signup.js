import React, { useState } from 'react';


const SignupContainer = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [result, setResult] = useState('');


    // 아이디 중복 검사 함수

    const [idValidation, setIdValidation] = useState(false);
    // false -> 사용 불가능
    // true -> 사용 가능

    const idCheck = (inputId) => {

        // inputId : 입력한 아이디
        setId(inputId); // id 변수에 입력받은 아이디 대입

        // 4글자 미만 중복검사X
        if (inputId.trim().length < 4) {
            setIdValidation(false);
            return;
        }

        fetch("/idCheck?id=" + inputId)
            .then(resp => resp.text())
            .then(result => {

                console.log(`result " ${result}`)

                console.log(typeof result);
                // 응답이 string 형태

                // number 타입으로 parsing
                if (Number(result) === 0) { // 중복 X -> 사용 가능
                    setIdValidation(true);

                } else { // 중복 O -> 사용 불가능
                    setIdValidation(false);
                }
            })
            .catch(e => { console.log(e) })



    }







    // 회원 가입 함수
    const signup = () => {


        // 1. 비밀번호가 일치하지 않으면
        // '비밀번호가 일치하지 않습니다.' alert 출력 후 return
        if (pw !== pwCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 아이디가 사용 불가인 경우 (짧거나 중복)
        if (idValidation!==true){
            setId('');
            document.getElementById("id").focus();
            
            alert("아이디를 다시 입력하세요.")
            return;
        }

        // **** 회원 가입 요청(비동기, POST) ****
        fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // JS Object -> JSON
            body: JSON.stringify({
                id: id,
                pw: pw,
                name: name
            })
        })
            .then(resp => resp.text())
            .then(result => {
                if (result > 0) {
                    setResult('회원 가입 성공');
                    setId('');
                    setPw('');
                    setPwCheck('');
                    setName('');
                    return;
                } else {
                    setResult('회원 가입 실패');
                    return;
                }

            })
            .catch(err => console.log(err))

        // 2. id === 'user01', pw === 'pass01'
        // 맞으면 result에 '회원 가입 성공' 출력
        // + 모든 입력칸(input) 내용 삭제

        // 아니면 result에
        // '회원 가입 실패' 출력

    }



    return (
        <div className='signup-container'>

            <label>
                ID :
                <input type='text' id='id' value={id} className={idValidation ? '' : 'id-error'}
                    onChange={(e) => {
                        // setId(e.target.value)
                        idCheck(e.target.value)
                    }} />
            </label>

            <label>
                PW :
                <input type='password' value={pw} onChange={(e) => { setPw(e.target.value) }} />
            </label>

            <label>
                PW CHECK :
                <input type='password' value={pwCheck} onChange={(e) => { setPwCheck(e.target.value) }} />
            </label>

            <label>
                NAME :
                <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
            </label>

            <button onClick={signup}>가입하기</button>

            <hr />

            <h3>{result}</h3>

        </div>
    );


}

export default SignupContainer;