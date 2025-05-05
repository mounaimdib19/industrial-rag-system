import React, { useState } from 'react';
import { Send, Bot, User, Loader2, Settings, Image, Paperclip, Smile, Search, Plus, ChevronDown, MessageSquare, Grid, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

function App() {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'New Chat',
      timestamp: new Date(),
      messages: [
        {
          id: '1',
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentChat = chatHistories.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const handleNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: new Date(),
      messages: [
        {
          id: '1',
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ],
    };
    setChatHistories((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatHistories((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title: inputMessage.slice(0, 30) + '...',
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! I understand and I'm here to help. What specific information would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setChatHistories((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botResponse] }
            : chat
        )
      );
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-[#1A1A1A] transition-all duration-300 flex flex-col`}>
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-xl p-4 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistories.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full flex items-center gap-2 rounded-xl p-4 transition-colors ${
                chat.id === currentChatId ? 'bg-[#2A2A2A]' : 'hover:bg-[#2A2A2A]'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm truncate text-left">{chat.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-2 hover:bg-[#2A2A2A] rounded-xl p-4 transition-colors">
            <Grid className="w-5 h-5" />
            <span>Explore GPTs</span>
            <ExternalLink className="w-4 h-4 ml-auto" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#1A1A1A] p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-sm text-gray-400">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-gray-800 rounded-xl transition-colors">
                <Search className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-3 hover:bg-gray-800 rounded-xl transition-colors">
                <Settings className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className="flex-shrink-0">
                  {message.sender === 'user' ? (
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                      : 'bg-[#2A2A2A]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#2A2A2A] rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-6 border-t border-gray-800">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-3 hover:bg-[#2A2A2A] rounded-xl transition-colors text-gray-400 hover:text-gray-300"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-3 hover:bg-[#2A2A2A] rounded-xl transition-colors text-gray-400 hover:text-gray-300"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-3 hover:bg-[#2A2A2A] rounded-xl transition-colors text-gray-400 hover:text-gray-300"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#2A2A2A] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-100 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;