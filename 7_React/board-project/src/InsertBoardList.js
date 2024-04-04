import React, { useState, useContext } from "react";
import { DataContext } from "./App"; /* 해당 값 import */
import "./boardList-style.css";

const InsertBoardList = () => {
  const { data, setData } =
    useContext(
      DataContext
    ); /*  사용하기 위해서는 import DataContext을 받아야 한다. */
  const [input, setInput] =
    useState(""); /* 인풋값을 저장하고 변화시키기 위한 변수 */

  // 목록추가
  const insertList = () => {
    // 입력이 되었을 때만 새롭게 추가
    if (input !== "") {
      // 한줄로 쓸 경우
      // const dataCopy = [ {title : input , 담길내용 ..}...data];
      const newData = {
        title: input, // 입력받은 제목
        writer: "유저일",
        like: 0,
        issueDate: getCurrentDate(), // 현재 날짜
        content: "내용 없음", // 내용 고정값 or 입력 받아도 됩니다.
      };

      setData([newData, ...data]);

      setInput("");
    } else {
      alert("내용을 입력해주세요.");
    }
  };

  // 현재 날짜를 'yyyy-mm-dd' 포맷으로 반환하는 함수
  const getCurrentDate = () => {
    const today = new Date(); // <- 날짜 관련 정보 가져옴

    /* 선생님 설정 */
    // const month = date.getMonth() +1 < 10? '0' + (date.getMonth()+1) : date.getMonth()+1;
    // const dt = date.getDate();
    // if(dt<10){
    //     dt='0'+dt;
    // }
    /* return `${date.getFullYear()-${month}-${dt}`;} */

    /* 검색 코드 */
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // 0부터 시작하므로 1을 더합니다.
    let dd = today.getDate();

    mm = mm < 10 ? `0${mm}` : mm;
    dd = dd < 10 ? `0${dd}` : dd;

    return `${yyyy}-${mm}-${dd}`;
  };

  const orderbyList = () => {
    // data를 title 기준으로 정렬하기
    const sortedData = [...data].sort((a, b) => {
      // 문자열 비교를 위해 localeCompare 함수 사용
      return a.title.localeCompare(b.title);
    });

    // 정렬된 데이터로 상태 업데이트
    setData(sortedData);
  };

  return (
    <>
      {/* header */}
      <div className="header">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>

        {/* 새로운 글 추가 */}
        <button onClick={insertList}>추가</button>

        {/* 제목 가나다순으로 정렬 */}
        <button onClick={orderbyList}>제목 정렬</button>
      </div>
    </>
  );
};
export default InsertBoardList;
