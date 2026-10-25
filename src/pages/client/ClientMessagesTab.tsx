import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, User, Bot, CheckCheck, Clock, Sparkles } from 'lucide-react';

export const ClientMessagesTab: React.FC = () => {
  const { messages, sendMessage, currentClient } = useApp();
  const [inputText, setInputText] = useState('');

  const clientMessages = messages.filter(
    (m) => m.clientId === currentClient.id || !m.clientId
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim(), 'client');
    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            AGENCY HOTLINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Agency Communication
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Direct communication with Liam Hemsworth and the BUILD2FLOW DIGITAL strategy department.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Strategist Online (Sydney AEST)</span>
        </div>
      </div>

      {/* Chat container */}
      <div className="rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col h-[550px] shadow-2xl overflow-hidden">
        {/* Messages thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {clientMessages.map((msg) => {
            const isMe = msg.sender === 'client';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isMe ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isMe
                      ? 'bg-white text-black'
                      : 'bg-[#E5B94F] text-black shadow-md shadow-[#E5B94F]/20'
                  }`}
                >
                  {isMe ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[75%] rounded-2xl p-4 text-xs space-y-1.5 ${
                    isMe
                      ? 'bg-[#E5B94F] text-black font-medium'
                      : 'bg-[#121A27] text-white/90 border border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70">
                    <span className="font-bold">{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-6 py-2 bg-[#080D16] border-t border-white/5 flex items-center space-x-2 overflow-x-auto text-[11px] no-scrollbar">
          {[
            'Can we add a new Before & After project to our portfolio?',
            'What is our current cost per lead on Google?',
            'I just approved the latest Instagram video.',
            'Can we target luxury home builds in Mosman next month?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(prompt)}
              className="px-2.5 py-1 rounded-full bg-[#121A27] border border-white/10 text-white/60 hover:text-white hover:border-[#E5B94F]/50 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-[#080D16] border-t border-white/10 flex items-center space-x-3"
        >
          <input
            type="text"
            placeholder="Type your message to BUILD2FLOW DIGITAL..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-xl bg-[#E5B94F] text-black hover:bg-[#d6aa3f] transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
