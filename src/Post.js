import React, { useState, useEffect } from 'react'
import "./Post.css"
import { Avatar } from "@material-ui/core"
import { db } from "./firebase"
import firebase from "firebase"
function Post(props) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState([])
    const postComment = (event) => {
        event.preventDefault()
        db.collection("posts").doc(props.postId).collection("comments").add({
            text: comment,
            username: props.user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment("")
    }

    useEffect(() => {
        let unsubscribe;
        if (props.postId) {
            unsubscribe = db
                .collection("posts")
                .doc(props.postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map(doc => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        }
    }, [props.postId])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="asperger"
                    src="/static/images/avatar/1.jpg"

                />
                <h3>{props.username}</h3>
            </div>

            <img src={props.imageUrl} alt="" className="post__image" />
            <h4 className="post__text"><strong>{props.username}:</strong> {props.caption}</h4>
            <div className="post__comments">
                {
                    comments.map((comment) => {
                        return (<p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>)
                    })
                }
            </div>
            {
                props.user && (
                    <form className="post__commentBox">
                        <input type="text"
                            className="post__input"
                            placeholder="Add your comment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                        <button
                            className="post__button"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            post
            </button>
                    </form>
                )
            }

        </div>
    )
}

export default Post
