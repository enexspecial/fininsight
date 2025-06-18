'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // TODO: Implement LangChain integration
      const mockResponse = `Based on your query about "${query}", here's my financial analysis:

📊 **Market Analysis**: The current market conditions show...
📈 **Trends**: Key trends indicate...
💡 **Recommendations**: I recommend considering...

This analysis is powered by LangChain and AI models.`;
      
      setTimeout(() => {
        setResponse(mockResponse);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">FinInsight AI</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your intelligent financial companion powered by LangChain and AI
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Market Analysis</h3>
            <p className="text-gray-300">Get real-time market insights and trend analysis</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <BarChart3 className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Data Visualization</h3>
            <p className="text-gray-300">Interactive charts and financial data visualization</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Insights</h3>
            <p className="text-gray-300">Powered by advanced AI models and LangChain</p>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about market trends, stock analysis, or financial insights..."
                  className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  Ask
                </button>
              </div>
            </form>

            {/* Response Area */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3 text-purple-400">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span>Analyzing your query...</span>
                </div>
              </div>
            )}

            {response && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-lg p-6 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium">AI Response</span>
                </div>
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {response}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-gray-400"
        >
          <p>Powered by LangChain, Next.js, and AI</p>
        </motion.div>
      </div>
    </div>
  );
} 