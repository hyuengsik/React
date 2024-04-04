import React, { useState } from 'react';

const Practice1 = ()=> {

    const [InputText , setInputText] = useState('');

    // 배열형태의 객체, 기본속성이 false인 객체 생성

    return (
        <>
            
            <div>
                <h4>할 일 추가</h4>
                <input type='text' onChange={ (e)=>{setInputText(e.target.value)}} />
                <button>추가하기</button>
            </div>
        
        </>
    );

}
export default Practice1;