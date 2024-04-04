import "./App.css";
import logo from "./images/logo.jpg";
import { Routes, Route, Link } from "react-router-dom";
import MainContent from "./MainContent";
import React, { createContext, useState } from "react";
import BoardList from "./BordList";
import InsertBoardList from "./InsertBoardList";
import BoardDetail from "./BoardDetail";
import UpdateBoard from "./UpdateBoard";

export const DataContext = createContext(); // 전역변수 생성

function App() {
  const [data, setData] = useState([
    {
      title: "프로젝트 조원이 안나올 때 꿀팁!",
      writer: "유저일",
      like: 0,
      issueDate: "2024-03-15",
      content: "안알려줌",
    },
    {
      title: "리액트 마스터 하는 법",
      writer: "유저이",
      like: 0,
      issueDate: "2024-03-16",
      content: "이해될 때까지 복습",
    },
    {
      title: "바디프로필 100일만에 찍는 법",
      writer: "유저삼",
      like: 0,
      issueDate: "2024-03-17",
      content: "덜먹고 더운동하기",
    },
  ]);
  // console.log(data);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {" "}
      {/* 자식컴포넌트에게 전달하기 위해 이렇게 작성 */}
      <main>
        <header>
          <section>
            <Link to="/">
              <img src={logo} id="homeLogo" />
            </Link>
          </section>

          <section></section>
          <section></section>
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/0">공지사항</Link>
            </li>
            <li>
              <Link to="/1">자유 게시판</Link>
            </li>
            <li>
              <Link to="/2">질문 게시판</Link>
            </li>
            <li>
              <Link to="/3">FAQ</Link>
            </li>
            <li>
              <Link to="/4">1:1문의</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {" "}
          {/* 사이트에 있는 페이지 */}
          {/* :URL
                    path : 요청 주소 작성
                    element : 보여질 화면
                */}
          {/* 메인 화면 */}
          <Route path="/" element={<MainContent />}></Route>
          {/* :URL */}
          {/* :boardCode -> url파라미터 */}
          {/* 게시글 목록 */}
          <Route path="/:boardCode" element={<BoardList />}>
            {/* nested routs  : 중첩으로 route작성  <BoardList /> 안에 <Outlet/> 으로 작성위치 지정해야함*/}
            {/* 게시글 목록 추가 */}
            <Route path="insertBoardList" element={<InsertBoardList />} />
            {/* 네스티드 Route 형태*/}
          </Route>
          {/* 게시글 상세 화면 */}
          <Route path="/:boardCode/detail/:boardNo" element={<BoardDetail />}>
            {" "}
          </Route>
          <Route
            path="/:boardCode/detail/:boardNo/updateBoard"
            element={<UpdateBoard />}
          />
          {/* 잘못된 요청일 경우 (없는 페이지) */}
          <Route
            path="*"
            element={
              <div className="error-page">존재하지 않는 페이지 입니다.</div>
            }
          />
          <Route path="1" element={<div>자유게시판</div>} />
        </Routes>
      </main>
    </DataContext.Provider>
  );
}

export default App;
