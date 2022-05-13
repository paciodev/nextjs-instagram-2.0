/* eslint-disable @next/next/no-img-element */
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = () => onSnapshot(query(collection(db, 'posts', id, "comments"), orderBy('timestamp', 'desc')), snapshot => { setComments(snapshot.docs) });
    return unsubscribe;
  }, [id])

  useEffect(() => {
    const unsubscribe = () => onSnapshot(query(collection(db, 'posts', id, 'likes')), snapshot => { setLikes(snapshot.docs) });
    return unsubscribe;
  }, [id])
  
  useEffect(() => {
    setHasLiked(likes.findIndex(like => like.id === session?.user?.uid ) !== -1) 
  }, [likes])

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
          username: session.user.username,
        })
    }
  }

  console.log(likes.findIndex(like => like.id === session?.user?.uid ) !== -1)

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className="flex items-center p-5">
        <img src={userImg} alt="" className="rounded-full h-12 w-12 object-contain border p-1 mr-3" />
        <p className="flex-1 font-semibold">{username}</p>
        <DotsHorizontalIcon className="postBtn h-5" />
      </div>
      
      <img src={img} alt="" className="object-cover w-full" />
      
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled className="postBtn text-red-500" onClick={likePost} />
            ) : (
              <HeartIcon onClick={likePost} className="postBtn" />
            )}
            <ChatIcon className="postBtn" />
            <PaperAirplaneIcon className="postBtn rotate-45" />
          </div>
          <BookmarkIcon className='postBtn' />
        </div>
      )}

      {/* likes */}

      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className="font-semibold mb-1">{likes.length} likes</p> 
        )}
        <span className="font-semibold mr-1">{username}</span>{caption}
      </p>

      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin'>
          {comments.map(comment => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img src={comment.data().userImage} alt="" className="h-7 rounded-full"/>
              <p className="text-sm flex-1">
                <span className='font-semibold'>{comment.data().username} </span>{comment.data().comment}
              </p>
              <Moment fromNow className='pr-5 text-xs'>
                {comment?.data()?.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border-none flex-1 focus:ring-0'
            placeholder="Add a comment..."
          />
          <button
            type='submit'
            disabled={!comment}
            className='font-semibold text-blue-500 disabled:text-gray-500'
            onClick={sendComment}
          >Post</button>
        </form>
      )}
    </div>
  );
}

export default Post;