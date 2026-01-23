import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const [matchName, setMatchName] = useState(location.state?.matchName || 'Match');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getUserAndMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const profileResponse = await axios.get(
          'http://localhost:5005/api/users/profile',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = profileResponse.data._id;
        const userName = profileResponse.data.name;
        setCurrentUserId(userId);
        setCurrentUserName(userName);

        await fetchMessages(userId, token);
        setLoading(false);

        pollingIntervalRef.current = setInterval(() => {
          fetchMessages(userId, token);
        }, 2000);
      } catch (error) {
        console.error('Error loading chat:', error);
        setLoading(false);
      }
    };

    getUserAndMessages();

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [matchId]);

  const fetchMessages = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/messages/conversation/${matchId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const formattedMessages = response.data.map((msg) => ({
        _id: msg._id,
        sender: msg.sender._id,
        text: msg.text,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        senderName: msg.sender.name,
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || sending) return;

    setSending(true);

    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        'http://localhost:5005/api/messages/send',
        {
          recipientId: matchId,
          text: messageText,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessageText('');
      
      await fetchMessages(currentUserId, token);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin">
            <div className="h-16 w-16 border-4 border-purple-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-purple-200 font-semibold">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col h-screen overflow-hidden">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-2xl border-b border-purple-400/30 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/matches')}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{matchName}</h1>
              <p className="text-white/70 text-sm">Connected • Ready to chat</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container - Fixed overflow */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-16">
              <div className="text-7xl mb-6 animate-bounce">💕</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                Start Your Conversation!
              </h2>
              <p className="text-purple-200 text-lg mb-2">Say hello and get to know {matchName} better</p>
              <p className="text-purple-300/60 text-sm">Be respectful, genuine, and have fun 🎉</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender === currentUserId ? 'justify-end' : 'justify-start'
              } animate-slide-up`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                  msg.sender === currentUserId
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-none shadow-purple-500/50'
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-bl-none shadow-gray-700/50'
                }`}
              >
                <p className="text-base leading-relaxed break-words">{msg.text}</p>
                <p className={`text-xs mt-2 font-semibold ${
                  msg.sender === currentUserId ? 'text-white/70' : 'text-gray-400'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Premium Input Area - Fixed position */}
      <div className="bg-gradient-to-t from-black via-purple-900/50 to-transparent border-t border-purple-400/20 shadow-2xl flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={sending}
              placeholder="Type something amazing..."
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-700 text-white placeholder-gray-500 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 shadow-lg"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim() || sending}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-xl shadow-lg shadow-purple-500/50 disabled:shadow-none"
            >
              {sending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                  </svg>
                  Send
                </span>
              )}
            </button>
          </div>
          <p className="text-xs text-purple-300/60 mt-3 text-center">✨ Messages sync in real-time • Press Enter to send</p>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(168, 85, 247, 0.1);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(168, 85, 247), rgb(236, 72, 153));
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(147, 51, 234), rgb(219, 39, 119));
        }
      `}</style>
    </div>
  );
};

export default Chat;
