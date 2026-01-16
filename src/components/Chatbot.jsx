// components/Chatbot.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  sendChatMessage, 
  getChatHistory, 
  getSessionId,
  quickPrompts,
  testBackendConnection,
  testAIConnection
} from '../services/chatbotService';
import { 
  MessageSquare, 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  Loader2, 
  Trash2,
  User,
  Bot,
  ChevronRight,
  Settings,
  Volume2,
  Download
} from 'lucide-react';

const Chatbot = ({ userId, userRole = 'candidate', position = 'bottom-right' }) => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Refs
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize on mount
  useEffect(() => {
    console.log('Chatbot Component Mounted');
    
    // Test backend connection
    testBackendConnection().then(result => {
      setBackendStatus(result.connected ? 'connected' : 'disconnected');
      
      if (result.connected) {
        // Test AI with a simple message
        testAIConnection('Hello').then(testResult => {
          console.log('AI Test Result:', testResult);
        });
      }
    });

    // Check for existing session
    const sid = getSessionId();
    setSessionId(sid);
    console.log('Session ID:', sid);
  }, []);

  // Load chat history when opening
  useEffect(() => {
    if (isOpen && sessionId) {
      loadChatHistory();
    }
  }, [isOpen, sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  // Track unread messages
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [isOpen, messages]);

  // Functions
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const loadChatHistory = async () => {
    try {
      const history = await getChatHistory(sessionId);
      if (history.success && history.messages.length > 0) {
        setMessages(history.messages);
        setShowWelcome(false);
      } else {
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: getWelcomeMessage(),
          timestamp: new Date().toISOString()
        }]);
        setShowWelcome(true);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString()
      }]);
      setShowWelcome(true);
    }
  };

  const getWelcomeMessage = () => {
    const roleMessages = {
      candidate: `👋 Hello! I'm CareerBot, your AI assistant for the ATS-AI Job Portal. I can help you with:\n• Resume optimization tips\n• Interview preparation\n• Cover letter writing\n• Job search strategies\n• Career advice\n\nHow can I assist you today?`,
      recruiter: `👋 Hello Recruiter! I'm CareerBot, your AI hiring assistant. I can help you with:\n• Job description writing\n• Candidate screening questions\n• Interview techniques\n• Salary benchmarks\n• Hiring process optimization\n\nWhat do you need help with?`,
      admin: `👋 Hello Admin! I'm CareerBot, your ATS management assistant. I can help you with:\n• Recruitment analytics\n• Process optimization\n• Compliance guidelines\n• Team collaboration tips\n• System improvements\n\nHow can I assist you today?`
    };
    return roleMessages[userRole] || roleMessages.candidate;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setShowWelcome(false);

    try {
      const response = await sendChatMessage(userMessage, sessionId, {
        role: userRole,
        userId: userId || 'guest'
      });

      const aiMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an issue. Please try again in a moment.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
  };

  const handleClearChat = async () => {
    if (window.confirm('Clear all chat messages?')) {
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString()
      }]);
      setShowWelcome(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const exportConversation = () => {
    const conversation = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'CareerBot'}: ${msg.content}\n`
    ).join('\n');
    
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careerbot-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get quick prompts for current user role
  const currentQuickPrompts = quickPrompts[userRole] || quickPrompts.candidate;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group`}
        aria-label="Open chatbot"
      >
        <MessageSquare size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
        <div className="absolute -top-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          CareerBot AI Assistant
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed ${positionClasses[position]} z-50`}>
          <div className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-150'
          }`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-linear-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">CareerBot AI</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      backendStatus === 'connected' ? 'bg-green-400' : 
                      backendStatus === 'checking' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <p className="text-xs opacity-80">
                      {backendStatus === 'connected' ? 'Connected' : 
                       backendStatus === 'checking' ? 'Checking...' : 'Disconnected'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={exportConversation}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Export conversation"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={handleClearChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={toggleMinimize}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 p-4 overflow-y-auto bg-linear-to-b from-gray-50 to-white"
                >
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      >
                        <div className={`flex max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          {/* Avatar */}
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow ${
                            message.role === 'user' 
                              ? 'ml-2 bg-linear-to-r from-blue-500 to-blue-600 text-white' 
                              : 'mr-2 bg-linear-to-r from-purple-500 to-purple-600 text-white'
                          }`}>
                            {message.role === 'user' ? (
                              <User size={16} />
                            ) : (
                              <Bot size={16} />
                            )}
                          </div>
                          
                          {/* Message Bubble */}
                          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                            message.role === 'user'
                              ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                              : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <p className={`text-xs mt-2 font-medium ${
                              message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Loading Indicator */}
                    {isLoading && (
                      <div className="flex justify-start animate-fadeIn">
                        <div className="flex max-w-[85%]">
                          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-linear-to-r from-purple-500 to-purple-600 text-white shadow">
                            <Bot size={16} />
                          </div>
                          <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 border border-gray-100 shadow-sm">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Prompts - Show only on welcome */}
                  {showWelcome && (
                    <div className="mt-6 pt-4 border-t border-gray-200 animate-slideUp">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Quick Start
                      </h4>
                      <div className="space-y-2">
                        {currentQuickPrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickPrompt(prompt.prompt)}
                            className="w-full text-left p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:shadow-sm group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{prompt.icon}</span>
                              <div>
                                <div className="font-medium text-gray-800 group-hover:text-blue-600">
                                  {prompt.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {prompt.description}
                                </div>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 bg-white p-4">
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1 relative">
                        <textarea
                          ref={textareaRef}
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={`Ask CareerBot about ${userRole === 'candidate' ? 'resumes, interviews, jobs...' : userRole === 'recruiter' ? 'candidates, hiring, job descriptions...' : 'ATS, analytics, compliance...'}`}
                          className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm placeholder-gray-500 transition-all"
                          rows="1"
                          disabled={isLoading}
                        />
                        {inputMessage && (
                          <button
                            type="button"
                            onClick={() => setInputMessage('')}
                            className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 p-1"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={!inputMessage.trim() || isLoading}
                        className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow"
                      >
                        {isLoading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Send size={20} />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div>
                        <span className="inline-flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          CareerBot Assistant
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="hidden sm:inline">
                          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">Enter</kbd> to send
                        </span>
                        <span>
                          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">Shift</kbd> + 
                          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded ml-1">Enter</kbd> new line
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;