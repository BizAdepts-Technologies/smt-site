import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
}

const mockResponses: Record<string, string> = {
  'hinge': 'For modern kitchens, our SilentClose Hinge series offers whisper-quiet closure with adjustable tension. Would you like to explore the full hinge range?',
  'drawer': 'Our Precision Drawer Systems come in multiple configurations — slim, heavy-duty, and soft-close. Which application are you planning for?',
  'kitchen': 'For modern kitchens, our drawer systems, cabinet interior systems and soft-close hinges are ideal. Would you like to explore one of these categories?',
  'sliding': 'Our SlideX Pro sliding systems support doors up to 80kg with whisper-quiet glide. Perfect for wardrobes and room dividers.',
  'default': "I'd be happy to help you find the right solution. Could you tell me more about your project — is it for a kitchen, wardrobe, office, or commercial space?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hinge')) return mockResponses.hinge;
  if (lower.includes('drawer')) return mockResponses.drawer;
  if (lower.includes('kitchen')) return mockResponses.kitchen;
  if (lower.includes('sliding') || lower.includes('door')) return mockResponses.sliding;
  return mockResponses.default;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'assistant', text: 'How can we help you find the right solution?' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), type: 'assistant', text: getResponse(input) };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white border border-warm-beige shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
        aria-label="AI Assistant"
      >
        {open ? <X className="w-5 h-5 text-charcoal" /> : <Sparkles className="w-5 h-5 text-rust" />}
        {!open && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rust rounded-full border-2 border-white" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white border border-warm-beige shadow-2xl rounded-lg overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-rust px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <div>
                <h3 className="text-white font-medium text-sm">Ask our AI Assistant</h3>
                <p className="text-white/70 text-xs">How can we help you find the right solution?</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 text-sm rounded-lg ${
                  msg.type === 'user' ? 'bg-charcoal text-white' : 'bg-warm-beige text-charcoal'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length < 3 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-warm-grey mb-2">Suggested questions</p>
              <div className="flex flex-wrap gap-2">
                {['What hinge should I use?', 'Show me drawer systems', 'Which solution for kitchens?', 'Help me find a product'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 border border-warm-beige rounded-full text-warm-grey hover:border-rust hover:text-rust transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-warm-beige">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 bg-warm-white border border-warm-beige rounded-lg text-sm focus:outline-none focus:border-rust"
              />
              <button
                onClick={sendMessage}
                className="p-2.5 bg-rust text-white rounded-lg hover:bg-rust-deep transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
