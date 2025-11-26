import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bell, Search, Info, Trash2, ArrowLeft, MessageCircle } from 'lucide-react'; // Added MessageCircle
import { useAuth } from '../contexts/AuthContext';

const InAppChat = () => {
  const { user } = useAuth(); 
  const currentUser = user || { id: 'mock-user-id', name: 'You', avatar: 'https://via.placeholder.com/40/16a34a/ffffff?text=U' };
  const [conversations, setConversations] = useState([
    {
      id: 'chat1',
      withUser: { id: 'user2', name: 'Annapoorna Admin', phone: '919876543210', avatar: 'https://via.placeholder.com/40/f97316/ffffff?text=A' },
      messages: [
        { id: 'msg1', senderId: 'user2', text: 'Hello! Your registration is complete. Welcome to Annapoorna!', timestamp: '10:00 AM' },
        { id: 'msg2', senderId: currentUser.id, text: 'Great, thanks for the update!', timestamp: '10:01 AM' },
      ],
      lastMessage: 'Great, thanks for the update!',
      lastMessageTimestamp: '10:01 AM',
      unread: false,
    },
    {
      id: 'chat2',
      withUser: { id: 'user3', name: 'City Bakery', phone: '919876543210', avatar: 'https://via.placeholder.com/40/3b82f6/ffffff?text=CB' },
      messages: [
        { id: 'msg4', senderId: 'user3', text: 'Hi, we have an order of bread ready for pickup.', timestamp: 'Yesterday' },
      ],
      lastMessage: 'Hi, we have an order of bread ready for pickup.',
      lastMessageTimestamp: 'Yesterday',
      unread: true,
    }
  ]);

  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedConversationId]);

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;

    const newMsg = {
      id: `msg${Date.now()}`, 
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversationId
        ? {
            ...conv,
            messages: [...conv.messages, newMsg], 
            lastMessage: newMsg.text,
            lastMessageTimestamp: newMsg.timestamp,
          }
        : conv
    ));
    setNewMessage('');
  };
  const openWhatsApp = () => {
    if (selectedConversation?.withUser?.phone) {
      window.open(`https://wa.me/${selectedConversation.withUser.phone}`, '_blank');
    } else {
      alert("Phone number not available for this user.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 page-fade-in">
      
      <div className={`w-full md:w-1/3 border-r border-gray-200 bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out
                      ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <MessageSquare className="text-brand-green" /> In-App Chat
          </h2>
          <Bell className="text-gray-500 hover:text-brand-orange cursor-pointer transition-colors" size={20} />
        </div>
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversationId(conv.id)}
              className={`flex items-center p-4 border-b border-gray-100 cursor-pointer 
                          hover:bg-gray-50 transition-colors duration-200 ease-in-out
                          ${selectedConversationId === conv.id ? 'bg-brand-green/10 border-l-4 border-brand-green' : ''}
                          ${conv.unread ? 'font-semibold bg-blue-50/20' : ''}`}
            >
              <img
                src={conv.withUser.avatar}
                alt={conv.withUser.name}
                className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-gray-200"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg ${conv.unread ? 'text-brand-green' : 'text-gray-800'}`}>
                    {conv.withUser.name}
                  </h3>
                  <span className={`text-xs ${conv.unread ? 'text-brand-green' : 'text-gray-500'}`}>
                    {conv.lastMessageTimestamp}
                  </span>
                </div>
                <p className={`text-sm text-gray-600 truncate ${conv.unread ? 'font-bold' : ''}`}>
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`w-full md:w-2/3 bg-white flex flex-col transition-all duration-300 ease-in-out
                      ${selectedConversationId ? 'flex' : 'hidden md:flex'}`}>
        {!selectedConversation ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a chat to start messaging.
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <button 
                    onClick={() => setSelectedConversationId(null)} 
                    className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <img
                  src={selectedConversation.withUser.avatar}
                  alt={selectedConversation.withUser.name}
                  className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-brand-green"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedConversation.withUser.name}
                  </h3>
                  <p className="text-xs text-gray-500">Online</p> 
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={openWhatsApp}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                  title="Switch to WhatsApp"
                >
                  <MessageCircle size={20} />
                </button>
                <Info className="text-gray-500 hover:text-brand-green cursor-pointer transition-colors" size={20} />
                <Trash2 className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors" size={20} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 custom-scrollbar">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-md transition-all duration-300 ease-in-out
                               ${msg.senderId === currentUser.id
                                 ? 'bg-brand-green text-white rounded-br-none animate-slide-in-right'
                                 : 'bg-white text-gray-800 rounded-bl-none animate-slide-in-left'
                               }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.senderId === currentUser.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> 
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                />
                <button
                  type="submit"
                  className="bg-brand-orange text-white p-3 rounded-full hover:bg-opacity-90 transition-all 
                             transform active:scale-90 shadow-md shrink-0"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InAppChat;