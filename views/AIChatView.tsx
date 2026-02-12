
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Sparkles, User as UserIcon, Bot } from 'lucide-react';
import { User } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatViewProps {
  user: User;
  onClose: () => void;
}

const AIChatView: React.FC<AIChatViewProps> = ({ user, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `您好 ${user.name || '朋友'}！我是您的會員專屬助理。您可以問我關於點數、兌換或活動的問題喔！` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userText }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `你是「LINE 品牌會員中心」的專業助理。
          當前用戶資訊：姓名:${user.name}, 點數:${user.points}, 等級:${user.level}。
          系統規則：
          1. 註冊送500點。
          2. 上傳發票可得10-50點（需人工審核）。
          3. 輸入序號可得點數。
          4. 點數可兌換：星巴克(1200點)、LINE POINTS(500點)、全家購物金(1000點)。
          5. 幸運抽獎每次50點。
          請用親切、簡短的台灣繁體中文回答。`,
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || '抱歉，我現在有點忙，請稍後再試。' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: '連線發生錯誤，請檢查您的網路環境。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-slide-up">
      <header className="px-4 py-4 border-b flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <span className="font-bold">AI 會員小幫手</span>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex items-start space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#06C755] text-white' : 'bg-white border text-blue-500 shadow-sm'}`}>
                {msg.role === 'user' ? <UserIcon size={16}/> : <Bot size={16}/>}
              </div>
              <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-[#06C755] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl shadow-sm text-xs text-gray-400 animate-pulse">AI 正在思考中...</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="請輸入您的問題..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#06C755]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-[#06C755] text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-all active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AIChatView;
