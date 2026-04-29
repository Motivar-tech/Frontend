import { useState, useEffect, useRef, useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FiMessageCircle, FiX, FiSend, FiThumbsUp, FiThumbsDown, FiTrash2, FiChevronDown } from "react-icons/fi";
import MojiService from "../Services/MojiService";

const QUICK_PROMPTS = [
  { label: "Practice questions", prompt: "Generate 5 practice questions for my current course" },
  { label: "Study plan", prompt: "Create a weekly study plan for me" },
  { label: "Explain simpler", prompt: "Explain my last topic in simpler terms" },
];

const MSG_STYLE_BASE = {
  maxWidth: "82%",
  padding: "10px 14px",
  borderRadius: 16,
  fontSize: 13,
  lineHeight: 1.6,
  fontFamily: "Montserrat, sans-serif",
  wordBreak: "break-word",
  whiteSpace: "pre-wrap",
};

const userMsgStyle = {
  ...MSG_STYLE_BASE,
  background: "#00AA87",
  color: "#fff",
  borderBottomRightRadius: 4,
  alignSelf: "flex-end",
};

const assistantMsgStyle = {
  ...MSG_STYLE_BASE,
  background: "#f1fdf8",
  color: "#1a3a30",
  border: "1px solid #d0f0e8",
  borderBottomLeftRadius: 4,
  alignSelf: "flex-start",
};

export default function MojiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (open && messages.length === 0) {
      loadHistory();
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await MojiService.getHistory();
      setMessages(res.data.data.messages || []);
    } catch {
      // ignore — start fresh
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSend = async (text) => {
    const msg = (text || input).trim();
    if (!msg || sending) return;

    const userMsg = { role: "user", content: msg, flag: null };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await MojiService.sendMessage(msg);
      const reply = res.data.data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply, flag: null }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, Moji is unavailable right now. Please try again.", flag: null },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleFlag = async (idx, flag) => {
    try {
      await MojiService.flagMessage(idx, flag);
      setMessages((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, flag } : m))
      );
    } catch { /* silent */ }
  };

  const handleClearHistory = async () => {
    setClearing(true);
    try {
      await MojiService.clearHistory();
      setMessages([]);
      setShowClearConfirm(false);
    } catch { /* silent */ } finally {
      setClearing(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00AA87 0%, #007A63 100%)",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          boxShadow: "0 6px 24px rgba(0,170,135,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1050,
          transition: "transform 0.2s",
        }}
        title={open ? "Close Moji" : "Chat with Moji"}
      >
        {open ? <FiX size={26} /> : <FiMessageCircle size={26} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            width: 360,
            maxWidth: "calc(100vw - 40px)",
            height: 520,
            maxHeight: "70vh",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1049,
            overflow: "hidden",
            border: "1px solid #e0f5ef",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #00AA87 0%, #007A63 100%)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}>
                🤖
              </div>
              <div>
                <div style={{ color: "#fff", fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 14 }}>Moji</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontFamily: "Montserrat, sans-serif" }}>Your EduBuddy</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {messages.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  title="Clear history"
                  style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "#fff", padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <FiTrash2 size={14} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "#fff", padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <FiChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Clear confirm bar */}
          {showClearConfirm && (
            <div style={{ background: "#fff8e1", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ffe082", flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontFamily: "Montserrat, sans-serif", color: "#6d4c00" }}>Clear all chat history?</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleClearHistory} disabled={clearing} style={{ background: "#f44336", color: "#fff", border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                  {clearing ? "..." : "Yes"}
                </button>
                <button onClick={() => setShowClearConfirm(false)} style={{ background: "#e0e0e0", color: "#333", border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer", fontFamily: "Montserrat, sans-serif" }}>
                  No
                </button>
              </div>
            </div>
          )}

          {/* Messages area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {loadingHistory && (
              <div style={{ textAlign: "center", paddingTop: 40 }}>
                <Spinner animation="border" size="sm" style={{ color: "#00AA87" }} />
              </div>
            )}

            {!loadingHistory && messages.length === 0 && (
              <div style={{ textAlign: "center", paddingTop: 30, color: "#aaa", fontFamily: "Montserrat, sans-serif", fontSize: 13 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
                <p style={{ margin: 0, fontWeight: 600, color: "#555" }}>Hi, I'm Moji!</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaa" }}>Ask me anything about your courses or learning journey.</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={msg.role === "user" ? userMsgStyle : assistantMsgStyle}>
                  {msg.content}
                </div>
                {msg.role === "assistant" && (
                  <div style={{ display: "flex", gap: 4, marginTop: 3, paddingLeft: 4 }}>
                    <button
                      onClick={() => handleFlag(idx, "helpful")}
                      title="Helpful"
                      style={{
                        background: msg.flag === "helpful" ? "#00AA87" : "transparent",
                        border: `1px solid ${msg.flag === "helpful" ? "#00AA87" : "#ccc"}`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        cursor: "pointer",
                        color: msg.flag === "helpful" ? "#fff" : "#888",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        fontSize: 11,
                      }}
                    >
                      <FiThumbsUp size={10} />
                    </button>
                    <button
                      onClick={() => handleFlag(idx, "unhelpful")}
                      title="Not helpful"
                      style={{
                        background: msg.flag === "unhelpful" ? "#f44336" : "transparent",
                        border: `1px solid ${msg.flag === "unhelpful" ? "#f44336" : "#ccc"}`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        cursor: "pointer",
                        color: msg.flag === "unhelpful" ? "#fff" : "#888",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        fontSize: 11,
                      }}
                    >
                      <FiThumbsDown size={10} />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start" }}>
                <div style={{ ...assistantMsgStyle, padding: "10px 16px" }}>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    <span style={{ animation: "blink 1.2s infinite", animationDelay: "0s" }}>●</span>
                    <span style={{ animation: "blink 1.2s infinite", animationDelay: "0.2s" }}>●</span>
                    <span style={{ animation: "blink 1.2s infinite", animationDelay: "0.4s" }}>●</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length === 0 && !loadingHistory && (
            <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSend(q.prompt)}
                  disabled={sending}
                  style={{
                    background: "#f1fdf8",
                    border: "1px solid #00AA87",
                    borderRadius: 20,
                    padding: "4px 12px",
                    fontSize: 11,
                    color: "#00AA87",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid #e8f5f0", display: "flex", gap: 8, flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask Moji anything..."
              disabled={sending}
              style={{
                flex: 1,
                border: "1.5px solid #d0f0e8",
                borderRadius: 24,
                padding: "9px 14px",
                fontSize: 13,
                fontFamily: "Montserrat, sans-serif",
                outline: "none",
                background: "#f9fefc",
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={sending || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: input.trim() ? "#00AA87" : "#ccc",
                border: "none",
                color: "#fff",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              {sending ? <Spinner animation="border" size="sm" /> : <FiSend size={16} />}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
