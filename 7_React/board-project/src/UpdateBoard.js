import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "./App";
import "./boardUpdate.css";

/* 

new Date().toISOString().split('T')[0]는 현재 날짜를 YYYY-MM-DD 형식의 문자열로 
변환하는 JavaScript 코드입니다. 이 코드는 크게 세 부분으로 나눌 수 있습니다:

1)  new Date()는 현재 날짜와 시간을 나타내는 Date 객체를 생성합니다.
2)  .toISOString()는 Date 객체를 ISO 8601 형식(YYYY-MM-DDTHH:mm:ss.sssZ)의 문자열로 변환합니다.
3)  .split('T')[0]는 변환된 문자열을 'T' 문자를 기준으로 나누고, 그 중 첫 번째 부분(날짜 부분)을 선택합니다.

*/

const UpdateBoard = () => {
  const { data, setData } = useContext(DataContext);
  const { boardCode, boardNo } = useParams();
  const [titleInput, setInput] = useState(
    data[boardNo].title
  ); /* 인풋값을 저장하고 변화시키기 위한 변수 */
  const [contentInput, setTextarea] = useState(data[boardNo].content);
  const [updateDate, setUpdateDate] = useState(
    data[boardNo].updateDate || data[boardNo].issueDate
  );

  const navigate = useNavigate();

  /* 
    1. 수정 버튼 누른다 (제목, 내용이 필요하다)
    2. data에 제목이랑 내용 setting => setData
    -> copy본 생성해서 데이터 셋팅해주고 
    원본 데이터 변경하면 된다! 
    
    */

  const update = () => {
    const copy = [...data];
    copy[boardNo].title = titleInput;
    copy[boardNo].content = contentInput;
    copy[boardNo].updateDate = new Date().toISOString().split("T")[0];

    setData(copy);
    console.log(data);

    alert(" 수정이 완료됨 ");
    navigate(`/${boardCode}/detail/${boardNo}`);
  };

  return (
    <>
      <div className="updateContainer">
        <div className="title">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </div>
        <div className="info">
          <div>
            {data[boardNo].writer} 좋아요{data[boardNo].like}
          </div>
          <div className="date">
            <div>등록일 : {data[boardNo].issueDate}</div>
            <div>수정일 : {updateDate}</div>
          </div>
        </div>
        <div className="content">
          <textarea
            value={contentInput}
            onChange={(e) => {
              setTextarea(e.target.value);
            }}
          />
        </div>
        <button className="updateBtn" onClick={update}>
          {" "}
          수정 완료
        </button>
      </div>
    </>
  );
};

export default UpdateBoard;
