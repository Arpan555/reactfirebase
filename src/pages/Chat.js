import React, {useState,useEffect} from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import {chatData} from "../Redux/Actions/allActions"
import {useDispatch} from "react-redux"
let c=[];
const Chat = () => {
  const[user]=useState(auth().currentUser)
  const[chats,setChats]=useState([])
  const[content,setContent]=useState("")
  const[readError,setReadError]=useState(null)
  const[writeError,setWriteError]=useState(null)
  const[loadingChats,setLoadingChats]=useState(false)
  const dispatch = useDispatch()
  const chatRef=React.createRef()
  // c=JSON.parse(localStorage.getItem("chat"))
  // console.log(c)
  useEffect(() => {
    setLoadingChats(true)
    const chatArea = chatRef.current;
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach(snap => {
         chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        setChats(chats);
        chatArea.scrollBy(0, chatArea.scrollHeight);
        setLoadingChats(false);
      });
    } catch (error) {
      setReadError(error.message)
      setLoadingChats(false)
    }
  }, [])
 const handleChange=(event)=> {
      setContent(event.target.value)
      }
 const handleSubmit= async(event)=> {
        event.preventDefault();
        setWriteError(null);
        const chatArea = chatRef.current;
        try {
          await db.ref("chats").push({
            content: content,
            timestamp: Date.now(),
            uid: user.uid
          })
          dispatch(chatData({
            content: content,
            timestamp: Date.now(),
            uid: user.uid
          }))
          setContent('');
          chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
        setWriteError(error.message);
        }
      }
     const formatTime=(timestamp)=> {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
      }
      console.log(chats)
  return (
    <div>
    <Header />
    <div className="chat-area" ref={chatRef}>
      {loadingChats ? <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div> : ""}
      {chats.map(ch => {
        return <p key={ch.timestamp} className={"chat-bubble " + (user.uid === ch.uid ? "current-user" : "")}>
          {ch.content}
          <br />
          <span className="chat-time float-right">{formatTime(ch.timestamp)}</span>
        </p>
      })}
    </div>
    <form onSubmit={handleSubmit} className="mx-3">
      <textarea className="form-control" name="content" onChange={handleChange} value={content} required></textarea>
      <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
    </form>
    <div className="py-5 mx-3">
      Login in as: <strong className="text-info">{user.email}</strong>
    </div>
  </div>
  )
}
export default Chat

