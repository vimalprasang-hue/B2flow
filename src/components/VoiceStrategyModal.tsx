import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mic, Volume2, Sparkles, Send, Play, Pause, Loader2, Bot, User } from 'lucide-react';

export const VoiceStrategyModal: React.FC = () => {
  const { isVoiceAdvisorOpen, setIsVoiceAdvisorOpen, currentClient } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; audioBase64?: string }[]
  >([
    {
      role: 'assistant',
      text: `G'day! I'm Liam, your Senior Growth Advisor at BUILD2FLOW DIGITAL. Ask me anything about ranking your Australian trade business #1 on Google, capturing luxury builder leads, or turning your website into a high-converting customer machine. You can also listen to audio responses!`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!isVoiceAdvisorOpen) return null;

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          clientContext: {
            businessName: currentClient.businessName,
            industry: currentClient.industry,
            location: currentClient.location,
          },
        }),
      });
      const data = await res.json();
      const replyText = data.reply || 'Let us build your digital presence.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: replyText },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `At BUILD2FLOW DIGITAL, our proven 5-pillar system (Custom Website, Google 3-Pack, Lead Automation, Social Content, and High-Converting Ads) is engineered to generate a consistent flow of premium enquiries for Australian builders and trades.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const playVoiceResponse = async (text: string) => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
      return;
    }

    setIsSynthesizing(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 400),
          persona: 'male',
        }),
      });
      const data = await res.json();

      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audioRef.current = audio;
        audio.onplay = () => setIsPlayingAudio(true);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => setIsPlayingAudio(false);
        await audio.play();
      } else {
        // Fallback to browser SpeechSynthesis if API key unavailable
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Audio playback failed', err);
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 300));
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0D1420] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080D16]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#E5B94F]/20 border border-[#E5B94F]/40 flex items-center justify-center text-[#E5B94F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
                <span>BUILD2FLOW Digital Growth Advisor</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E5B94F]/20 text-[#E5B94F] font-semibold border border-[#E5B94F]/40">
                  Voice Enabled
                </span>
              </h3>
              <p className="text-[11px] text-white/50">
                Powered by Gemini 3.8 Flash & Text-to-Speech
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setIsVoiceAdvisorOpen(false);
            }}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-white text-black'
                    : 'bg-[#E5B94F] text-black shadow-md shadow-[#E5B94F]/20'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 ${
                  msg.role === 'user'
                    ? 'bg-[#E5B94F] text-black font-medium'
                    : 'bg-[#121A27] text-white/90 border border-white/10'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.role === 'assistant' && (
                  <div className="pt-1 flex items-center space-x-2">
                    <button
                      onClick={() => playVoiceResponse(msg.text)}
                      disabled={isSynthesizing}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-[#E5B94F] text-[10px] font-bold uppercase tracking-wider border border-[#E5B94F]/30 transition-colors"
                    >
                      {isSynthesizing ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Generating Voice...</span>
                        </>
                      ) : isPlayingAudio ? (
                        <>
                          <Pause className="w-3 h-3 text-[#E5B94F]" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Play Audio Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-white/50 pl-11">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5B94F]" />
              <span>Liam is analyzing market data...</span>
            </div>
          )}
        </div>

        {/* Quick query tags */}
        <div className="px-6 py-2 bg-[#080D16]/60 border-t border-white/5 flex items-center space-x-2 overflow-x-auto text-[11px] no-scrollbar">
          {[
            'How do I rank #1 in my Sydney suburb?',
            'Best marketing strategy for custom builders?',
            'How does review automation work?',
            'What should my monthly marketing budget be?',
          ].map((tag, i) => (
            <button
              key={i}
              onClick={() => {
                setInputMessage(tag);
              }}
              className="px-2.5 py-1 rounded-full bg-[#121A27] border border-white/10 text-white/60 hover:text-white hover:border-[#E5B94F]/50 whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-[#080D16] border-t border-white/10 flex items-center space-x-3"
        >
          <input
            type="text"
            placeholder="Ask anything about Australian trade growth, SEO or web design..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 rounded-xl bg-[#E5B94F] text-black hover:bg-[#d6aa3f] transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
