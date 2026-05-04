/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Buffer } from 'buffer';
import { toast } from 'react-hot-toast';
import Logo from '../assets/images/Motivar.svg';
import {
  FiUser, FiList, FiLogOut, FiAlertCircle, FiGrid, FiSearch,
  FiHeart, FiDollarSign, FiBarChart2, FiBell, FiMessageSquare,
  FiSend, FiCamera, FiEdit2, FiCheckCircle, FiClock,
  FiExternalLink, FiMapPin, FiFilter, FiAward, FiX,
} from 'react-icons/fi';
import axiosInstance from '../utils/axiosInstance';
import CompleteProfileModal from '../components/CompleteProfileModal';

// ─── Brand ────────────────────────────────────────────────────────────────────
const brand = {
  primary: '#59b49a',
  primaryDark: '#4aa088',
  bg: '#f1fdf8',
  white: '#fefcf9',
  text: '#333',
  sub: '#555',
  grey: '#e9ecef',
  greyMid: '#ced4da',
  success: '#28a745',
  warning: '#fd7e14',
  danger: '#dc3545',
};

// ─── Styled components ────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`body { background: ${brand.bg}; color: ${brand.text}; font-family: 'Poppins', sans-serif; }`;
const DashboardWrapper = styled.div`display: flex; flex-direction: column; min-height: 100vh;`;

const StyledNavbar = styled(Navbar)`
  background: ${brand.white}; box-shadow: 0 2px 4px rgba(0,0,0,0.05); padding: .8rem 0;
  .navbar-brand img { height: 35px; }
  .nav-link { color: ${brand.sub}; font-weight: 500; margin: 0 .5rem; &:hover { color: ${brand.primary}; } }
`;

const DashboardContainer = styled(Container)`flex: 1; padding-top: 2rem; padding-bottom: 4rem;`;

const TabNav = styled.div`
  display: flex; gap: .5rem; margin-bottom: 2rem;
  border-bottom: 2px solid ${brand.grey}; overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`;

const TabBtn = styled.button`
  background: none; border: none;
  border-bottom: 3px solid ${p => p.active ? brand.primary : 'transparent'};
  color: ${p => p.active ? brand.primary : brand.sub};
  font-weight: ${p => p.active ? 700 : 500};
  font-family: 'Poppins', sans-serif; font-size: .9rem;
  padding: .7rem 1.2rem; cursor: pointer; white-space: nowrap;
  display: flex; align-items: center; gap: .4rem;
  &:hover { color: ${brand.primary}; }
`;

const SectionCard = styled(Card)`
  border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,.06);
  background: ${brand.white}; overflow: hidden;
  .card-header {
    background: ${brand.white}; border-bottom: 1px solid ${brand.grey};
    font-weight: 600; font-size: 1rem; color: ${brand.text};
    display: flex; align-items: center; gap: .75rem; padding: 1rem 1.25rem;
    svg { color: ${brand.primary}; }
  }
`;

const StatCard = styled(Card)`
  border: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,.06);
  background: ${brand.white}; text-align: center; padding: 1.5rem 1rem; height: 100%;
  .val { font-size: 2rem; font-weight: 700; color: ${p => p.vc || brand.primary}; }
  .lbl { font-size: .85rem; color: ${brand.sub}; margin: 0; }
`;

const PrimaryBtn = styled(Button)`
  background: ${brand.primary}; border-color: ${brand.primary}; border-radius: 50px;
  font-weight: 500; display: inline-flex; align-items: center; gap: .4rem;
  &:hover { background: ${brand.primaryDark}; border-color: ${brand.primaryDark}; }
  &.btn-outline-primary { background: transparent; color: ${brand.primary}; border-color: ${brand.primary};
    &:hover { background: ${brand.bg}; } }
  &.btn-outline-danger { background: transparent; color: ${brand.danger}; border-color: ${brand.danger};
    &:hover { background: rgba(220,53,69,.08); } }
`;

const RequestCard = styled(Card)`
  border: none; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,.07);
  background: ${brand.white}; height: 100%; cursor: pointer;
  transition: transform .2s, box-shadow .2s;
  &:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,0,0,.1); }
`;

const StyledModal = styled(Modal)`
  .modal-content { border-radius: 12px; border: none; }
  .modal-header { background: ${brand.primary}; color: #fff; border-radius: 12px 12px 0 0;
    border-bottom: none; .btn-close { filter: brightness(0) invert(1); } }
`;

const NotifDot = styled.span`
  position: absolute; top: -4px; right: -4px;
  width: 18px; height: 18px; border-radius: 50%;
  background: ${brand.danger}; color: #fff;
  font-size: 10px; display: flex; align-items: center; justify-content: center;
  font-weight: 700;
`;

const inputStyle = { borderColor: brand.primary, borderRadius: 8, fontFamily: 'Poppins, sans-serif' };

// ─── Avatar helper ────────────────────────────────────────────────────────────
const avatarSrc = (pic) => {
  if (!pic?.data) return null;
  const bytes = pic.data?.data || pic.data;
  return `data:${pic.contentType};base64,${Buffer.from(bytes).toString('base64')}`;
};

