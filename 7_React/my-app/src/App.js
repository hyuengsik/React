import './App.css';

// componentx 폴더의 Exam1.js를 가져와서
// 사용할 때  이름을 Ex1으로 지정
import Ex1 from './components/Exam1';
import Ex2 from './components/Exam2';

import Practice from './components/Practice';

import PropsEx from './components/R01_props';
import State1 from './components/R02_state1';
import State2 from './components/R03_state2';
import State3 from './components/R04_state3';
import TodoList from './components/R05_todolist';
import ContextApi from './components/R06_context_api';

function App() {

  // 리액트의 컴포넌트는 딱 하나의 요소만을 반환할 수 있다. 
  // -> 여러 요소를 반환하고 싶을 때는 부모 요소로 묶어준다!
  return (
    // <h1 className="test">Hello React</h1>
    // <h1 style={ {color : "red" , fontSize : '16px'} }>Hello React</h1>

    /* fragment(<></>) : 반환되는 요소를 감쌀 때 사용, 해석하지 않음 */
    <>
      {/* jsx 주석 */}
      <h1>Hello React</h1>

      <div>리액트 배운다!</div>

      {/* 연습 */}
      {/* <Practice/> */}
      

      {/* <Ex1 /> */}
      {/* <Ex2 /> */}

      {/* <PropsEx name={'홍길동'} />
      <PropsEx name={'김길동'} />
      <PropsEx name={'이길동'} /> */}

      {/* R02_state1 */}
      {/* <State1/> */}

      {/* R03_state2 */}
      {/* <State2 init={100}/> */}

      {/* R04_state3 */}
      {/* <State3/> */}

      {/* R05_TodoList */}
      <TodoList/>

      {/* R06_context_api */}
      {/* <ContextApi/> */}

    </>

  );
}

export default App;
