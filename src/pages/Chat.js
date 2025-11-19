import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components
import chatService from '../Services/ChatService';
import Container from 'react-bootstrap/Container';
import Vector from "../assets/images/Vector.png";


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
  }
};

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [suggestions, setSuggestions] = useState([]); 

  const messagesEndRef = useRef(null);
  const hasInitialized = useRef(false);
  const navigate = useNavigate();

  const generateSuggestions = (botText) => {
    const sentences = botText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [botText];
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      startChat();
      hasInitialized.current = true;
    }
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = async () => {
    try {
      setIsLoading(true);
      const response = await chatService.startChat();
      handleChatResponse(response);
    } catch (error) {
      console.error('Error starting chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatResponse = (response) => {
    if (response.redirect) {
      navigate(response.redirect);
      return;
    }

    if (response.session_id) setSessionId(response.session_id);

    if (response.state && response.state.finished === true) {
      setIsFinished(true);
      setSuggestions([]); 
    } else {
      let nextSuggestions = [];
      if (Array.isArray(response.suggestions)) {
          nextSuggestions = response.suggestions;
      } else {
          nextSuggestions = generateSuggestions(response.bot);
      }
      setSuggestions(nextSuggestions);
    }

    setMessages(prev => [...prev, { type: 'bot', content: response.bot }]);
  };

  const processSendMessage = async (messageText) => {
      if (!messageText.trim() || !sessionId) return; // Added safety check for sessionId

      setMessages(prev => [...prev, { type: 'user', content: messageText }]);
      setInputMessage('');
      setSuggestions([]); 
      setIsLoading(true);

      try {
        const response = await chatService.sendMessage(sessionId, messageText);
        handleChatResponse(response);
      } catch (error) {
        console.error('Error sending message:', error);
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
          </div>

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

          {/* Dynamic Suggestion Chips */}
          {(!isFinished && suggestions.length > 0) && (
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
            {!isFinished ? (
              <form onSubmit={handleFormSubmit} style={styles.inputWrapper}>
                  <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  placeholder="Type your message..."
                  style={styles.input}
                  />
                  <button 
                  type="submit" 
                  disabled={isLoading} 
                  style={{
                      ...styles.sendButton, 
                      opacity: isLoading || !inputMessage.trim() ? 0.7 : 1
                  }}
                  >
                  <SendIcon />
                  </button>
              </form>
            ) : (
              <button 
                  onClick={handleViewRecommendations}
                  style={styles.finishButton}
              >
                  See recommended courses
              </button>
            )}
          </div>

        </div>
      </Container>
    </PageWrapper>
  );
}

export default ChatInterface;