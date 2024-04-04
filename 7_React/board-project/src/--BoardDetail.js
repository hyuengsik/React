import React, { useState, useContext, useEffect } from 'react';  /* 전역번수 받기 위해선  useContext 추가*/
import { useParams, useNavigate } from 'react-router-dom'; /* 파라미터에 인덱스 번호 */
import { DataContext } from './App';  /*  './App' 에서 해당 값 import */

const BoardDetail = () => {

    const { data, setData } = useContext(DataContext);

    const { boardCode } = useParams();
    const { boardNo } = useParams();

    const board = data[boardNo]; /* 인덱스번호에 해당한는 요소 얻기 */

    // console.log(board);

    const navigate = useNavigate(); /* 페이지 이동 */

    const [detail, setDetail] = useState(data[boardNo] !== "");

    useEffect(() => {
        // 게시글이 존재하는 경우에만 detail을 true로 업데이트
        if (data[boardNo] !== "") {
            setDetail(true);
        } else {
            console.log(4321);
            setDetail(false);
        }
    }, [data, boardNo]);

    return (
        <>
            {/* 게시글이 존재하지 않는 경우 보여지지 않고 
                존재하는 게시글 번호일 떄만 상세화면 보여주기
            */}

            {detail === true ? <Detail data={data} boardNo={boardNo} boardCode={boardCode} /> : (navigate(`/${boardCode}`)) }

            {/*             

            <div>
                <div>
                    <h2>게시글 제목  : {board.title} </h2>
                </div>

                <div>
                    <div>
                        유저이름  : {board.writer}   || 좋아요 : {board.like}
                    </div>
                    <div>
                        작성일 :  {board.issueDate} \n 수정일  : {board.issueDate}
                    </div>
                </div>

                <div>
                    {board.content}
                </div>

                <div>
                    <button>수정</button>
                    <button>삭제</button>
                    <button onClick={() => {
                        (navigate(`/${boardCode}`))
                    }}>목록으로</button>
                </div>
            </div>

             */}

        </>
    );
}


/* 참일 때 반환되는 Detail */
const Detail = ({ data, boardNo, boardCode }) => {

    const navigate = useNavigate(); /* 페이지 이동 */

    return (

        <div>
            <p>참일 때 반환되는 Detail</p>
            <div>
                <h2>게시글 제목  : {data[boardNo].title} </h2>
            </div>

            <div>
                <div>
                    유저이름  : {data[boardNo].writer}   || 좋아요 : {data[boardNo].like}
                </div>
                <div>
                    작성일 :  {data[boardNo].issueDate} \n 수정일  : {data[boardNo].issueDate}
                </div>
            </div>

            <div>
                {data[boardNo].content}
            </div>

            <div>
                <button>수정</button>
                <button>삭제</button>
                <button onClick={() => {
                    (navigate(`/${boardCode}`))
                }}>목록으로</button>
            </div>

            <hr />
        </div>
    );
};




export default BoardDetail;