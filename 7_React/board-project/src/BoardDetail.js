import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from './App';

const BoardDetail = () => {

    const { data, setData } = useContext(DataContext);
    const { boardCode } = useParams();
    const { boardNo } = useParams();

    const board = data[boardNo];

    

    const [detail, setDetail] = useState(data[boardNo] !== undefined);

    useEffect(() => {
        if (data[boardNo] !== undefined) {
            setDetail(true);
        } else {
            setDetail(false);
        }
    }, [data, boardNo]);

    if (detail === true) {
        return <Detail data={data} boardNo={boardNo} boardCode={boardCode} />;
    }
    else {
        return <div className='error-page'>게시글이 존재하지 않습니다.</div>;
    }
};

const Detail = ({ boardNo, boardCode }) => {

    const { data, setData } = useContext(DataContext);

    const navigate = useNavigate();


    if (data[boardNo] === undefined) {
        return (<div className='error-page'>게시글이 존재하지 않습니다.</div>);
    }

    return (
        <div>
            <p>참일 때 반환되는 Detail</p>
            <div>
                <h2>게시글 제목: {data[boardNo].title}</h2>
            </div>

            <div>
                <div>
                    유저이름: {data[boardNo].writer} || 좋아요: {data[boardNo].like}
                </div>
                <div>
                    작성일: {data[boardNo].issueDate} <br /> 수정일: {data[boardNo].issueDate}
                </div>
            </div>

            <div>{data[boardNo].content}</div>

            <div>
                <button onClick={ ()=>{
                    ( navigate(`/${boardCode}/detail/${boardNo}/updateBoard`) )
                }}>
                    수정
                </button>

                <button onClick={() => {


                    if (window.confirm("정말 삭제합니까?")) {

                        const newData = [...data];
                        newData.splice(boardNo, 1);
                        setData(newData);

                        navigate(`/${boardCode}`);

                    } else {

                    }


                }}>삭제</button>
                <button
                    onClick={() => {
                        navigate(`/${boardCode}`);
                    }}
                >
                    목록으로
                </button>
            </div>

            <hr />
        </div>
    );
};

export default BoardDetail;
