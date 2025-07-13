import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  X
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';

// Header Component
export const Header = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      transparent ? 'bg-transparent' : 'bg-black/90 backdrop-blur-md border-b border-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AGISOL
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#templates" className="text-gray-300 hover:text-white transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              Log in
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-md"
            >
              <div className="py-4 space-y-4">
                <a href="#features" className="block text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#templates" className="block text-gray-300 hover:text-white transition-colors">
                  Templates
                </a>
                <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="#community" className="block text-gray-300 hover:text-white transition-colors">
                  Community
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <button className="text-left text-gray-300 hover:text-white transition-colors">
                    Log in
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-left">
                    Get started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// Chat Input Component
export const ChatInput = ({ onSubmit, isLoading = false }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 focus-within:border-purple-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AGISOL to create a landing page for my..."
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
              >
                <span className="text-sm">📎</span>
                <span className="text-sm">Attach</span>
              </button>
              <button 
                type="button"
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">Public</span>
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Hero Section Component
export const HeroSection = ({ onStartBuilding }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100, null],
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl lg:text-8xl font-bold mb-6">
            Build something{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AGISOL
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create apps and websites by chatting with AI. Generate complete React + Node.js applications with modern templates instantly.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <ChatInput onSubmit={onStartBuilding} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Features Section
export const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description: "Transform your ideas into fully functional web apps using advanced AI technology."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Code",
      description: "Generate complete React + Node.js applications with modern architecture."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Live Preview",
      description: "See your app come to life instantly with our interactive preview system."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Dynamic Templates",
      description: "Choose from multiple modern templates that adapt to your specific needs."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Features that{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              accelerate
            </span>{" "}
            development
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to build, preview, and deploy modern web applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all group"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Community Gallery Section
export const CommunitySection = () => {
  const projects = [
    {
      title: "AI-powered E-commerce",
      category: "Website",
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yfGVufDB8fHxibGFja3wxNzUyMzk4MjQwfDA&ixlib=rb-4.1.0&q=85",
      remixes: "5,847"
    },
    {
      title: "SaaS Dashboard",
      category: "Internal Tools",
      image: "https://images.unsplash.com/photo-1590130382404-36dcbb666a3d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxjb2RlJTIwZWRpdG9yfGVufDB8fHxibGFja3wxNzUyMzk4MjQwfDA&ixlib=rb-4.1.0&q=85",
      remixes: "3,456"
    },
    {
      title: "Portfolio Template",
      category: "Personal",
      image: "https://images.unsplash.com/photo-1592609931095-54a2168ae893?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxjb2RlJTIwZWRpdG9yfGVufDB8fHxibGFja3wxNzUyMzk4MjQwfDA&ixlib=rb-4.1.0&q=85",
      remixes: "8,912"
    },
    {
      title: "Crypto Trading Bot",
      category: "Consumer App",
      image: "https://images.unsplash.com/photo-1561883088-039e53143d73?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8YmxhY2t8MTc1MjM5ODI0Nnww&ixlib=rb-4.1.0&q=85",
      remixes: "2,198"
    },
    {
      title: "AI Chat Interface",
      category: "Prototype",
      image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8YmxhY2t8MTc1MjM5ODI0Nnww&ixlib=rb-4.1.0&q=85",
      remixes: "6,731"
    },
    {
      title: "Team Collaboration",
      category: "Website",
      image: "https://images.unsplash.com/photo-1497681883844-82b4f0a359a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwwfHx8YmxhY2t8MTc1MjM5ODI0Nnww&ixlib=rb-4.1.0&q=85",
      remixes: "4,523"
    }
  ];

  const categories = ["Popular", "Discover", "Internal Tools", "Website", "Personal", "Consumer App", "B2B App", "Prototype"];

  return (
    <section id="community" className="py-24 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            From the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg transition-all ${
                index === 0 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {project.remixes} Remixes
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AGISOL
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Create apps and websites by chatting with AI. The fastest way to build modern web applications.
            </p>
            <div className="flex space-x-4">
              <div className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors">📧</div>
              <div className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors">🐦</div>
              <div className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors">💼</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AGISOL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Homepage Component
export const Homepage = ({ onProjectCreate }) => {
  const navigate = useNavigate();

  const handleStartBuilding = (prompt) => {
    // Navigate to chat interface with the prompt
    navigate('/chat', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="bg-black text-white">
      <Header transparent />
      <HeroSection onStartBuilding={handleStartBuilding} />
      <FeaturesSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

// Chat Interface Component
export const ChatInterface = ({ onProjectCreate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm AGISOL AI. Describe your web app idea and I'll help you build it with modern templates and full-stack code.",
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    // Simulate AI response and code generation
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `I'll help you build "${content}". Let me generate a modern React application with the following features:

• Responsive design with dark theme
• Modern UI components
• Full-stack architecture
• Mobile-optimized layout

Generating your project now...`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Navigate to project view after generation
      setTimeout(() => {
        const mockProject = {
          id: Date.now(),
          title: content,
          description: "Generated React + Node.js application",
          createdAt: new Date()
        };
        
        onProjectCreate(mockProject);
        navigate(`/project/${mockProject.id}`);
        setIsGenerating(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-16 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="py-8">
          {/* Chat messages */}
          <div className="space-y-6 mb-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-6 py-4 rounded-xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-6 py-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat input */}
          <div className="sticky bottom-0 bg-black pb-8">
            <ChatInput onSubmit={handleSendMessage} isLoading={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Project View Component with Code and Preview tabs
export const ProjectView = ({ project }) => {
  const [activeTab, setActiveTab] = useState('code');
  const [copied, setCopied] = useState(false);

  const mockCode = {
    'app.js': `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="hero-section">
        <h1>Welcome to Your App</h1>
        <p>Built with AGISOL AI</p>
        <button className="cta-button">
          Get Started
        </button>
      </header>
      
      <section className="features">
        <div className="feature-card">
          <h3>Feature 1</h3>
          <p>Amazing functionality</p>
        </div>
        <div className="feature-card">
          <h3>Feature 2</h3>
          <p>More great features</p>
        </div>
      </section>
    </div>
  );
}

export default App;`,
    'app.css': `.App {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.hero-section {
  padding: 100px 20px;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.cta-button {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 50px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}`
  };

  const handleCopy = (code) => {
    copy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockPreviewContent = `
    <div style="
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      color: white;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="padding: 100px 20px;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">
          Welcome to Your App
        </h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">
          Built with AGISOL AI
        </p>
        <button style="
          background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          Get Started
        </button>
      </div>
      
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 50px;
      ">
        <div style="
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          <h3 style="margin-bottom: 1rem;">Feature 1</h3>
          <p style="opacity: 0.8;">Amazing functionality that will delight your users</p>
        </div>
        <div style="
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        ">
          <h3 style="margin-bottom: 1rem;">Feature 2</h3>
          <p style="opacity: 0.8;">More great features to enhance user experience</p>
        </div>
      </div>
    </div>
  `;

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      
      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-700 p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              {project?.title || "Your Project"}
            </h2>
            <p className="text-sm text-gray-400">
              {project?.description || "Generated project"}
            </p>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('code')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'code' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Code</span>
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>

          <div className="mt-8 space-y-2">
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors">
              <Play className="w-4 h-4" />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'code' && (
            <div className="h-full flex flex-col">
              <div className="border-b border-gray-700 bg-gray-900">
                <div className="flex">
                  {Object.keys(mockCode).map((filename) => (
                    <button
                      key={filename}
                      className="px-4 py-3 border-r border-gray-700 bg-gray-800 text-gray-300 hover:text-white transition-colors"
                    >
                      {filename}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => handleCopy(mockCode['app.js'])}
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    height: '100%',
                    fontSize: '14px',
                    background: '#1e1e1e'
                  }}
                  showLineNumbers
                >
                  {mockCode['app.js']}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full bg-white">
              <div className="border-b border-gray-700 bg-gray-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">localhost:3000</span>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
              </div>
              
              <iframe
                srcDoc={mockPreviewContent}
                className="w-full h-full border-0"
                title="Preview"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};