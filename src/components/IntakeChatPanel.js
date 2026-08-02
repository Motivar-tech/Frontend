import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FiSend, FiRefreshCw, FiAward, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import chatService from '../Services/ChatService';
import recService from '../Services/RecService';

const brand = {
  primary: '#59b49a',
  primaryDark: '#4aa088',
  backgroundLight: '#f1fdf8',
  backgroundWhite: '#fefcf9',
  text: '#333',
  textSub: '#555',
  greyLight: '#e9ecef',
};

const bubbleBase = {
  maxWidth: '78%',
  padding: '11px 15px',
  borderRadius: 14,
  fontSize: 13.5,
  lineHeight: 1.6,
  fontFamily: "'Poppins', sans-serif",
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const botBubble = {
  ...bubbleBase,
  background: '#fff',
  color: brand.text,
  border: `1px solid ${brand.greyLight}`,
  borderBottomLeftRadius: 4,
  alignSelf: 'flex-start',
};

const userBubble = {
  ...bubbleBase,
  background: brand.primary,
  color: '#fff',
  borderBottomRightRadius: 4,
  alignSelf: 'flex-end',
};

const fromTranscript = (transcript) =>
  (transcript || [])
    .filter((m) => m?.content)
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));

/**
 * The learner's intake conversation, rehydrated from the server on every mount.
 * The transcript is the source of truth and survives reloads and restarts, so
 * this panel can live permanently in the dashboard instead of gating it.
 */
