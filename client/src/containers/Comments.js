import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
// components
import AddComment from '../components/AddComment';
import Comment from '../components/Comment';
import { Helmet } from 'react-helmet';
// API
import API from '../API/API';
// context
import AppContext from '../store/AppContext';
export default function Comments() {
    const { questionId } = useParams();
    const { jwt, comments, setComments } = useContext(AppContext);
    useEffect(() => {
        if (jwt) getComments(questionId, jwt);
        // eslint-disable-next-line
    }, [jwt, questionId]);
    const getComments = async (questionId, jwt) => {
        try {
            const response = await API.getComment(questionId, jwt);
            setComments(response.data.comments);
        } catch (err) {
            console.log(err);
        }
    }

    const commentList = Array.isArray(comments) && comments.length > 0 ?
        (comments.map(item => (
            <Comment item={item} key={item._id} questionId={questionId} />
        )).reverse()) : (
            <h3 className="text-muted text-center">Be the first to comment</h3>
        )
    return (
        <div>
            <Helmet><title>QuestAnon | Comments</title></Helmet>
            <AddComment />
            {commentList}
        </div>
    )
}
