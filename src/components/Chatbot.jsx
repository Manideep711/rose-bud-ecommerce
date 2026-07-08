import { useEffect, useRef, useState } from 'react';
import { products } from '../data/products';

async function fetchWithRetry(url, options, maxRetries = 5) {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errText}`);
      }
      return await response.json();
    } catch (error) {
      if (i === maxRetries) throw error;
      await new Promise((res) => setTimeout(res, delays[i]));
    }
  }
}

const initialMessages = [
  { role: 'model', text: "Hello! I'm your Rose Bud personal shopping assistant. How can I help you find the perfect floral arrangement today?" },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const historyRef = useRef([]); // Gemini-format history sent to the backend, excludes the canned welcome message
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setTyping(true);
    historyRef.current.push({ role: 'user', parts: [{ text }] });

    const catalogContext = products.map((p) => ({ id: p.id, name: p.name, category: p.category, color: p.color, price: p.price }));

    try {
      const payload = {
        contents: historyRef.current,
        systemInstruction: {
          parts: [{
            text: `You are 'Rose Bud Assistant', a helpful and sophisticated floral concierge for the premium boutique Rose Bud. You answer questions based heavily on our catalog.\n\nCatalog: ${JSON.stringify(catalogContext)}\n\nGuidelines:\n1. Keep answers conversational, concise (1-3 sentences) and highly professional.\n2. Do NOT use markdown. Just plain text.\n3. Mention specific product names and prices if relevant.`
          }],
        },
      };

      // Calls our own backend, which holds the Gemini API key server-side. See api/chat.js
      const result = await fetchWithRetry('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = result.text;
      setTyping(false);
      setMessages((m) => [...m, { role: 'model', text: responseText }]);
      historyRef.current.push({ role: 'model', parts: [{ text: responseText }] });
    } catch (error) {
      console.error('Chat Error:', error);
      setTyping(false);
      setMessages((m) => [...m, { role: 'model', text: 'I apologize, but I am having trouble connecting right now. Please try again shortly.' }]);
      historyRef.current.pop();
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start pointer-events-none">
      <div id="chatbot-window" className={`bg-white rounded-2xl shadow-2xl border border-brand-100 w-[calc(100vw-3rem)] sm:w-96 mb-4 overflow-hidden flex flex-col h-[450px] max-h-[60vh] ${open ? 'open' : ''}`}>
        <div className="bg-brand-950 text-white p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <i className="ph-fill ph-flower-tulip text-accent"></i>
            <h3 className="font-serif font-medium text-sm sm:text-base">Rose Bud Assistant</h3>
          </div>
          <button onClick={() => setOpen(false)} className="text-brand-300 hover:text-white transition"><i className="ph ph-x"></i></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafafa]">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} text={msg.text} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-brand-100 flex gap-2 z-10">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our products..."
            required
            className="flex-1 px-4 py-2.5 rounded-full border border-brand-200 focus:outline-none focus:border-brand-950 text-sm bg-brand-50"
          />
          <button type="submit" className="w-10 h-10 rounded-full bg-brand-950 text-white flex items-center justify-center hover:bg-brand-800 transition shrink-0">
            <i className="ph ph-paper-plane-right"></i>
          </button>
        </form>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-brand-950 text-white shadow-xl shadow-brand-950/30 flex items-center justify-center hover:bg-brand-800 hover:scale-105 transition-all pointer-events-auto group relative"
      >
        <i className="ph ph-chat-teardrop-text text-2xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
      </button>
    </div>
  );
}

function ChatBubble({ role, text }) {
  const isUser = role === 'user';
  if (isUser) {
    return (
      <div className="flex gap-3 flex-row-reverse">
        <div className="w-8 h-8 rounded-full bg-brand-950 flex items-center justify-center shrink-0 text-white">
          <i className="ph ph-user"></i>
        </div>
        <div className="bg-brand-950 text-white rounded-2xl rounded-tr-sm p-3 text-sm shadow-sm">{text}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
        <i className="ph-fill ph-robot text-brand-600"></i>
      </div>
      <div className="bg-white border border-brand-100 rounded-2xl rounded-tl-sm p-3 text-sm text-brand-800 shadow-sm max-w-[85%] leading-relaxed whitespace-pre-line">
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
        <i className="ph-fill ph-robot text-brand-600"></i>
      </div>
      <div className="bg-white border border-brand-100 rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm typing-indicator flex items-center gap-1">
        <span></span><span></span><span></span>
      </div>
    </div>
  );
}
