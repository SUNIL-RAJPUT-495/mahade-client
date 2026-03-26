import React, { useState, useEffect, useRef } from 'react';
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUserCircle,
  FaCheckDouble
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../common/SummerAPI';
import Axios from '../../utils/axios';

const ChatSupport = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      text: "Hello! Welcome to Mahadev Support. How can we help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const fetchChatHistory = async () => {
    try {
      const response = await Axios({
        url: `${SummaryApi.getChatHistory.url}/admin`,
        method: SummaryApi.getChatHistory.method,
      });
      if (response.data.success) {
        setMessages(response.data.data.map(m => ({
          id: m._id,
          text: m.message,
          sender: m.isMine ? 'user' : 'support',
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));
      }
    } catch (error) {
      console.log("Error fetching chat:", error);
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChatHistory()
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const res = await Axios({
        url: SummaryApi.sendMessage.url,
        method: SummaryApi.sendMessage.method,
        data: {
          message: inputText,
          receiver: "admin"
        }
      });

      if (res.data.success) {
        const newUserMsg = {
          id: res.data.data._id || messages.length + 1,
          sender: 'user',
          text: inputText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newUserMsg]);
        setInputText("");
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (

    <div className="h-screen flex flex-col bg-gray-50 font-sans">

      <div className="bg-mahadev text-white p-3 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(-1)}>
          <button className="p-1 hover:bg-white/20 rounded-full transition-colors active:scale-90">
            <FaArrowLeft className="text-lg mr-1" />
          </button>
          <FaUserCircle className="text-3xl text-gray-200" />
          <div className="leading-tight">
            <h1 className="text-base font-bold tracking-wide">MAHADEV CARE</h1>
            <p className="text-[11px] text-green-400 font-medium">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
        <div className="flex justify-center mb-2">
          <span className="bg-white border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm font-medium">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
          >
            <div
              className={`relative px-4 py-2.5 text-[15px] shadow-sm ${msg.sender === 'user'
                  ? 'bg-mahadev text-white rounded-2xl rounded-tr-sm' // Mahadev Theme Bubble
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100' // White Bubble
                }`}
            >
              <span className="break-words">{msg.text}</span>

              <div className="inline-flex items-center gap-1 ml-3 mt-1 float-right align-bottom">
                <span className={`text-[10px] pt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.time}
                </span>
                {msg.sender === 'user' && (
                  <FaCheckDouble className="text-blue-300 text-[10px] pt-1" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-2 sm:p-3 flex items-center gap-2 pb-safe shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
        <form
          onSubmit={handleSend}
          className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5 border border-transparent focus-within:border-mahadev/30 transition-all"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[15px] text-gray-800 placeholder-gray-500"
          />
        </form>


        <button
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`p-3.5 rounded-full flex items-center justify-center transition-all shadow-sm ${inputText.trim()
              ? 'bg-mahadev text-white hover:opacity-90 active:scale-95 shadow-md shadow-mahadev/30'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          <FaPaperPlane className="text-sm ml-[-2px]" />
        </button>
      </div>

    </div>
  );
};

export default ChatSupport;