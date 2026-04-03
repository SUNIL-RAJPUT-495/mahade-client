import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaUserCircle, 
  FaPaperPlane, 
  FaArrowLeft, 
  FaCheckDouble,
  FaCheckCircle,
  FaRegCommentDots
} from "react-icons/fa";
import SummaryApi from '../../common/SummerAPI';
import AxiosAdmin from '../../utils/axiosAdmin';

const AdminChatDashboard = () => {
  const messagesEndRef = useRef(null);

  // 1. DATA: Users List
  const [usersList, setUsersList] = useState([]);

  // 2. STATE: Selected User & Messages
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy Chat History for the selected user
  const [messages, setMessages] = useState([]);

  // Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchUsersList = async () => {
    try {
      const response = await AxiosAdmin({
        url: SummaryApi.getChatUsers.url,
        method: SummaryApi.getChatUsers.method,
      });
      if (response.data.success) {
        setUsersList(response.data.data.map(u => ({
          id: u._id || u.conversationId,
          name: u.name || "Unknown",
          mobile: u.mobile || u.email || "",
          lastMsg: u.lastMessage || "",
          time: u.lastChatTime ? new Date(u.lastChatTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
          unread: 0
        })));
      }
    } catch (error) {
      console.log("Error fetching users list:", error);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle User Click from Sidebar
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    // Reset unread count
    setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, unread: 0 } : u));
    
    // Fetch chat history
    try {
      const response = await AxiosAdmin({
        url: `${SummaryApi.getChatHistory.url}/${user.id}`,
        method: SummaryApi.getChatHistory.method,
      });
      if (response.data.success) {
        setMessages(response.data.data.map(m => ({
          id: m._id,
          sender: String(m.sender) === String(user.id) ? 'user' : 'admin',
          text: m.message,
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));
      }
    } catch (error) {
      console.log("Error fetching chat history:", error);
      setMessages([]);
    }
  };

  // Admin Sending a Message
  const handleSend = async(e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;

    try {
      const res = await AxiosAdmin({
        url:SummaryApi.sendMessage.url,
        method:SummaryApi.sendMessage.method,
        data:{
          message:inputText,
          receiver:selectedUser.id
        }
      });

      if (res.data.success) {
        const newMsg = {
          id: res.data.data._id || messages.length + 1,
          sender: 'admin',
          text: inputText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newMsg]);
        setInputText("");
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  // Filter users
  const filteredUsers = usersList.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (user.mobile || "").includes(searchQuery)
  );

  return (
    // Pura Component ab ek Box/Card ke andar hai jisse external layout disturb na ho
    <div className="w-full h-[calc(100vh-2rem)] min-h-[600px] flex bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
      
      {/* ================= CHAT AREA (LEFT SIDE NOW) ================= */}
      <div className={`w-full md:w-2/3 lg:w-3/4 bg-[#f8f9fa] flex flex-col relative ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm border-b border-gray-100 z-10">
              <div className="flex items-center gap-4">
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setSelectedUser(null)} 
                  className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <div className="relative">
                  <FaUserCircle className="text-4xl text-gray-300" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="leading-tight">
                  <h2 className="text-lg font-bold text-gray-800">{selectedUser.name}</h2>
                  <p className="text-xs font-medium text-gray-500">{selectedUser.mobile}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 px-4 py-2 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                <FaCheckCircle /> Close Issue
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[70%] ${
                    msg.sender === 'admin' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div 
                    className={`relative px-4 py-2.5 text-[14px] shadow-sm ${
                      msg.sender === 'admin' 
                        ? 'bg-mahadev text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                    }`}
                  >
                    <span className="break-words leading-relaxed">{msg.text}</span>
                    <div className="inline-flex items-center gap-1 ml-3 mt-1 float-right align-bottom">
                      <span className={`text-[10px] pt-1 ${msg.sender === 'admin' ? 'text-white/70' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                      {msg.sender === 'admin' && <FaCheckDouble className="text-blue-300 text-[10px] pt-1" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 p-4 flex items-center gap-3">
              <form 
                onSubmit={handleSend} 
                className="flex-1 flex items-center bg-gray-50 rounded-full px-5 py-3 border border-gray-200 focus-within:border-mahadev/50 focus-within:bg-white transition-all shadow-inner"
              >
                <input
                  type="text"
                  placeholder="Type your reply here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[15px] text-gray-800"
                />
              </form>
              <button 
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`p-4 rounded-full flex items-center justify-center transition-all ${
                  inputText.trim() 
                    ? 'bg-mahadev text-white hover:opacity-90 shadow-lg shadow-mahadev/30 active:scale-95' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane className="text-sm ml-[-2px]" />
              </button>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white p-6 rounded-full shadow-md mb-6 border border-gray-100">
              <FaRegCommentDots className="text-6xl text-mahadev/30" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">No Chat Selected</h2>
            <p className="text-gray-500 text-sm max-w-sm font-medium">
              Select a user from the right sidebar to view their messages and provide support.
            </p>
          </div>
        )}
      </div>

      {/* ================= USERS LIST (RIGHT SIDE NOW) ================= */}
      <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-l border-gray-100 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Search Bar (Clean Top Section) */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Active Chats</h2>
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-mahadev focus-within:bg-white transition-all">
            <FaSearch className="text-gray-400 mr-3 text-sm" />
            <input 
              type="text" 
              placeholder="Search by name or number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-[14px] text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {filteredUsers.length === 0 ? (
             <div className="text-center text-gray-400 text-sm mt-10">No users found.</div>
          ) : (
            filteredUsers.map((user) => (
              <div 
                key={user.id} 
                onClick={() => handleUserSelect(user)}
                className={`flex items-center gap-3 p-3 mb-1 rounded-xl cursor-pointer transition-all ${
                  selectedUser?.id === user.id 
                    ? 'bg-mahadev/5 border border-mahadev/20 shadow-sm' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <FaUserCircle className="text-[40px] text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h2 className="font-bold text-gray-800 text-[14px] truncate">{user.name}</h2>
                    <span className="text-[10px] font-medium text-gray-400">{user.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-[12px] truncate ${user.unread > 0 ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                      {user.lastMsg}
                    </p>
                    {user.unread > 0 && (
                      <span className="bg-mahadev text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminChatDashboard;