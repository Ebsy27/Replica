import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Code, 
  Eye, 
  Copy, 
  Download, 
  Play, 
  Sparkles, 
  Zap, 
  Globe,
  ArrowRight,
  Check,
  Menu,
  X,
  Plus,
  FileCode,
  Maximize2,
  RotateCcw,
  Settings
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';

// API configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Function to generate code using backend API
const generateCodeWithGroq = async (prompt) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/generate-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.code;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

// Header Component
export const Header = ({ inBuilder = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-black border-b border-gray-800 relative z-50">
      <div className="max-w-full px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AGISOL
            </span>
          </div>

          {/* Navigation - only show on homepage */}
          {!inBuilder && (
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Community
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Pricing
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Enterprise
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Learn
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                Launched
              </a>
            </nav>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-300 hover:text-white transition-colors text-sm">
              Log in
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded text-sm transition-all border border-gray-700">
              Get started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Chat Input Component (for homepage)
export const ChatInput = ({ onSubmit, isLoading = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white border border-gray-200 rounded-xl p-4 focus-within:border-purple-500 transition-colors shadow-lg">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask AGISOL to create"
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button 
                type="button"
                className="flex items-center space-x-1 text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded text-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Public</span>
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-gray-800 disabled:bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-900 transition-all disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Homepage Component
export const Homepage = () => {
  const navigate = useNavigate();

  const handleStartBuilding = (prompt) => {
    // Navigate to builder with the prompt
    navigate('/build', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900">
              Build something{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🍃 AGISOL
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Create apps and websites by chatting with AI
            </p>

            <ChatInput onSubmit={handleStartBuilding} />
          </motion.div>
        </div>
      </div>

      {/* Community Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">From the Community</h2>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            {["Popular", "Discover", "Internal Tools", "Website", "Personal", "Consumer App", "B2B App", "Prototype"].map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  index === 0 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1 text-sm">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                    <div className="absolute top-4 right-4">
                      <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                        Website
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Sample Project {index + 1}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {Math.floor(Math.random() * 5000) + 1000} Remixes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Builder Interface Component - Main interface like lovable.dev
export const BuilderInterface = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [generatedCode, setGeneratedCode] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialPrompt = location.state?.initialPrompt;
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [location.state]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setError(null);

    try {
      // Generate code using Groq API
      const code = await generateCodeWithGroq(message);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `I've created a ${message} for you. The application is fully functional with modern React components, state management, and responsive design. Check out the preview and code tabs above!`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setGeneratedCode(code);
      setCurrentProject({
        id: Date.now(),
        title: message,
        description: `Generated ${message}`,
        code: code,
        createdAt: new Date()
      });
      setActiveTab('preview');
    } catch (error) {
      console.error('Error generating code:', error);
      setError('Sorry, there was an error generating your application. Please try again.');
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, there was an error generating your application. Please try again with a different prompt.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() && !isGenerating) {
      handleSendMessage(chatInput);
      setChatInput('');
    }
  };

  const handleCopyCode = () => {
    copy(generatedCode);
  };

  const generatePreviewHTML = (code) => {
    // Create a complete HTML document with the React component
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        * { box-sizing: border-box; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${code}
        
        // Render the component
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));
    </script>
</body>
</html>`;
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <Header inBuilder={true} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Chat */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">
              {currentProject?.title || "New Project"}
            </h2>
            <p className="text-sm text-gray-400">
              Chat with AGISOL to build your app
            </p>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <form onSubmit={handleChatSubmit} className="relative">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Describe what you want to build..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 text-sm"
                rows={3}
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isGenerating}
                className="absolute bottom-2 right-2 bg-purple-600 disabled:bg-gray-600 text-white p-1.5 rounded hover:bg-purple-700 transition-all disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar */}
          <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Tabs */}
              <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm transition-colors ${
                    activeTab === 'preview' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm transition-colors ${
                    activeTab === 'code' 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded text-sm transition-colors">
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded text-sm transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm transition-colors">
                <Play className="w-4 h-4" />
                <span>Deploy</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'preview' && (
              <div className="h-full bg-white">
                {generatedCode ? (
                  <iframe
                    srcDoc={generatePreviewHTML(generatedCode)}
                    className="w-full h-full border-0"
                    title="App Preview"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation to see your app preview</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="h-full bg-[#1e1e1e] overflow-hidden">
                {generatedCode ? (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-600">
                      <div className="flex items-center space-x-2">
                        <FileCode className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">App.js</span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <SyntaxHighlighter
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          fontSize: '14px',
                          background: '#1e1e1e',
                          height: '100%'
                        }}
                        showLineNumbers
                      >
                        {generatedCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation to see generated code</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};