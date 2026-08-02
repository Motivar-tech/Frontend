import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components
import chatService from '../Services/ChatService';
import { readGuestChat, writeGuestChat, clearGuestChat } from '../utils/guestChat';
import Container from 'react-bootstrap/Container';
import Vector from "../assets/images/Vector.png";
import { toast } from 'react-hot-toast';
import { FiLock, FiExternalLink } from 'react-icons/fi';


const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f0f2f5; /* Base color behind the image */
  overflow: hidden;

  /* The Background Overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-image: url(${Vector});
    background-repeat: repeat;
    opacity: 0.6;
    z-index: 0;
  }

  /* Mobile adjustment */
  // @media (max-width: 768px) {
  //   background-color: #fff;
  //   &::before {
  //     opacity: 0.1;
  //   }
  }
`;

// --- Icons ---
const RobotIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#47A78B"/>
    <path d="M12 18C12 16.8954 12.8954 16 14 16H26C27.1046 16 28 16.8954 28 18V24C28 25.1046 27.1046 26 26 26H14C12.8954 26 12 25.1046 12 24V18Z" stroke="white" strokeWidth="2"/>
    <circle cx="17" cy="20" r="1.5" fill="white"/>
    <circle cx="23" cy="20" r="1.5" fill="white"/>
    <path d="M10 20H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M28 20H30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 13V16" stroke="white" strokeWidth="2"/>
    <circle cx="20" cy="12" r="1.5" fill="white"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Styles ---
const styles = {
  container: {
    maxWidth: '768px',
    backgroundColor: '#f1fdf8',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Montserrat', sans-serif",
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.08)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    position: 'relative',
    zIndex: 1
  },
  header: {
    backgroundColor: '#fff',
    padding: '15px 20px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: '16px',
    margin: 0,
    color: '#333'
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#F8F9FA' // Inner chat bg remains light grey
  },
  messageRow: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
  },
  botRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  senderName: {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#666'
  },
  bubble: {
    padding: '14px 18px',
    fontSize: '15px',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    color: '#1a1a1a',
    borderRadius: '0px 12px 12px 12px',
    border: '1px solid #eee'
  },
  userBubble: {
    backgroundColor: '#47A78B',
    color: '#FFFFFF',
    borderRadius: '12px 12px 0px 12px',
  },
  avatarContainer: {
    display: 'flex',
    gap: '10px'
  },
  suggestionContainer: {
    display: 'flex',
    gap: '8px',
    padding: '10px 20px 15px 20px',
    flexWrap: 'wrap',
    backgroundColor: '#F8F9FA'
  },
  suggestionChip: {
    backgroundColor: '#fff',
    color: '#47A78B',
    border: '1px solid #47A78B',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(71, 167, 139, 0.1)'
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: '15px 20px',
    borderTop: '1px solid #f0f0f0'
  },
  inputWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    border: '1px solid transparent',
    transition: 'border 0.2s'
  },
  input: {
    border: 'none',
    background: 'transparent',
    flex: 1,
    padding: '12px 15px',
    outline: 'none',
    fontSize: '15px',
    color: '#333'
  },
  sendButton: {
    backgroundColor: '#47A78B',
    border: 'none',
    borderRadius: '8px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'opacity 0.2s'
  },
  finishButton: {
    width: '100%',
    backgroundColor: '#47A78B',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(71, 167, 139, 0.3)',
    transition: 'transform 0.1s'
  },
  // ── Guest-mode additions ────────────────────────────────────────────────
  headerCta: {
    marginLeft: 'auto',
    backgroundColor: '#47A78B',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  banner: {
    padding: '10px 20px',
    fontSize: '13px',
    lineHeight: 1.5,
    borderBottom: '1px solid #f0e6c8',
    backgroundColor: '#fffaf0',
    color: '#7a5c00'
  },
  previewPanel: {
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
    padding: '14px 20px',
    maxHeight: '42%',
    overflowY: 'auto'
  },
  previewTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#333',
    margin: '0 0 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  courseCard: {
    border: '1px solid #e6f2ee',
    backgroundColor: '#f9fefc',
    borderRadius: '10px',
    padding: '10px 12px',
    marginBottom: '8px'
  },
  courseTitle: {
    fontSize: '13.5px',
    fontWeight: 700,
    color: '#1a3a30',
    marginBottom: '3px'
  },
  courseDesc: {
    fontSize: '12px',
    color: '#5a6a64',
    margin: 0,
    lineHeight: 1.5
  },
  lockedCard: {
    border: '1px dashed #cfd8d4',
    borderRadius: '10px',
    padding: '10px 12px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f4f6f5',
    color: '#8a9691'
  },
  lockedBar: {
    height: '9px',
    borderRadius: '5px',
    background: 'linear-gradient(90deg, #dfe6e3, #eef2f0)',
    filter: 'blur(1.2px)'
  },
  ctaBox: {
    backgroundColor: '#f1fdf8',
    border: '1px solid #cdeee2',
    borderRadius: '10px',
    padding: '12px',
    marginTop: '4px'
  },
  ctaText: {
    fontSize: '12.5px',
    color: '#1a3a30',
    lineHeight: 1.55,
    margin: '0 0 10px'
  },
  progressTrack: {
    height: '4px',
    backgroundColor: '#e8efec',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#47A78B',
    transition: 'width 0.4s ease'
  }
};

const generateSuggestions = (botText) => {
    const sentences = String(botText || '').match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [botText];
    const questionSentence = sentences.reverse().find(s => s.includes('?'));

    if (!questionSentence) return [];

    const lowerQuestion = questionSentence.toLowerCase();

    if (/budget|cost|price|spending/.test(lowerQuestion)) {
        return ['Free', 'Low ($)', 'Medium ($$)', 'High ($$$)'];
    }
    if (/role|job|work/.test(lowerQuestion) && /education|degree|university/.test(lowerQuestion)) {
        return ['Student / No Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Working Professional'];
    }
    if (/experience|skill level|background/.test(lowerQuestion)) {
        return ['Beginner', 'Intermediate', 'Advanced'];
    }
    if (/goal|achieve|looking for/.test(lowerQuestion)) {
        return ['Find a job', 'Start a business', 'Just for fun'];
    }
    if (/hours|time|week|commit/.test(lowerQuestion)) {
        return ['1-2 hours/week', '5-10 hours/week', 'Full time'];
    }
    return [];
  };

// Server transcripts use { role, content }; the bubbles use { type, content }.
const fromTranscript = (transcript) =>
  (transcript || [])
    .filter(m => m?.content)
    .map(m => ({ type: m.role === 'user' ? 'user' : 'bot', content: m.content }));

function ChatInterface() {
  // Fixed for the lifetime of the page: signing in navigates away and remounts.
  const [isGuest] = useState(() => !localStorage.getItem('motivar-token'));

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [guestToken, setGuestToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Guest funnel state
  const [preview, setPreview] = useState(null);
  const [chatState, setChatState] = useState(null);
  const [requiresSignup, setRequiresSignup] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);
  const navigate = useNavigate();

  const goToSignup = useCallback(() => navigate('/user-auth?signup=1'), [navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Keep the guest conversation on the device: there is no server-side read
  // endpoint for a guest transcript, and re-running /guest/start on every reload
  // would burn through the per-IP session cap.
  useEffect(() => {
    if (isGuest && sessionId && guestToken) {
      writeGuestChat({ session_id: sessionId, guest_token: guestToken, messages, state: chatState, preview });
    }
  }, [isGuest, sessionId, guestToken, messages, chatState, preview]);

  const applyState = useCallback((state) => {
    if (!state) return;
    setChatState(state);
    if (state.requires_signup) setRequiresSignup(true);
    if (state.finished === true) setIsFinished(true);
  }, []);

  const handleChatResponse = useCallback((response) => {
    if (response.redirect) {
      navigate(response.redirect);
      return;
    }

    if (response.session_id) setSessionId(response.session_id);
    applyState(response.state);

    if (Object.prototype.hasOwnProperty.call(response, 'preview')) {
      setPreview(response.preview || null);
    }

    const finished = response.state?.finished === true;
    if (finished) {
      setSuggestions([]);
    } else {
      setSuggestions(
        Array.isArray(response.suggestions) ? response.suggestions : generateSuggestions(response.bot)
      );
    }

    // /chat/start now resumes: when a transcript comes back it already ends with
    // `bot` (the last assistant line), so painting both would duplicate it.
    if (Array.isArray(response.transcript) && response.transcript.length > 0) {
      setMessages(fromTranscript(response.transcript));
    } else if (response.bot) {
      setMessages(prev => [...prev, { type: 'bot', content: response.bot }]);
    }
  }, [navigate, applyState]);

  const startGuestChat = useCallback(async () => {
    const stored = readGuestChat();
    if (stored) {
      // Reuse the existing session — don't start a new one on every mount.
      setSessionId(stored.session_id);
      setGuestToken(stored.guest_token);
      setMessages(stored.messages || []);
      setPreview(stored.preview || null);
      applyState(stored.state);
      if (!stored.messages?.length) {
        setMessages([{ type: 'bot', content: "👋 Welcome back! Tell me where you left off." }]);
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await chatService.startGuestChat();
      setSessionId(response.session_id);
      setGuestToken(response.guest_token);
      writeGuestChat({ session_id: response.session_id, guest_token: response.guest_token });
      handleChatResponse(response);
    } catch (error) {
      if (error.status === 429) {
        // Shared networks (campuses, offices, mobile carriers) trip the per-IP
        // cap — show the server's message and stop, don't retry in a loop.
        setBlockedMessage(error.message);
      } else {
        toast.error('Could not start chat. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleChatResponse, applyState]);

  const startMemberChat = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await chatService.startChat();
      handleChatResponse(response);
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error(error.message || 'Could not start chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [handleChatResponse]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      if (isGuest) startGuestChat();
      else startMemberChat();
    }
    scrollToBottom();
  }, [isGuest, startGuestChat, startMemberChat]);

  const processSendMessage = async (messageText) => {
      if (!messageText.trim() || !sessionId || requiresSignup || sessionExpired) return;

      const optimisticMessage = { type: 'user', content: messageText };
      setMessages(prev => [...prev, optimisticMessage]);
      setInputMessage('');
      setSuggestions([]);
      setIsLoading(true);

      try {
        const response = isGuest
          ? await chatService.sendGuestMessage(sessionId, messageText, guestToken)
          : await chatService.sendMessage(sessionId, messageText);
        handleChatResponse(response);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => prev.filter(m => m !== optimisticMessage));
        setInputMessage(messageText);

        if (error.status === 404) {
          setSessionExpired(true);
          if (isGuest) clearGuestChat();
        } else if (error.status === 429) {
          toast.error(error.message);
        } else {
          toast.error(error.message || 'Failed to send message. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processSendMessage(inputMessage);
  };

  const handleSuggestionClick = (text) => {
      processSendMessage(text);
  };

  const handleViewRecommendations = () => {
      navigate('/recommendations');
  };

  const handleRestartGuest = async () => {
    clearGuestChat();
    setMessages([]);
    setPreview(null);
    setChatState(null);
    setRequiresSignup(false);
    setSessionExpired(false);
    setSessionId(null);
    setGuestToken(null);
    await startGuestChat();
  };

  const turnsRemaining = chatState?.turns_remaining;
  const completeness = chatState?.completeness;
  const showTurnNudge =
    isGuest && !requiresSignup && typeof turnsRemaining === 'number' && turnsRemaining > 0 && turnsRemaining <= 3;
  const lockedCount = preview?.locked_count || 0;
  const inputDisabled = isLoading || requiresSignup || sessionExpired || !!blockedMessage || !sessionId;

  return (
    /* WRAPPER ADDED HERE */
    <PageWrapper>
      <Container className="d-flex justify-content-center p-0">
        <div style={styles.container} className="w-100">

          {/* Header */}
          <div style={styles.header}>
            <RobotIcon />
            <div>
              <h5 style={styles.headerTitle}>Motivar EduBuddy</h5>
              <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <span style={{display:'block', width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#47A78B'}}></span>
                  <small style={{color:'#666', fontSize:'12px'}}>Online</small>
              </div>
            </div>
            {isGuest && (
              <button style={styles.headerCta} onClick={goToSignup}>
                Create free account
              </button>
            )}
          </div>

          {/* Completeness progress */}
          {typeof completeness === 'number' && (
            <div style={{ padding: '10px 20px 0', backgroundColor: '#F8F9FA' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginBottom: 4 }}>
                <span>Your learning profile</span>
                <span>{Math.round(completeness * 100)}% complete</span>
              </div>
              <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: `${Math.min(100, Math.round(completeness * 100))}%` }} />
              </div>
            </div>
          )}

          {/* Rate-limit / expiry banners */}
          {blockedMessage && (
            <div style={styles.banner}>{blockedMessage}</div>
          )}
          {sessionExpired && (
            <div style={styles.banner}>
              This conversation is no longer available.{' '}
              {isGuest ? (
                <button
                  onClick={handleRestartGuest}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#47A78B', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Start a new one
                </button>
              ) : (
                'Please reload the page to continue.'
              )}
            </div>
          )}
          {showTurnNudge && (
            <div style={styles.banner}>
              You have {turnsRemaining} {turnsRemaining === 1 ? 'message' : 'messages'} left as a guest.{' '}
              <button
                onClick={goToSignup}
                style={{ background: 'none', border: 'none', padding: 0, color: '#47A78B', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
              >
                Create a free account
              </button>{' '}
              to keep going and save this conversation.
            </div>
          )}

          {/* Chat Body */}
          <div style={styles.chatArea}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  ...(message.type === 'bot' ? styles.botRow : styles.userRow)
                }}
              >
                <div style={message.type === 'bot' ? styles.avatarContainer : {}}>
                  {message.type === 'bot' && (
                      <div style={{paddingTop:'20px'}}>
                          <RobotIcon />
                      </div>
                  )}
                  <div>
                      <div style={{
                          ...styles.senderName,
                          textAlign: message.type === 'bot' ? 'left' : 'right'
                      }}>
                          {message.type === 'bot' ? 'Motivar EduBuddy' : 'You'}
                      </div>
                      <div
                          style={{
                          ...styles.bubble,
                          ...(message.type === 'bot' ? styles.botBubble : styles.userBubble)
                          }}
                      >
                          {message.content}
                      </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Course teaser — the conversion moment */}
          {preview && Array.isArray(preview.courses) && preview.courses.length > 0 && (
            <div style={styles.previewPanel}>
              <p style={styles.previewTitle}>🎯 Matches we found for you so far</p>

              {preview.courses.map((course, i) => (
                <div key={course.url || `${course.title}-${i}`} style={styles.courseCard}>
                  <div style={styles.courseTitle}>{course.title}</div>
                  {course.description && (
                    <p style={styles.courseDesc}>
                      {course.description.length > 130 ? `${course.description.slice(0, 130)}...` : course.description}
                    </p>
                  )}
                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 12, color: '#47A78B', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6 }}
                    >
                      <FiExternalLink size={12} /> View course
                    </a>
                  )}
                </div>
              ))}

              {lockedCount > 0 && (
                <>
                  {Array.from({ length: Math.min(lockedCount, 3) }).map((_, i) => (
                    <div key={`locked-${i}`} style={styles.lockedCard}>
                      <FiLock size={16} />
                      <div style={{ flex: 1 }}>
                        <div style={{ ...styles.lockedBar, width: '65%', marginBottom: 6 }} />
                        <div style={{ ...styles.lockedBar, width: '90%', height: 7 }} />
                      </div>
                    </div>
                  ))}
                  <p style={{ fontSize: 12, color: '#8a9691', margin: '2px 0 10px', textAlign: 'center' }}>
                    + {lockedCount} more {lockedCount === 1 ? 'match' : 'matches'} waiting for you
                  </p>
                </>
              )}

              {isGuest && (
                <div style={styles.ctaBox}>
                  <p style={styles.ctaText}>
                    {preview.cta ||
                      'Create a free account to save this conversation, unlock your full list of matches, and track your progress.'}
                  </p>
                  <button style={{ ...styles.finishButton, padding: '11px', fontSize: '14px' }} onClick={goToSignup}>
                    Create a free account
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Suggestion Chips */}
          {(!isFinished && !requiresSignup && !sessionExpired && suggestions.length > 0) && (
              <div style={styles.suggestionContainer}>
                  {suggestions.map((s, i) => (
                      <div
                          key={i}
                          style={styles.suggestionChip}
                          onClick={() => handleSuggestionClick(s)}
                      >
                          {s}
                      </div>
                  ))}
              </div>
          )}

          {/* Footer Area */}
          <div style={styles.inputContainer}>
            {requiresSignup ? (
              <button style={styles.finishButton} onClick={goToSignup}>
                Create a free account to continue
              </button>
            ) : isFinished ? (
              <button
                  onClick={handleViewRecommendations}
                  style={styles.finishButton}
              >
                  See recommended courses
              </button>
            ) : (
              <form onSubmit={handleFormSubmit} style={styles.inputWrapper}>
                  <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={inputDisabled}
                  placeholder={sessionExpired || blockedMessage ? 'Chat unavailable' : 'Type your message...'}
                  style={styles.input}
                  />
                  <button
                  type="submit"
                  disabled={inputDisabled}
                  style={{
                      ...styles.sendButton,
                      opacity: inputDisabled || !inputMessage.trim() ? 0.7 : 1
                  }}
                  >
                  <SendIcon />
                  </button>
              </form>
            )}
          </div>

        </div>
      </Container>
    </PageWrapper>
  );
}

export default ChatInterface;