export default function IntakeChatPanel({ onProfileChanged, initialNotice }) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [chatState, setChatState] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [expired, setExpired] = useState(false);

  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Paint history on mount. A 404 means the learner has never chatted — that is
  // an empty panel, not an error.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await chatService.getSession();
        if (cancelled) return;
        if (session) {
          setSessionId(session.session_id);
          setMessages(fromTranscript(session.transcript));
          setChatState(session.state || null);
        }
      } catch {
        if (!cancelled) toast.error('Could not load your EduBuddy conversation.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // /chat/start resumes an existing session rather than spawning a duplicate.
  const handleStart = useCallback(async () => {
    setStarting(true);
    try {
      const res = await chatService.startChat();
      if (res.redirect) {
        navigate(res.redirect);
        return;
      }
      setExpired(false);
      if (res.session_id) setSessionId(res.session_id);
      if (res.state) setChatState(res.state);
      if (Array.isArray(res.transcript) && res.transcript.length > 0) {
        setMessages(fromTranscript(res.transcript));
      } else if (res.bot) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.bot }]);
      }
    } catch (error) {
      toast.error(error.message || 'Could not start the conversation.');
    } finally {
      setStarting(false);
    }
  }, [navigate]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !sessionId || sending) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setSending(true);
    try {
      const res = await chatService.sendMessage(sessionId, text);
      if (res.bot) setMessages((prev) => [...prev, { role: 'assistant', content: res.bot }]);
      if (res.state) setChatState(res.state);
      // Intake writes onto the learner profile as it goes, but only pull the
      // dashboard again once the conversation wraps up — refetching per message
      // would churn the whole page while the learner is mid-answer.
      if (res.state?.finished) onProfileChanged?.();
    } catch (error) {
      setMessages((prev) => prev.slice(0, -1));
      setInput(text);
      if (error.status === 404) {
        setExpired(true);
        setSessionId(null);
      } else {
        toast.error(error.message || 'Could not send that message.');
      }
    } finally {
      setSending(false);
    }
  };

  const handleGetRecommendations = async () => {
    setRegenerating(true);
    try {
      const res = await recService.getRecommendations();
      if (res?.regenerated) toast.success('Fresh recommendations are ready.');
      onProfileChanged?.();
      navigate('/recommendations');
    } catch (error) {
      // The recommender needs a fuller profile than the teaser did; keep chatting.
      toast.error(error.message || 'Could not build your recommendations yet.');
    } finally {
      setRegenerating(false);
    }
  };

  const completeness = chatState?.completeness;
  const pct = typeof completeness === 'number' ? Math.min(100, Math.round(completeness * 100)) : null;

  return (
    <div
      style={{
        background: brand.backgroundWhite,
        borderRadius: 12,
        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'min(70vh, 620px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: `1px solid ${brand.greyLight}`,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: 22 }}>🤖</div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontWeight: 600, color: brand.text, fontSize: '1rem' }}>Motivar EduBuddy</div>
          <div style={{ fontSize: 12, color: brand.textSub }}>
            Answer a few questions and your recommendations sharpen up.
          </div>
        </div>
        {pct !== null && (
          <div style={{ minWidth: 150 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: brand.textSub, marginBottom: 3 }}>
              <span>Profile</span>
              <span>{pct}% complete</span>
            </div>
            <div style={{ height: 5, background: brand.greyLight, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: brand.primary, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}
      </div>

      {initialNotice && (
        <div style={{ background: brand.backgroundLight, borderBottom: `1px solid #cdeee2`, padding: '0.6rem 1.25rem', fontSize: 12.5, color: '#1a3a30' }}>
          {initialNotice}
        </div>
      )}

      {expired && (
        <div style={{ background: '#fffaf0', borderBottom: '1px solid #f0e6c8', padding: '0.6rem 1.25rem', fontSize: 12.5, color: '#7a5c00' }}>
          That conversation is no longer active.{' '}
          <button
            onClick={handleStart}
            style={{ background: 'none', border: 'none', padding: 0, color: brand.primaryDark, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
          >
            Start a new one
          </button>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 10, background: brand.backgroundLight }}>
        {loading && (
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <Spinner animation="border" size="sm" style={{ color: brand.primary }} />
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 40, color: brand.textSub }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>👋</div>
            <p style={{ fontWeight: 600, marginBottom: 4, color: brand.text }}>Let's build your learning plan</p>
            <p style={{ fontSize: 13, marginBottom: 16 }}>
              A short chat about your goals, budget and schedule is all it takes.
            </p>
            <button
              onClick={handleStart}
              disabled={starting}
              style={{
                background: brand.primary, color: '#fff', border: 'none', borderRadius: 50,
                padding: '0.6rem 1.6rem', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              {starting ? <Spinner animation="border" size="sm" /> : 'Start chatting'}
            </button>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={msg.role === 'user' ? userBubble : botBubble}>{msg.content}</div>
          </div>
        ))}

        {sending && (
          <div style={{ ...botBubble, alignSelf: 'flex-start', opacity: 0.7 }}>Typing…</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${brand.greyLight}`, padding: '0.75rem 1rem', background: brand.backgroundWhite }}>
        {messages.length > 0 && (
          <>
            {/* A finished session is rehydrated like any other, but there is
                nothing left to answer — point at the payoff instead. */}
            {chatState?.finished ? (
              <div style={{ textAlign: 'center', fontSize: 13, color: brand.textSub, paddingBottom: 4 }}>
                <FiCheckCircle size={14} style={{ color: brand.primary, marginRight: 5 }} />
                Your learning profile is complete.
              </div>
            ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={sessionId ? 'Type your answer…' : 'Start a conversation to continue'}
                disabled={sending || !sessionId}
                style={{
                  flex: 1, border: `1.5px solid ${brand.greyLight}`, borderRadius: 24,
                  padding: '0.6rem 1rem', fontSize: 13.5, outline: 'none',
                  fontFamily: "'Poppins', sans-serif", background: '#fff',
                }}
              />
              <button
                onClick={handleSend}
                disabled={sending || !input.trim() || !sessionId}
                style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0, border: 'none',
                  background: input.trim() && sessionId ? brand.primary : brand.greyLight,
                  color: '#fff', cursor: input.trim() && sessionId ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {sending ? <Spinner animation="border" size="sm" /> : <FiSend size={16} />}
              </button>
            </div>
            )}

            <button
              onClick={handleGetRecommendations}
              disabled={regenerating}
              style={{
                width: '100%', marginTop: 10, background: 'transparent', color: brand.primaryDark,
                border: `1px solid ${brand.primary}`, borderRadius: 50, padding: '0.55rem',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              {regenerating ? (
                <>
                  <Spinner animation="border" size="sm" /> Matching courses to your profile…
                </>
              ) : (
                <>
                  {chatState?.finished ? <FiAward size={14} /> : <FiRefreshCw size={14} />}
                  Build my recommendations
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
