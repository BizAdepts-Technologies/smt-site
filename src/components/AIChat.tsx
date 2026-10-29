import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, ArrowUpRight, MessageCircle, Bot, Minus, MapPin, Layers, Key, ShieldCheck, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface MatchedProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  category_slug?: string;
  image?: string;
  url: string;
  description?: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  products?: MatchedProduct[];
  isStreaming?: boolean;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      text: 'Hello! I am the **SMT Furniture Solutions AI Specialist**. Ask me about our authorized Hettich hardware, aluminium profiles, smart locks, or branch locations in Oman.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStreamingId, setActiveStreamingId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullTextRef = useRef<string>('');
  const streamTimerRef = useRef<any>(null);

  const [suggestions, setSuggestions] = useState<string[]>([
    'Explore Aluminium Profiles',
    'Show Hettich Door Handles',
    'Kitchen Storage Pullouts',
    'Where is your warehouse in Muscat?'
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when messages or streaming text changes
  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, open, loading, displayedText]);

  // Auto-focus input box when widget is opened
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Keep input focused when loading ends
  useEffect(() => {
    if (!loading && open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [loading, open]);

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  const startTypewriterEffect = (messageId: string, fullText: string) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    setActiveStreamingId(messageId);
    fullTextRef.current = fullText;
    setDisplayedText('');

    const words = fullText.split(' ');
    let currentIndex = 0;

    streamTimerRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        currentIndex += 1;
        setDisplayedText(words.slice(0, currentIndex).join(' '));
      } else {
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
        setActiveStreamingId(null);
        setDisplayedText('');
      }
    }, 28);
  };

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    // Finish any ongoing stream instantly
    if (activeStreamingId && streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      setActiveStreamingId(null);
      setDisplayedText('');
    }

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Keep input active and focused immediately after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 20);

    try {
      const history = messages.slice(-4).map((m) => ({
        role: m.type === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await axios.post('http://localhost:8000/api/chat/', {
        message: query,
        history,
      });

      const data = res.data;
      const assistantId = (Date.now() + 1).toString();
      const rawAnswer = data.answer || "I'd be glad to assist you with our product catalog.";

      const assistantMsg: Message = {
        id: assistantId,
        type: 'assistant',
        text: rawAnswer,
        products: data.matched_products || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
      startTypewriterEffect(assistantId, rawAnswer);

      if (data.suggested_questions && data.suggested_questions.length > 0) {
        setSuggestions(data.suggested_questions);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: 'I am temporarily unable to reach the SMT knowledge base. Please contact our Muscat sales team directly at **+968 2412 3456**.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  // Enhanced text formatter with clean bullet points and bold syntax
  const renderFormattedText = (text: string, isStreamingActive = false) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1">
        {lines.map((line, idx) => {
          const isBullet = /^(\*|•|-)\s+/.test(line);
          const cleanLine = line.replace(/^(\*|•|-)\s+/, '');

          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
          const formattedParts = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-charcoal">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-0.5">
                <span className="text-rust text-xs font-bold leading-none mt-1">●</span>
                <span className="flex-1">{formattedParts}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="min-h-[1.2em]">
              {formattedParts}
              {isStreamingActive && idx === lines.length - 1 && (
                <span className="inline-block w-1.5 h-3.5 bg-rust ml-1 animate-pulse align-middle rounded-xs" />
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Launcher Button (visible when chat closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-13 h-13 sm:w-14 sm:h-14 bg-white border border-warm-beige shadow-xl rounded-full flex items-center justify-center hover:shadow-2xl hover:scale-105 transition-all group"
          aria-label="Open SMT AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-rust transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rust rounded-full border-2 border-white animate-pulse" />
          </div>
        </button>
      )}

      {/* Compact Chat Window */}
      {open && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-[360px] sm:w-[380px] max-w-[calc(100vw-24px)] bg-white border border-warm-beige shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
          style={{ height: 'min(500px, calc(100vh - 80px))' }}
        >
          {/* Header */}
          <div className="bg-charcoal px-4 py-2.5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-white font-medium text-xs tracking-wide">SMT AI Specialist</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-white/60 text-[10px]">Sahab Al Mabelah • Oman</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-warm-white/40 text-xs">
            {messages.map((msg) => {
              const isCurrentlyStreaming = activeStreamingId === msg.id;
              const textToDisplay = isCurrentlyStreaming ? displayedText : msg.text;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Text Bubble */}
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl shadow-xs leading-relaxed transition-all ${
                      msg.type === 'user'
                        ? 'bg-charcoal text-white rounded-br-xs'
                        : 'bg-white text-charcoal/90 border border-warm-beige rounded-bl-xs'
                    }`}
                  >
                    {renderFormattedText(textToDisplay, isCurrentlyStreaming)}
                  </div>

                  {/* Matched Product Cards */}
                  {!isCurrentlyStreaming && msg.products && msg.products.length > 0 && (
                    <div className="w-full mt-2 space-y-1.5 animate-fadeIn">
                      <p className="text-[10px] font-semibold text-warm-grey tracking-wider uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-rust" /> Recommended from SMT Catalog:
                      </p>
                      <div className="space-y-1.5">
                        {msg.products.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-white border border-warm-beige rounded-xl p-2 flex items-center gap-2.5 shadow-xs hover:border-rust/40 transition-all hover:scale-[1.01]"
                          >
                            {prod.image ? (
                              <img
                                src={prod.image}
                                alt={prod.title}
                                className="w-12 h-12 object-cover rounded-lg bg-warm-beige/30 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-warm-beige/40 flex items-center justify-center flex-shrink-0 text-warm-grey">
                                <Sparkles className="w-4 h-4 text-rust/50" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] text-rust font-medium uppercase tracking-wider block truncate">
                                {prod.category}
                              </span>
                              <h4 className="text-[11px] font-semibold text-charcoal truncate">
                                {prod.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Link
                                  to={prod.url}
                                  onClick={() => setOpen(false)}
                                  className="inline-flex items-center text-[10px] font-medium text-charcoal hover:text-rust transition-colors"
                                >
                                  View Specs <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                                </Link>
                                <a
                                  href={`https://wa.me/96824123456?text=${encodeURIComponent(
                                    `Hello SMT, I would like to inquire about the ${prod.title}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors ml-auto"
                                >
                                  <MessageCircle className="w-2.5 h-2.5 mr-1" /> WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Welcome Quick Category Cards */}
            {messages.length === 1 && (
              <div className="pt-1 pb-1">
                <p className="text-[10px] font-medium text-warm-grey uppercase tracking-wider mb-2">
                  Browse by category:
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Gola Profiles', query: 'Show me Hettich Gola handleless profiles', icon: Layers },
                    { label: 'Luxury Handles', query: 'Show Hettich Pro Luxury Door Handles', icon: Key },
                    { label: 'Kitchen Pullouts', query: 'Kitchen storage pullouts and larder units', icon: Sparkles },
                    { label: 'Oman Showrooms', query: 'Where is your warehouse in Muscat and branches in Oman?', icon: MapPin },
                  ].map((card, i) => {
                    const IconComp = card.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => sendMessage(card.query)}
                        className="bg-white border border-warm-beige hover:border-rust/40 rounded-xl p-2 text-left flex items-center gap-2 transition-all hover:bg-warm-white/60 group shadow-2xs"
                      >
                        <div className="w-6 h-6 rounded-md bg-warm-beige/30 flex items-center justify-center flex-shrink-0 text-rust group-hover:bg-rust group-hover:text-white transition-colors">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-medium text-charcoal truncate">
                          {card.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clean AI Thinking Indicator with no blank gap */}
            {loading && (
              <div className="flex items-center gap-2 bg-white border border-warm-beige px-3 py-2 rounded-2xl w-fit shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0 text-rust" style={{ color: '#B85C38' }} />
                <span className="text-[11px] text-charcoal font-medium">SMT AI is consulting catalog...</span>
              </div>
            )}
          </div>

          {/* Quick Pill Suggestions (no native scrollbar) */}
          {suggestions.length > 0 && messages.length > 1 && !activeStreamingId && (
            <div className="px-3 py-1.5 border-t border-warm-beige bg-white flex-shrink-0">
              <div
                className="flex items-center gap-1.5 overflow-x-auto pb-0.5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {suggestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full border border-warm-beige text-warm-grey hover:border-rust hover:text-rust transition-colors bg-warm-white/50 flex-shrink-0 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Compact Input Box with permanent auto-focus */}
          <div className="p-2.5 border-t border-warm-beige bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about products, specs, or Oman branches..."
                className="flex-1 px-3 py-2 bg-warm-white border border-warm-beige rounded-xl text-xs focus:outline-none focus:border-rust transition-colors"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="p-2 bg-rust text-white rounded-xl hover:bg-rust-deep transition-all disabled:opacity-40 disabled:hover:bg-rust flex-shrink-0"
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