const learnerAvatarSrc = (pic) => {
  if (!pic) return null;
  if (pic.data) {
    const bytes = pic.data?.data || pic.data;
    return `data:${pic.contentType};base64,${Buffer.from(bytes).toString('base64')}`;
  }
  return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SponsorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userDetails, setUserDetails] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [funded, setFunded] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Browse requests
  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqSearch, setReqSearch] = useState('');
  const [reqPlatform, setReqPlatform] = useState('');
  const [reqMinAmt, setReqMinAmt] = useState('');
  const [reqMaxAmt, setReqMaxAmt] = useState('');
  const [reqLocation, setReqLocation] = useState('');
  const [reqPage, setReqPage] = useState(1);
  const [reqTotal, setReqTotal] = useState(0);
  const [fundingId, setFundingId] = useState(null);

  // Request detail modal
  const [selectedReq, setSelectedReq] = useState(null);
  const [showReqModal, setShowReqModal] = useState(false);

  // Messages
  const [msgThread, setMsgThread] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [msgPosting, setMsgPosting] = useState(false);
  const [msgRequestId, setMsgRequestId] = useState(null);
  const [msgLearnerName, setMsgLearnerName] = useState('');
  const [showMsgModal, setShowMsgModal] = useState(false);
  const msgBottomRef = useRef();

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

  // Profile edit
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: '', phoneNumber: '', country: '', gender: '', bio: '', location: '' });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const avatarRef = useRef();

  // Payment method edit
  const [editPayment, setEditPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ type: 'bank_transfer', label: '' });
  const [paymentSaving, setPaymentSaving] = useState(false);

  // Currency preference
  const [preferredCurrency, setPreferredCurrency] = useState('NGN');
  const [currencySaving, setCurrencySaving] = useState(false);

  // ─── Load dashboard ────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get('/sponsor/');
        const d = res.data.data;
        setUserDetails(d.userDetails);
        setAnalytics(d.analytics || {});
        setFunded(d.sponsoredRequests || []);
        setPaymentMethod(d.paymentMethod || null);
        setPreferredCurrency(d.preferredCurrency || 'NGN');
        setUnreadCount(d.unreadNotifications || 0);
        setProfileForm({
          fullName: d.userDetails?.fullName || '',
          phoneNumber: d.userDetails?.phoneNumber || '',
          country: d.userDetails?.country || '',
          gender: d.userDetails?.gender || '',
          bio: d.userDetails?.bio || '',
          location: d.userDetails?.location || '',
        });
        if (!d.userDetails?.fullName || !d.userDetails?.phoneNumber) {
          setShowProfileModal(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshKey]);

  // ─── Browse requests ───────────────────────────────────────────────────────
  const fetchRequests = useCallback(async (page = 1) => {
    setReqLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12 });
      if (reqSearch) params.append('search', reqSearch);
      if (reqPlatform) params.append('platform', reqPlatform);
      if (reqMinAmt) params.append('minAmount', reqMinAmt);
      if (reqMaxAmt) params.append('maxAmount', reqMaxAmt);
      if (reqLocation) params.append('location', reqLocation);
      const res = await axiosInstance.get(`/sponsor/requests?${params}`);
      setRequests(res.data.data.requests || []);
      setReqTotal(res.data.data.total || 0);
    } catch { toast.error('Could not load requests.'); }
    finally { setReqLoading(false); }
  }, [reqSearch, reqPlatform, reqMinAmt, reqMaxAmt, reqLocation]);

  useEffect(() => {
    if (activeTab === 'browse') fetchRequests(reqPage);
  }, [activeTab, reqPage, fetchRequests]);

  // ─── Notifications ─────────────────────────────────────────────────────────
  const fetchNotifications = async () => {
    setNotifLoading(true);
    try {
      const res = await axiosInstance.get('/sponsor/notifications');
      setNotifications(res.data.data.notifications || []);
    } catch { toast.error('Could not load notifications.'); }
    finally { setNotifLoading(false); }
  };

  useEffect(() => {
    if (activeTab === 'notifications') fetchNotifications();
  }, [activeTab]);

  // ─── Fund a request ────────────────────────────────────────────────────────
  const handleFund = async (req) => {
    setFundingId(req._id);
    try {
      await axiosInstance.post(`/sponsor/requests/${req._id}/fund`);
      toast.success(`You've funded "${req.course?.courseTitle}"! The learner has been notified.`);
      setShowReqModal(false);
      setRequests(prev => prev.filter(r => r._id !== req._id));
      setRefreshKey(k => k + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not fund this request.');
    } finally { setFundingId(null); }
  };

  // ─── Open message thread ───────────────────────────────────────────────────
  const openMessageThread = async (requestId, learnerName) => {
    setMsgRequestId(requestId);
    setMsgLearnerName(learnerName);
    setShowMsgModal(true);
    setMsgThread([]);
    setMsgLoading(true);
    try {
      const res = await axiosInstance.get(`/sponsor/messages/${requestId}`);
      setMsgThread(res.data.data.messages || []);
    } catch { toast.error('Could not load messages.'); }
    finally { setMsgLoading(false); }
  };

  useEffect(() => {
    if (showMsgModal) setTimeout(() => msgBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, [msgThread, showMsgModal]);

  const handleSendMessage = async () => {
    if (!msgInput.trim() || msgPosting) return;
    setMsgPosting(true);
    try {
      const res = await axiosInstance.post(`/sponsor/messages/${msgRequestId}`, { content: msgInput.trim() });
      setMsgThread(prev => [...prev, res.data.data.message]);
      setMsgInput('');
    } catch (err) { toast.error(err.response?.data?.message || 'Could not send message.'); }
    finally { setMsgPosting(false); }
  };

  // ─── View certificate ──────────────────────────────────────────────────────
  const handleViewCertificate = async (requestId) => {
    try {
      const token = localStorage.getItem('motivar-token');
      const res = await fetch(`${axiosInstance.defaults.baseURL}/sponsor/requests/${requestId}/certificate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { toast.error('No certificate available yet.'); return; }
      const blob = await res.blob();
      window.open(URL.createObjectURL(blob), '_blank', 'noopener,noreferrer');
    } catch { toast.error('Could not retrieve certificate.'); }
  };

  // ─── Mark notification read ────────────────────────────────────────────────
  const handleMarkRead = async (id) => {
    try {
      await axiosInstance.patch(`/sponsor/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(c => Math.max(0, c - 1));
    } catch { /* silent */ }
  };

  const handleMarkAllRead = async () => {
    try {
      await axiosInstance.patch('/sponsor/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch { toast.error('Could not mark all as read.'); }
  };

  // ─── Profile save ──────────────────────────────────────────────────────────
  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const formData = new FormData();
      Object.entries(profileForm).forEach(([k, v]) => { if (v) formData.append(k, v); });
      if (profilePicFile) formData.append('profilePicture', profilePicFile);
      await axiosInstance.patch('/user/profile/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated.');
      setEditingProfile(false);
      setProfilePicFile(null);
      setProfilePicPreview(null);
      setRefreshKey(k => k + 1);
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update profile.'); }
    finally { setProfileSaving(false); }
  };

  // ─── Payment method save ───────────────────────────────────────────────────
  const handlePaymentSave = async () => {
    if (!paymentForm.label.trim()) { toast.error('Please enter a payment method description.'); return; }
    setPaymentSaving(true);
    try {
      const res = await axiosInstance.patch('/sponsor/payment-method', paymentForm);
      setPaymentMethod(res.data.data.paymentMethod);
      setEditPayment(false);
      toast.success('Payment method saved.');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save payment method.'); }
    finally { setPaymentSaving(false); }
  };

  const handleLogout = () => {
    ['motivar-token', 'motivar-refresh-token', 'motivar-user-role', 'motivar-user-fname'].forEach(k => localStorage.removeItem(k));
    window.location.href = '/';
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Only image files are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB.'); return; }
    setProfilePicFile(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleCurrencySave = async (currency) => {
    setCurrencySaving(true);
    try {
      await axiosInstance.patch('/sponsor/preferred-currency', { preferredCurrency: currency });
      setPreferredCurrency(currency);
      toast.success('Currency preference saved.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update currency preference.');
    } finally {
      setCurrencySaving(false);
    }
  };

  const profileSrc = profilePicPreview || avatarSrc(userDetails?.profilePicture);
  const reqPages = Math.ceil(reqTotal / 12);

  // ─── Loading / error ───────────────────────────────────────────────────────
  if (loading) return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" style={{ color: brand.primary, width: '3rem', height: '3rem' }} />
      <p className="mt-3" style={{ color: brand.sub }}>Loading your dashboard...</p>
    </div>
  );

  if (error) return (
    <Container className="pt-5 text-center">
      <Alert variant="danger" className="d-inline-flex align-items-center gap-2">
        <FiAlertCircle /> {error}
      </Alert>
    </Container>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TAB RENDERERS
  // ══════════════════════════════════════════════════════════════════════════

  // ── Overview ──────────────────────────────────────────────────────────────
  const OverviewTab = () => (
    <>
      <Row className="g-3 mb-4">
        {[
          { icon: <FiHeart />, val: analytics.learnersHelped || 0, lbl: 'Learners Helped', vc: brand.primary },
          { icon: <FiDollarSign />, val: analytics.totalSpend ? `$${analytics.totalSpend.toLocaleString()}` : '—', lbl: 'Total Spend', vc: '#0d6efd' },
          { icon: <FiCheckCircle />, val: analytics.completedCount || 0, lbl: 'Courses Completed', vc: brand.success },
          { icon: <FiBarChart2 />, val: `${analytics.completionRate || 0}%`, lbl: 'Completion Rate', vc: brand.warning },
        ].map(({ icon, val, lbl, vc }) => (
          <Col md={3} sm={6} key={lbl}>
            <StatCard vc={vc}>
              <div style={{ fontSize: '1.8rem', color: vc, marginBottom: '.5rem' }}>{icon}</div>
              <p className="val">{val}</p>
              <p className="lbl">{lbl}</p>
            </StatCard>
          </Col>
        ))}
      </Row>

      {/* CTA row */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <SectionCard className="h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4 text-center">
              <FiSearch size={36} color={brand.primary} style={{ marginBottom: 12 }} />
              <h6 style={{ fontWeight: 700, color: brand.text }}>Browse Sponsorship Requests</h6>
              <p style={{ fontSize: 13, color: brand.sub, marginBottom: 16 }}>Find learners who need your support and make a lasting impact.</p>
              <PrimaryBtn onClick={() => navigate('/help-learner')}>View Requests</PrimaryBtn>
            </Card.Body>
          </SectionCard>
        </Col>
        <Col md={6}>
          <SectionCard className="h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4 text-center">
              <FiBarChart2 size={36} color={brand.primary} style={{ marginBottom: 12 }} />
              <h6 style={{ fontWeight: 700, color: brand.text }}>Impact Analytics</h6>
              <p style={{ fontSize: 13, color: brand.sub, marginBottom: 16 }}>See the full ROI breakdown and countries your funding has reached.</p>
              <PrimaryBtn onClick={() => setActiveTab('analytics')}>View Analytics</PrimaryBtn>
            </Card.Body>
          </SectionCard>
        </Col>
      </Row>

      {/* Recent funded */}
      <SectionCard>
        <Card.Header><FiList /> Recently Funded</Card.Header>
        <ListGroup variant="flush">
          {funded.length === 0 ? (
            <ListGroup.Item className="text-center text-muted p-4">You haven't funded any requests yet. Browse requests to get started!</ListGroup.Item>
          ) : funded.slice(0, 5).map(req => (
            <ListGroup.Item key={req._id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: brand.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {learnerAvatarSrc(req.learner?.userId?.profilePicture) ? (
                  <img src={learnerAvatarSrc(req.learner?.userId?.profilePicture)} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                ) : <FiUser color={brand.primary} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: brand.text }}>{req.course?.courseTitle || 'Untitled Course'}</p>
                <p style={{ margin: 0, fontSize: 12, color: brand.sub }}>{req.learner?.userId?.fullName || 'Learner'} · {req.course?.platform}</p>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <PrimaryBtn
                  size="sm"
                  variant="outline-primary"
                  onClick={() => openMessageThread(req._id, req.learner?.userId?.fullName || 'Learner')}
                >
                  <FiMessageSquare size={13} /> Message
                </PrimaryBtn>
                <PrimaryBtn size="sm" variant="outline-primary" onClick={() => handleViewCertificate(req._id)}>
                  <FiAward size={13} /> Certificate
                </PrimaryBtn>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </SectionCard>
    </>
  );

  // ── Browse Requests ────────────────────────────────────────────────────────
  const BrowseTab = () => (
    <>
      {/* Filter bar */}
      <SectionCard className="mb-4">
        <Card.Body>
          <Row className="g-2 align-items-end">
            <Col md={4}>
              <Form.Label style={{ fontSize: 12, fontWeight: 600, color: brand.sub }}>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text style={{ background: '#fff', borderColor: brand.primary }}><FiSearch color={brand.primary} /></InputGroup.Text>
                <Form.Control placeholder="Course title, platform, motivation..." value={reqSearch} onChange={e => setReqSearch(e.target.value)} style={{ borderColor: brand.primary, borderLeft: 'none' }} />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Label style={{ fontSize: 12, fontWeight: 600, color: brand.sub }}>Platform</Form.Label>
              <Form.Control placeholder="e.g. Udemy" value={reqPlatform} onChange={e => setReqPlatform(e.target.value)} style={inputStyle} />
            </Col>
            <Col md={2}>
              <Form.Label style={{ fontSize: 12, fontWeight: 600, color: brand.sub }}>Location</Form.Label>
              <Form.Control placeholder="e.g. Nigeria" value={reqLocation} onChange={e => setReqLocation(e.target.value)} style={inputStyle} />
            </Col>
            <Col md={1}>
              <Form.Label style={{ fontSize: 12, fontWeight: 600, color: brand.sub }}>Min $</Form.Label>
              <Form.Control type="number" placeholder="0" value={reqMinAmt} onChange={e => setReqMinAmt(e.target.value)} style={inputStyle} />
            </Col>
            <Col md={1}>
              <Form.Label style={{ fontSize: 12, fontWeight: 600, color: brand.sub }}>Max $</Form.Label>
              <Form.Control type="number" placeholder="∞" value={reqMaxAmt} onChange={e => setReqMaxAmt(e.target.value)} style={inputStyle} />
            </Col>
            <Col md={2}>
              <PrimaryBtn className="w-100" onClick={() => { setReqPage(1); fetchRequests(1); }} disabled={reqLoading}>
                <FiFilter size={14} /> {reqLoading ? <Spinner animation="border" size="sm" /> : 'Filter'}
              </PrimaryBtn>
            </Col>
          </Row>
        </Card.Body>
      </SectionCard>

      {reqLoading ? (
        <div className="text-center py-5"><Spinner animation="border" style={{ color: brand.primary }} /></div>
      ) : requests.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <FiSearch size={40} style={{ marginBottom: 12, opacity: .4 }} />
          <p>No requests found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: 13, color: brand.sub, marginBottom: 16 }}>{reqTotal} request{reqTotal !== 1 ? 's' : ''} found</p>
          <Row className="g-3">
            {requests.map(req => {
              const learnerPic = learnerAvatarSrc(req.learner?.userId?.profilePicture);
              return (
                <Col md={4} sm={6} key={req._id}>
                  <RequestCard onClick={() => { setSelectedReq(req); setShowReqModal(true); }}>
                    <Card.Body style={{ padding: '1.25rem' }}>
                      {/* Learner avatar + name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: brand.bg, border: `2px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                          {learnerPic ? <img src={learnerPic} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FiUser color={brand.primary} />}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: brand.text }}>{req.learner?.userId?.fullName || 'Anonymous'}</p>
                          {req.learner?.userId?.country && (
                            <p style={{ margin: 0, fontSize: 11, color: brand.sub, display: 'flex', alignItems: 'center', gap: 3 }}>
                              <FiMapPin size={10} /> {req.learner.userId.country}
                            </p>
                          )}
                        </div>
                        <Badge bg="success" style={{ marginLeft: 'auto', borderRadius: 50, fontSize: 11 }}>
                          {req.course?.priceUnit || 'USD'} {req.course?.price?.toLocaleString() || '—'}
                        </Badge>
                      </div>

                      <p style={{ fontWeight: 700, fontSize: 13, color: brand.text, marginBottom: 4 }}>{req.course?.courseTitle}</p>
                      <p style={{ fontSize: 12, color: brand.sub, marginBottom: 8 }}>{req.course?.platform} · {req.course?.duration} {req.course?.durationUnit}</p>
                      {req.motivation && (
                        <p style={{ fontSize: 12, color: brand.sub, borderLeft: `3px solid ${brand.primary}`, paddingLeft: 8, fontStyle: 'italic', margin: '0 0 12px' }}>
                          "{req.motivation.length > 80 ? req.motivation.slice(0, 80) + '…' : req.motivation}"
                        </p>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: brand.sub }}>{new Date(req.createdAt).toLocaleDateString()}</span>
                        <PrimaryBtn size="sm" onClick={e => { e.stopPropagation(); setSelectedReq(req); setShowReqModal(true); }}>
                          View Details
                        </PrimaryBtn>
                      </div>
                    </Card.Body>
                  </RequestCard>
                </Col>
              );
            })}
          </Row>

          {/* Pagination */}
          {reqPages > 1 && (
            <div className="d-flex justify-content-center gap-2 mt-4">
              <PrimaryBtn size="sm" variant="outline-primary" disabled={reqPage <= 1} onClick={() => setReqPage(p => p - 1)}>← Prev</PrimaryBtn>
              <span style={{ padding: '0.375rem 0.75rem', fontSize: 13, color: brand.sub }}>Page {reqPage} of {reqPages}</span>
              <PrimaryBtn size="sm" variant="outline-primary" disabled={reqPage >= reqPages} onClick={() => setReqPage(p => p + 1)}>Next →</PrimaryBtn>
            </div>
          )}
        </>
      )}
    </>
  );

  // ── Funded Learners ────────────────────────────────────────────────────────
  const FundedTab = () => (
    <SectionCard>
      <Card.Header><FiHeart /> Funded Learners ({funded.length})</Card.Header>
      <ListGroup variant="flush">
        {funded.length === 0 ? (
          <ListGroup.Item className="text-center text-muted p-4">No funded learners yet.</ListGroup.Item>
        ) : funded.map(req => {
          const learnerPic = learnerAvatarSrc(req.learner?.userId?.profilePicture);
          return (
            <ListGroup.Item key={req._id} style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: brand.bg, border: `2px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  {learnerPic ? <img src={learnerPic} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FiUser color={brand.primary} size={20} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: brand.text }}>{req.learner?.userId?.fullName || 'Learner'}</p>
                  <p style={{ margin: '2px 0 6px', fontSize: 12, color: brand.sub }}>{req.course?.courseTitle} · {req.course?.platform}</p>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    <Badge bg="success" style={{ borderRadius: 50, fontSize: 11 }}>Funded</Badge>
                    <Badge bg="light" text="dark" style={{ borderRadius: 50, fontSize: 11, border: '1px solid #ddd' }}>
                      {req.course?.priceUnit} {req.course?.price?.toLocaleString()}
                    </Badge>
                    {req.learner?.userId?.country && (
                      <Badge bg="light" text="dark" style={{ borderRadius: 50, fontSize: 11, border: '1px solid #ddd' }}>
                        <FiMapPin size={9} /> {req.learner.userId.country}
                      </Badge>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <PrimaryBtn
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openMessageThread(req._id, req.learner?.userId?.fullName || 'Learner')}
                  >
                    <FiMessageSquare size={13} /> Message
                  </PrimaryBtn>
                  <PrimaryBtn size="sm" variant="outline-primary" onClick={() => handleViewCertificate(req._id)}>
                    <FiAward size={13} /> Certificate
                  </PrimaryBtn>
                  {req.link && (
                    <a href={req.link} target="_blank" rel="noopener noreferrer">
                      <PrimaryBtn size="sm" variant="outline-primary" className="w-100">
                        <FiExternalLink size={13} /> Course
                      </PrimaryBtn>
                    </a>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </SectionCard>
  );

  // ── Analytics ──────────────────────────────────────────────────────────────
  const AnalyticsTab = () => {
    const [detailed, setDetailed] = useState(null);
    const [loadingDetailed, setLoadingDetailed] = useState(true);

    useEffect(() => {
      (async () => {
        setLoadingDetailed(true);
        try {
          const res = await axiosInstance.get('/sponsor/analytics');
          setDetailed(res.data.data);
        } catch { toast.error('Could not load analytics.'); }
        finally { setLoadingDetailed(false); }
      })();
    }, []);

    if (loadingDetailed) return <div className="text-center py-5"><Spinner animation="border" style={{ color: brand.primary }} /></div>;
    if (!detailed) return null;

    return (
      <>
        <Row className="g-3 mb-4">
          {[
            { lbl: 'Learners Helped', val: detailed.learnersHelped, vc: brand.primary },
            { lbl: 'Courses Completed', val: detailed.completedCount, vc: brand.success },
            { lbl: 'Completion Rate', val: `${detailed.completionRate}%`, vc: brand.warning },
            { lbl: 'Countries Reached', val: detailed.countriesReached?.length || 0, vc: '#0d6efd' },
          ].map(({ lbl, val, vc }) => (
            <Col md={3} sm={6} key={lbl}>
              <StatCard vc={vc}>
                <p className="val">{val}</p>
                <p className="lbl">{lbl}</p>
              </StatCard>
            </Col>
          ))}
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <SectionCard>
              <Card.Header>
                <FiDollarSign /> Total Investment
                <Form.Select
                  size="sm"
                  value={preferredCurrency}
                  onChange={e => handleCurrencySave(e.target.value)}
                  disabled={currencySaving}
                  style={{ marginLeft: 'auto', width: 'auto', fontSize: 12, borderColor: brand.primary, borderRadius: 6 }}
                  title="Sponsorship currency preference"
                >
                  {['NGN', 'USD', 'GBP', 'EUR', 'ZAR', 'KES', 'GHS'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Card.Header>
              <Card.Body>
                <p style={{ fontSize: 11, color: brand.sub, marginBottom: 12 }}>
                  Showing your sponsorship currency preference. Only currencies you have transacted in appear below.
                </p>
                {Object.entries(detailed.spendByCurrency || {}).length === 0 ? (
                  <p className="text-muted text-center py-3" style={{ fontSize: 13 }}>No spending data yet.</p>
                ) : Object.entries(detailed.spendByCurrency).map(([currency, amount]) => (
                  <div key={currency} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: `1px solid ${brand.grey}`, opacity: currency === preferredCurrency ? 1 : 0.5 }}>
                    <span style={{ fontWeight: 600, color: brand.text }}>
                      {currency}
                      {currency === preferredCurrency && <Badge bg="success" style={{ marginLeft: 6, borderRadius: 50, fontSize: 10 }}>Preferred</Badge>}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: brand.primary }}>{amount.toLocaleString()}</span>
                  </div>
                ))}
              </Card.Body>
            </SectionCard>
          </Col>
          <Col md={6}>
            <SectionCard>
              <Card.Header><FiMapPin /> Countries Reached</Card.Header>
              <Card.Body>
                {detailed.countriesReached?.length === 0 ? (
                  <p className="text-muted text-center py-3" style={{ fontSize: 13 }}>No data yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 8 }}>
                    {detailed.countriesReached?.map(c => (
                      <Badge key={c} bg="light" text="dark" style={{ borderRadius: 50, border: '1px solid #ddd', fontSize: 13, padding: '0.4rem 0.9rem' }}>
                        <FiMapPin size={11} /> {c}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card.Body>
            </SectionCard>
          </Col>
        </Row>
      </>
    );
  };

  // ── Notifications ──────────────────────────────────────────────────────────
  const NotificationsTab = () => (
    <SectionCard>
      <Card.Header>
        <FiBell /> Notifications
        {notifications.some(n => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: brand.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
          >
            Mark all read
          </button>
        )}
      </Card.Header>
      {notifLoading ? (
        <div className="text-center py-4"><Spinner animation="border" size="sm" style={{ color: brand.primary }} /></div>
      ) : notifications.length === 0 ? (
        <ListGroup.Item className="text-center text-muted p-4">No notifications yet.</ListGroup.Item>
      ) : (
        <ListGroup variant="flush">
          {notifications.map(n => (
            <ListGroup.Item
              key={n._id}
              onClick={() => !n.read && handleMarkRead(n._id)}
              style={{ padding: '1rem 1.25rem', background: n.read ? 'transparent' : '#f1fdf8', cursor: n.read ? 'default' : 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12 }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: n.type === 'completion' ? brand.success : brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {n.type === 'completion' ? <FiCheckCircle color="#fff" size={16} /> : <FiBell color="#fff" size={16} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13, color: brand.text }}>{n.message}</p>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: brand.sub }}>{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: brand.primary, flexShrink: 0, marginTop: 6 }} />}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </SectionCard>
  );

  // ── Profile ────────────────────────────────────────────────────────────────
  const ProfileTab = () => (
    <Row className="g-4">
      {/* Avatar + info */}
      <Col lg={4}>
        <SectionCard className="text-center p-3">
          <div
            style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => avatarRef.current?.click()}
            title="Click to change profile picture"
          >
            {profileSrc ? (
              <img src={profileSrc} alt="Avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${brand.primary}` }} />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: brand.bg, border: `3px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <FiUser size={40} color={brand.primary} />
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: brand.primary, border: 'none', borderRadius: '50%', padding: '0.3rem', color: '#fff', display: 'flex', pointerEvents: 'none' }}>
              <FiCamera size={14} />
            </div>
            <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </div>
          <h5 style={{ fontWeight: 700 }}>{userDetails?.fullName || 'Your Name'}</h5>
          <p style={{ color: brand.sub, fontSize: 13, margin: '0 0 4px' }}>{userDetails?.email}</p>
          <Badge bg="success" style={{ borderRadius: 50 }}>Sponsor</Badge>
          {userDetails?.bio && <p style={{ fontSize: 12, color: brand.sub, marginTop: 12, borderTop: `1px solid ${brand.grey}`, paddingTop: 12 }}>{userDetails.bio}</p>}
          {userDetails?.location && <p style={{ fontSize: 12, color: brand.sub, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><FiMapPin size={12} />{userDetails.location}</p>}
        </SectionCard>
      </Col>

      {/* Profile form */}
      <Col lg={8}>
        <SectionCard className="mb-4">
          <Card.Header>
            <FiEdit2 /> Profile Details
            {!editingProfile && (
              <PrimaryBtn size="sm" variant="outline-primary" style={{ marginLeft: 'auto' }} onClick={() => setEditingProfile(true)}>
                Edit
              </PrimaryBtn>
            )}
          </Card.Header>
          <Card.Body>
            {editingProfile ? (
              <>
                <Row className="g-3">
                  {[
                    { label: 'Full Name', key: 'fullName', type: 'text' },
                    { label: 'Phone Number', key: 'phoneNumber', type: 'tel' },
                    { label: 'Location', key: 'location', type: 'text' },
                  ].map(({ label, key, type }) => (
                    <Col md={6} key={key}>
                      <Form.Group>
                        <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>{label}</Form.Label>
                        <Form.Control type={type} value={profileForm[key]} onChange={e => setProfileForm(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                      </Form.Group>
                    </Col>
                  ))}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Country</Form.Label>
                      <Form.Control value={profileForm.country} onChange={e => setProfileForm(p => ({ ...p, country: e.target.value }))} style={inputStyle} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Gender</Form.Label>
                      <Form.Select value={profileForm.gender} onChange={e => setProfileForm(p => ({ ...p, gender: e.target.value }))} style={inputStyle}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Bio</Form.Label>
                      <Form.Control as="textarea" rows={3} value={profileForm.bio} onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))} style={{ ...inputStyle, height: 'auto', resize: 'none' }} placeholder="Tell learners a little about yourself and your motivation to sponsor..." />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 mt-3">
                  <PrimaryBtn onClick={handleProfileSave} disabled={profileSaving}>
                    {profileSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save Changes'}
                  </PrimaryBtn>
                  <Button variant="light" onClick={() => { setEditingProfile(false); setProfilePicFile(null); setProfilePicPreview(null); }}>Cancel</Button>
                </div>
              </>
            ) : (
              <Row className="g-2">
                {[
                  ['Full Name', userDetails?.fullName],
                  ['Phone', userDetails?.phoneNumber],
                  ['Country', userDetails?.country],
                  ['Location', userDetails?.location],
                  ['Gender', userDetails?.gender],
                ].map(([label, val]) => (
                  <Col md={6} key={label}>
                    <p style={{ margin: 0, fontSize: 12, color: brand.sub, fontWeight: 600 }}>{label}</p>
                    <p style={{ margin: '2px 0 12px', fontSize: 14, color: brand.text }}>{val || '—'}</p>
                  </Col>
                ))}
                {userDetails?.bio && (
                  <Col md={12}>
                    <p style={{ margin: 0, fontSize: 12, color: brand.sub, fontWeight: 600 }}>Bio</p>
                    <p style={{ margin: '2px 0', fontSize: 14, color: brand.text }}>{userDetails.bio}</p>
                  </Col>
                )}
              </Row>
            )}
          </Card.Body>
        </SectionCard>

        {/* Sponsorship currency preference */}
        <SectionCard className="mb-4">
          <Card.Header><FiDollarSign /> Sponsorship Currency</Card.Header>
          <Card.Body>
            <p style={{ fontSize: 13, color: brand.sub, marginBottom: 12 }}>
              Choose the currency you plan to sponsor learners in. Currently, Motivar processes payments in NGN via Paystack.
            </p>
            <div className="d-flex align-items-center gap-3">
              <Form.Select
                value={preferredCurrency}
                onChange={e => handleCurrencySave(e.target.value)}
                disabled={currencySaving}
                style={{ maxWidth: 160, borderColor: brand.primary, borderRadius: 8 }}
              >
                {['NGN', 'USD', 'GBP', 'EUR', 'ZAR', 'KES', 'GHS'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Form.Select>
              {currencySaving && <Spinner animation="border" size="sm" style={{ color: brand.primary }} />}
              <Badge bg="success" style={{ borderRadius: 50 }}>Active: {preferredCurrency}</Badge>
            </div>
          </Card.Body>
        </SectionCard>

        {/* Payment method */}
        <SectionCard>
          <Card.Header>
            <FiDollarSign /> Payment Method
            {!editPayment && (
              <PrimaryBtn size="sm" variant="outline-primary" style={{ marginLeft: 'auto' }} onClick={() => { setEditPayment(true); if (paymentMethod) setPaymentForm({ type: paymentMethod.type, label: paymentMethod.label }); }}>
                {paymentMethod ? 'Update' : 'Add'}
              </PrimaryBtn>
            )}
          </Card.Header>
          <Card.Body>
            {editPayment ? (
              <>
                <Row className="g-3">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Method Type</Form.Label>
                      <Form.Select value={paymentForm.type} onChange={e => setPaymentForm(p => ({ ...p, type: e.target.value }))} style={inputStyle}>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="card">Card</option>
                        <option value="paystack">Paystack</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={7}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Description</Form.Label>
                      <Form.Control
                        value={paymentForm.label}
                        onChange={e => setPaymentForm(p => ({ ...p, label: e.target.value }))}
                        style={inputStyle}
                        placeholder={paymentForm.type === 'card' ? 'e.g. Visa ending in 4242' : paymentForm.type === 'bank_transfer' ? 'e.g. GTBank - 0123456789' : 'Description'}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 mt-3">
                  <PrimaryBtn onClick={handlePaymentSave} disabled={paymentSaving}>
                    {paymentSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save'}
                  </PrimaryBtn>
                  <Button variant="light" onClick={() => setEditPayment(false)}>Cancel</Button>
                </div>
              </>
            ) : paymentMethod ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: brand.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiDollarSign color={brand.primary} size={20} />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>{paymentMethod.label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: brand.sub }}>{paymentMethod.type.replace('_', ' ')}</p>
                </div>
                <Badge bg="success" style={{ marginLeft: 'auto', borderRadius: 50 }}>Active</Badge>
              </div>
            ) : (
              <p className="text-muted text-center py-3" style={{ fontSize: 13 }}>No payment method added yet. Click "Add" to set one up.</p>
            )}
          </Card.Body>
        </SectionCard>
      </Col>
    </Row>
  );

  // ═════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═════════════════════════════════════════════════════════════════════════
  return (
    <DashboardWrapper>
      <GlobalStyle />

      {/* Navbar */}
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand href="/"><img src={Logo} alt="Motivar" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="sponsor-nav" />
          <Navbar.Collapse id="sponsor-nav">
            <Nav className="me-auto">
              <NavDropdown title="Programs" id="programs-dropdown">
                <NavDropdown.Item as={Link} to="/coming-soon">DAP</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coming-soon">DigiAccess</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Community" id="community-dropdown">
                <NavDropdown.Item as={Link} to="/coming-soon">Find learners near you</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coming-soon">Find mentors near you</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* Notification bell */}
            <div style={{ position: 'relative', marginRight: 16, cursor: 'pointer' }} onClick={() => setActiveTab('notifications')}>
              <FiBell size={22} color={brand.sub} />
              {unreadCount > 0 && <NotifDot>{unreadCount > 9 ? '9+' : unreadCount}</NotifDot>}
            </div>
            <PrimaryBtn variant="outline-danger" onClick={handleLogout}>
              <FiLogOut /> Logout
            </PrimaryBtn>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <DashboardContainer fluid="lg">
        {/* Welcome header */}
        {userDetails && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: brand.white, borderRadius: 12, boxShadow: '0 4px 15px rgba(0,0,0,.05)', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `5px solid ${brand.primary}` }}>
            <div>
              {profileSrc ? (
                <img src={profileSrc} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${brand.primary}` }} />
              ) : (
                <div style={{ background: brand.bg, padding: '0.75rem', borderRadius: '50%', display: 'inline-flex' }}>
                  <FiUser size={28} color={brand.primary} />
                </div>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: brand.text, marginBottom: 2 }}>
                Welcome back, {userDetails.fullName?.split(' ')[0] || 'Sponsor'}!
              </h1>
              <p style={{ color: brand.sub, margin: 0, fontSize: '0.9rem' }}>
                You've helped {analytics.learnersHelped || 0} learner{analytics.learnersHelped !== 1 ? 's' : ''} so far. Keep making a difference.
              </p>
            </div>
          </div>
        )}

        {/* Tab navigation */}
        <TabNav>
          {[
            { key: 'overview', icon: <FiGrid />, label: 'Overview' },
            { key: 'browse', icon: <FiSearch />, label: 'Browse Requests' },
            { key: 'funded', icon: <FiHeart />, label: 'Funded Learners' },
            { key: 'analytics', icon: <FiBarChart2 />, label: 'Analytics' },
            {
              key: 'notifications', icon: <div style={{ position: 'relative', display: 'inline-flex' }}>
                <FiBell />
                {unreadCount > 0 && <span style={{ position: 'absolute', top: -5, right: -6, width: 14, height: 14, borderRadius: '50%', background: brand.danger, color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{unreadCount}</span>}
              </div>,
              label: 'Notifications'
            },
            { key: 'profile', icon: <FiUser />, label: 'Profile' },
          ].map(({ key, icon, label }) => (
            <TabBtn key={key} active={activeTab === key} onClick={() => setActiveTab(key)}>
              {icon} {label}
            </TabBtn>
          ))}
        </TabNav>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'browse' && <BrowseTab />}
        {activeTab === 'funded' && <FundedTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </DashboardContainer>

      <footer style={{ background: brand.white, color: brand.sub, textAlign: 'center', padding: '1.5rem 0', fontSize: '.88rem', borderTop: `1px solid ${brand.grey}`, marginTop: 'auto' }}>
        <p style={{ margin: 0 }}>Copyright © {new Date().getFullYear()} Motivar Learning Technologies</p>
      </footer>

      {/* ── Request Detail Modal ─────────────────────────────────────── */}
      {selectedReq && (
        <StyledModal show={showReqModal} onHide={() => setShowReqModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Sponsorship Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Learner info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '1rem', background: brand.bg, borderRadius: 10 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff', border: `2px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {learnerAvatarSrc(selectedReq.learner?.userId?.profilePicture)
                  ? <img src={learnerAvatarSrc(selectedReq.learner?.userId?.profilePicture)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <FiUser color={brand.primary} size={24} />}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>{selectedReq.learner?.userId?.fullName || 'Anonymous Learner'}</p>
                <p style={{ margin: 0, fontSize: 13, color: brand.sub, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FiMapPin size={12} /> {selectedReq.learner?.userId?.country || 'Location not set'}
                </p>
                {selectedReq.learner?.userId?.bio && (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: brand.sub, fontStyle: 'italic' }}>"{selectedReq.learner.userId.bio}"</p>
                )}
              </div>
            </div>

            {/* Course details */}
            <h6 style={{ fontWeight: 700, marginBottom: 12 }}>Course Details</h6>
            <Row className="g-2 mb-3">
              {[
                ['Course Title', selectedReq.course?.courseTitle],
                ['Platform', selectedReq.course?.platform],
                ['Duration', `${selectedReq.course?.duration || '—'} ${selectedReq.course?.durationUnit || ''}`],
                ['Investment Required', `${selectedReq.course?.priceUnit || 'USD'} ${selectedReq.course?.price?.toLocaleString() || '—'}`],
              ].map(([label, val]) => (
                <Col md={6} key={label}>
                  <p style={{ margin: 0, fontSize: 11, color: brand.sub, fontWeight: 600, textTransform: 'uppercase' }}>{label}</p>
                  <p style={{ margin: '2px 0 8px', fontSize: 14, fontWeight: 600, color: brand.text }}>{val || '—'}</p>
                </Col>
              ))}
            </Row>

            {selectedReq.motivation && (
              <>
                <h6 style={{ fontWeight: 700, marginBottom: 8 }}>Motivation</h6>
                <div style={{ background: brand.bg, borderLeft: `4px solid ${brand.primary}`, padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', fontSize: 14, color: brand.text, lineHeight: 1.7, marginBottom: 16 }}>
                  {selectedReq.motivation}
                </div>
              </>
            )}

            {selectedReq.link && (
              <a href={selectedReq.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: brand.primary, display: 'flex', alignItems: 'center', gap: 4 }}>
                <FiExternalLink size={13} /> View Course Link
              </a>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowReqModal(false)}>Close</Button>
            <PrimaryBtn
              onClick={() => handleFund(selectedReq)}
              disabled={selectedReq.paid || fundingId === selectedReq._id}
            >
              {fundingId === selectedReq._id
                ? <><Spinner animation="border" size="sm" className="me-1" /> Funding...</>
                : selectedReq.paid
                  ? 'Already Funded'
                  : <><FiHeart /> Fund This Learner</>}
            </PrimaryBtn>
          </Modal.Footer>
        </StyledModal>
      )}

      {/* ── Message Thread Modal ──────────────────────────────────────── */}
      <StyledModal show={showMsgModal} onHide={() => setShowMsgModal(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title><FiMessageSquare className="me-2" />Message — {msgLearnerName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '55vh', overflowY: 'auto' }}>
          {msgLoading ? (
            <div className="text-center py-4"><Spinner animation="border" size="sm" style={{ color: brand.primary }} /></div>
          ) : msgThread.length === 0 ? (
            <div className="text-center py-4 text-muted" style={{ fontSize: 13 }}>
              <FiMessageSquare size={28} style={{ marginBottom: 8, opacity: .4 }} /><br />
              No messages yet. Say hello!
            </div>
          ) : msgThread.map((msg, idx) => {
            const isMe = msg.senderId?._id === userDetails?._id || msg.senderId === userDetails?._id;
            return (
              <div key={msg._id || idx} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                <div style={{ maxWidth: '78%', padding: '9px 14px', borderRadius: 16, background: isMe ? brand.primary : brand.bg, color: isMe ? '#fff' : brand.text, fontSize: 13, lineHeight: 1.6, borderBottomRightRadius: isMe ? 4 : 16, borderBottomLeftRadius: isMe ? 16 : 4, border: isMe ? 'none' : `1px solid ${brand.grey}` }}>
                  {msg.content}
                  <div style={{ fontSize: 10, opacity: .7, marginTop: 3, textAlign: isMe ? 'right' : 'left' }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={msgBottomRef} />
        </Modal.Body>
        <Modal.Footer style={{ padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <Form.Control
              placeholder={`Message ${msgLearnerName}...`}
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              style={{ ...inputStyle, borderRadius: 24, height: 42, flex: 1 }}
              disabled={msgPosting}
            />
            <PrimaryBtn onClick={handleSendMessage} disabled={msgPosting || !msgInput.trim()} style={{ minWidth: 44, height: 42, borderRadius: '50%', padding: 0, justifyContent: 'center' }}>
              {msgPosting ? <Spinner animation="border" size="sm" /> : <FiSend size={15} />}
            </PrimaryBtn>
          </div>
        </Modal.Footer>
      </StyledModal>

      {/* Initial Profile Completion Modal */}
      <CompleteProfileModal
        show={showProfileModal}
        onComplete={({ fullName }) => {
          setShowProfileModal(false);
          setUserDetails(prev => ({ ...prev, fullName }));
          setRefreshKey(k => k + 1);
        }}
      />
    </DashboardWrapper>
  );
};

export default SponsorDashboard;
