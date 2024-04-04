import React, { useState, useContext } from 'react';  /* 전역번수 받기 위해선  useContext 추가*/
import { DataContext } from './App';  /* 해당 값 import */
import { Link, Outlet , useNavigate , useParams } from 'react-router-dom';

/* useNavigate : 페이지 이동 기능을 만들고 싶을 사용. : 이미 만들어진 요소에 사용하고 싶다. */
/*  useParams : 파라미터 사용 할 수 있다. */

const BoardList = () => {

    const { data, setData } = useContext(DataContext);

    const [modal, setModal] = useState(false);

    /* 선택한 게시글 번호(index)를 기억하기 위한 변수 */
    const [boardNo, setBoardNo] = useState(0);


    /* 페이지 이동 시  */
    const navigate = useNavigate(); /* 사용하려면 이렇게 함수화 */

    // useParams() : URL 파라미터에 입력한 데이터를 가지고 옴
    const {boardCode} = useParams();
    // console.log(boardCode);

    return (
        <>
            <Link to='insertBoardList' className='secretLink'> 게시글 추가 </Link>
            {/* nested routes 안에 어디에 보여줄지 지정 */}
            <Outlet />
            <div>
                {data.map((item, index) => (
                    <div key={index}>
                        <h3 onClick={ ()=>{  ( navigate(`/${boardCode}/detail/${index}`) )  } }>{item.title} {/* 네비게이트 변수 호출 */}

                    {/*  navigate(-1) : 뒤로 한 페이지  */}
                    {/*  navigate(1) : 앞으로 한 페이지  */}

                        {/* 좋아요 */}
                        <span onClick={(e) => {

                            e.stopPropagation();  // 부모 요소로의 이벤트 전달을 막아주는 함수 
                            
                            const likeCopy = [...data];
                            likeCopy[index].like++;
                            setData(likeCopy);

                        }}>❤</span> 좋아요: {item.like}</h3>

                        작성자: {item.writer} | 작성일: {item.issueDate}

                        내용: {item.content}

                        <button onClick={() => {
                            setBoardNo(index);
                            setModal(index === boardNo ? !modal : true);
                            // setModal(!modal);
                        }} >모달</button>

                        <hr />
                    </div>
                ))}
            </div>

            {/* 
            {modal === true ?
                <div className='modal'>
                    <h3>{data[boardNo].title}</h3>
                    <p>{data[boardNo].writer} | {data[boardNo].issueDate}</p>
                    {data[boardNo].content}
                </div>
                : null}
            */}
            {modal && <Modal data={data} boardNo={boardNo} />}

        </>
    );

}

/* 모달창 */
const Modal = ({ data, boardNo }) => {
    return (
        <div className='modal'>
            <h3>{data[boardNo].title}</h3>
            <p>{data[boardNo].writer} | {data[boardNo].issueDate}</p>
            {data[boardNo].content}
        </div>
    );
};

export default BoardList;

