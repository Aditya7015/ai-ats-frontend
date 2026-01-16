// services/chatbotService.js
import axios from 'axios';

// API Configuration - Use your actual backend URL
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

console.log('Chatbot Service: Using API Base URL:', API_BASE_URL);

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Debug logging
apiClient.interceptors.request.use(config => {
  console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
  return config;
});

apiClient.interceptors.response.use(
  response => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.error(`❌ API Error: ${error.message}`, error.response?.data);
    return Promise.reject(error);
  }
);

// Test AI Endpoint (from your backend)
export const testAIConnection = async (message) => {
  try {
    const response = await apiClient.post('/ai/test-ai', {
      message: message || 'Hello, are you working?'
    });
    return response.data;
  } catch (error) {
    console.error('AI Test Error:', error);
    throw error;
  }
};

// Chat with AI
export const sendChatMessage = async (message, sessionId, context = {}) => {
  try {
    const response = await apiClient.post('/ai/chat', {
      message,
      sessionId: sessionId || generateSessionId(),
      context
    });
    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    // Return a fallback response instead of throwing
    return {
      success: false,
      response: "I'm having trouble connecting. Please check your internet connection.",
      sessionId: sessionId || 'default'
    };
  }
};

// Get chat history
export const getChatHistory = async (sessionId) => {
  try {
    const response = await apiClient.get(`/ai/history/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Get History Error:', error);
    return {
      success: true,
      messages: [],
      sessionId
    };
  }
};

// Clear chat history
export const clearChatHistory = async (sessionId) => {
  try {
    const response = await apiClient.delete(`/ai/clear/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Clear Chat Error:', error);
    throw error;
  }
};

// Health check
export const checkAIHealth = async () => {
  try {
    const response = await apiClient.get('/ai/health');
    return response.data;
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
};

// Generate session ID
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem('chatbot_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('chatbot_session_id', sessionId);
  }
  return sessionId;
};

// Quick prompts for ATS
export const quickPrompts = {
  candidate: [
    { 
      label: 'Resume Tips', 
      prompt: 'Give me 5 tips to improve my resume for a software developer role',
      icon: '📄',
      description: 'Optimize your resume'
    },
    { 
      label: 'Interview Prep', 
      prompt: 'What are common technical interview questions for React developers?',
      icon: '💼',
      description: 'Prepare for interviews'
    },
    { 
      label: 'Cover Letter', 
      prompt: 'Help me write a cover letter for a senior frontend developer position',
      icon: '✍️',
      description: 'Write compelling cover letters'
    },
    { 
      label: 'Career Advice', 
      prompt: 'How can I transition from junior to senior developer?',
      icon: '🎯',
      description: 'Career growth tips'
    }
  ],
  recruiter: [
    { 
      label: 'JD Writing', 
      prompt: 'Help me write a job description for a Full Stack Developer',
      icon: '📝',
      description: 'Create job descriptions'
    },
    { 
      label: 'Screening', 
      prompt: 'What technical questions should I ask when screening a DevOps candidate?',
      icon: '🔍',
      description: 'Candidate screening'
    },
    { 
      label: 'Salary Guide', 
      prompt: 'What is the average salary for data scientists in India?',
      icon: '💰',
      description: 'Market salary data'
    },
    { 
      label: 'Interview Tips', 
      prompt: 'Best practices for conducting technical interviews',
      icon: '🎤',
      description: 'Interview techniques'
    }
  ],
  admin: [
    { 
      label: 'ATS Analytics', 
      prompt: 'What metrics should we track in our recruitment dashboard?',
      icon: '📊',
      description: 'Dashboard metrics'
    },
    { 
      label: 'Process', 
      prompt: 'How to streamline our hiring process?',
      icon: '⚙️',
      description: 'Process optimization'
    },
    { 
      label: 'Compliance', 
      prompt: 'What are GDPR requirements for candidate data storage?',
      icon: '🛡️',
      description: 'Data compliance'
    },
    { 
      label: 'Automation', 
      prompt: 'How can AI help in resume screening?',
      icon: '🤖',
      description: 'AI automation tips'
    }
  ]
};

// Test backend connection on load
export const testBackendConnection = async () => {
  try {
    const health = await checkAIHealth();
    console.log('Backend Health:', health);
    return { connected: true, data: health };
  } catch (error) {
    console.warn('Backend not connected:', error.message);
    return { connected: false, error: error.message };
  }
};