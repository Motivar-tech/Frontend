/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Buffer } from 'buffer';
import { toast } from 'react-hot-toast';
import Logo from '../assets/images/Motivar.svg';
import {
  FiUser, FiClock, FiCheckCircle, FiBookOpen, FiList,
  FiUpload, FiLogOut, FiAlertCircle, FiHeart, FiTarget,
  FiCalendar, FiLink, FiEdit2, FiStar,
  FiGrid, FiExternalLink, FiTrash2, FiCamera, FiMessageSquare, FiSend,
} from 'react-icons/fi';
import { BASE_URL } from '../utils/index';
import CompleteProfileModal from '../components/CompleteProfileModal';
import MojiChatbot from '../components/MojiChatbot';

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const brand = {
  primary: '#59b49a',
  primaryDark: '#4aa088',
  backgroundLight: '#f1fdf8',
  backgroundWhite: '#fefcf9',
  text: '#333',
  textSub: '#555',
  white: '#ffffff',
  greyLight: '#e9ecef',
  greyMid: '#ced4da',
  success: '#28a745',
  warning: '#fd7e14',
  danger: '#dc3545',
};

// ─── Static data ──────────────────────────────────────────────────────────────
const LEARNING_GOALS = [
  'Get a new job', 'Upskill in current role', 'Start a business',
  'Learn a new skill', 'Get certified', 'Switch careers',
  'Improve digital literacy', 'Build a portfolio', 'Freelancing',
];

const INTERESTS = [
  // Technology & Engineering
  'Web Development', 'Mobile Development', 'Backend Development', 'Frontend Development',
  'Full-Stack Development', 'DevOps', 'Cloud Computing', 'Cybersecurity',
  'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Deep Learning',
  'Data Engineering', 'Data Analytics', 'Business Intelligence', 'Database Administration',
  'Blockchain', 'Web3 & Smart Contracts', 'Embedded Systems', 'Robotics',
  'Game Development', 'AR/VR Development', 'API Development', 'Microservices',
  // Design & Creative
  'UI/UX Design', 'Graphic Design', 'Motion Graphics', 'Video Editing',
  'Photography', 'Illustration', 'Brand Design', '3D Modelling',
  // Business & Management
  'Product Management', 'Project Management', 'Agile & Scrum', 'Business Analysis',
  'Entrepreneurship', 'Finance & Accounting', 'Supply Chain Management',
  'Human Resources', 'Sales & CRM', 'Legal & Compliance',
  // Marketing & Communication
  'Digital Marketing', 'Content Creation', 'SEO & SEM', 'Social Media Marketing',
  'Email Marketing', 'Copywriting', 'Public Relations', 'Community Management',
  // Personal & Professional Development
  'Leadership', 'Communication Skills', 'Critical Thinking', 'Time Management',
  'Foreign Languages', 'Research & Academia',
];

const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education', 'E-commerce',
  'Media & Entertainment', 'Agriculture', 'Government', 'NGO/Non-profit',
  'Manufacturing', 'Telecoms', 'Consulting',
];

const AFRICAN_COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cameroon', 'Chad', 'Democratic Republic of the Congo', 'Egypt',
  'Ethiopia', 'Ghana', 'Guinea', 'Ivory Coast', 'Kenya', 'Libya', 'Madagascar',
  'Malawi', 'Mali', 'Mauritania', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
  'Nigeria', 'Rwanda', 'Senegal', 'Sierra Leone', 'Somalia', 'South Africa',
  'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe',
];

// ─── Styled Components ────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`body { background-color: ${brand.backgroundLight}; color: ${brand.text}; font-family: 'Poppins', sans-serif; }`;

const DashboardWrapper = styled.div`display: flex; flex-direction: column; min-height: 100vh;`;

const StyledNavbar = styled(Navbar)`
  background-color: ${brand.backgroundWhite};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 0.8rem 0;
  .navbar-brand img { height: 35px; }
  .nav-link { color: ${brand.textSub}; font-weight: 500; margin: 0 0.5rem; transition: color 0.2s; &:hover { color: ${brand.primary}; } }
`;

const DashboardContainer = styled(Container)`flex: 1; padding-top: 2rem; padding-bottom: 4rem;`;

const TabNav = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${brand.greyLight};
  overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`;

const TabBtn = styled.button`
  background: none;
  border: none;
  border-bottom: 3px solid ${p => p.active ? brand.primary : 'transparent'};
  color: ${p => p.active ? brand.primary : brand.textSub};
  font-weight: ${p => p.active ? 700 : 500};
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  &:hover { color: ${brand.primary}; }
`;

const WelcomeHeader = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${brand.backgroundWhite};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-left: 5px solid ${brand.primary};
  h1 { font-size: 1.5rem; font-weight: 600; color: ${brand.text}; margin-bottom: 0.1rem; }
  p { color: ${brand.textSub}; margin-bottom: 0; font-size: 0.9rem; }
`;

const SummaryCard = styled(Card)`
  border: none; border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%; background: ${brand.backgroundWhite};
  text-align: center; padding: 1.5rem 1rem;
  &:hover { transform: translateY(-5px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
  .summary-icon { font-size: 2rem; margin-bottom: 0.75rem; color: ${p => p.iconColor || brand.primary}; }
  .summary-value { font-size: 2.5rem; font-weight: 700; color: ${p => p.valueColor || brand.text}; margin-bottom: 0.2rem; line-height: 1.2; }
  h5 { font-size: 0.9rem; font-weight: 500; color: ${brand.textSub}; margin-bottom: 0; }
`;

const SectionCard = styled(Card)`
  border: none; border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  background: ${brand.backgroundWhite}; overflow: hidden;
  .card-header {
    background: ${brand.backgroundWhite}; border-bottom: 1px solid ${brand.greyLight};
    font-weight: 600; font-size: 1rem; color: ${brand.text};
    display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem;
    svg { color: ${brand.primary}; font-size: 1.2rem; }
  }
`;

const StyledListItem = styled(ListGroup.Item)`
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1rem 1.25rem; background: transparent;
  border-color: ${brand.greyLight} !important;
  border-width: 0 0 1px 0; transition: background 0.15s;
  &:hover { background: ${brand.backgroundLight}; }
  .icon-wrap { margin-top: 0.15rem; color: ${p => p.iconColor || brand.textSub}; font-size: 1.1rem; }
  .content { flex-grow: 1; h6 { font-weight: 600; margin-bottom: 0.2rem; color: ${brand.text}; } p, .text-muted { font-size: 0.82rem; color: ${brand.textSub}; margin-bottom: 0.4rem; } }
`;

const StyledBadge = styled(Badge)`
  font-size: 0.72rem; font-weight: 500; padding: 0.3em 0.6em;
  border-radius: 50px;
  &.bg-paid, &.bg-completed { background: ${brand.success} !important; color: white; }
  &.bg-pending, &.bg-uncompleted { background: ${brand.warning} !important; color: white; }
`;

const StyledModal = styled(Modal)`
  .modal-content { border-radius: 12px; border: none; background: ${brand.backgroundWhite}; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  .modal-header { background: ${brand.primary}; color: white; border-radius: 12px 12px 0 0; border-bottom: none; .modal-title { font-weight: 600; } .btn-close { filter: brightness(0) invert(1); } }
  .modal-body { padding: 1.5rem; .form-label { font-weight: 500; color: ${brand.textSub}; } .form-control, .form-select { border-color: ${brand.greyMid}; &:focus { border-color: ${brand.primary}; box-shadow: 0 0 0 0.2rem rgba(89,180,154,0.25); } } }
  .modal-footer { border-top: 1px solid ${brand.greyLight}; padding: 1rem 1.5rem; }
`;

const PrimaryBtn = styled(Button)`
  background: ${brand.primary}; border-color: ${brand.primary}; border-radius: 50px; font-weight: 500;
  display: inline-flex; align-items: center; gap: 0.4rem;
  &:hover, &:focus { background: ${brand.primaryDark}; border-color: ${brand.primaryDark}; }
  &.btn-outline-primary { background: transparent; color: ${brand.primary}; border-color: ${brand.primary}; &:hover { background: ${brand.backgroundLight}; color: ${brand.primaryDark}; } }
  &.btn-outline-danger { background: transparent; color: ${brand.danger}; border-color: ${brand.danger}; &:hover { background: rgba(220,53,69,0.08); } }
`;

const CourseCard = styled(Card)`
  border: none; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  transition: transform 0.2s, box-shadow 0.2s; height: 100%; background: ${brand.backgroundWhite};
  &:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
  .card-img-top { height: 150px; object-fit: cover; border-radius: 12px 12px 0 0; }
  .card-body { padding: 1rem; }
  .card-title { font-size: 0.9rem; font-weight: 600; color: ${brand.text}; margin-bottom: 0.5rem; }
  .card-text { font-size: 0.8rem; color: ${brand.textSub}; }
`;

const TagChip = styled.span`
  display: inline-block;
  background: ${p => p.selected ? brand.primary : brand.greyLight};
  color: ${p => p.selected ? '#fff' : brand.text};
  border: 1.5px solid ${p => p.selected ? brand.primary : brand.greyLight};
  border-radius: 50px;
  padding: 0.3rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  &:hover { border-color: ${brand.primary}; color: ${p => p.selected ? '#fff' : brand.primary}; }
`;

const StyledFooter = styled.footer`
  background: ${brand.backgroundWhite}; color: ${brand.textSub};
  text-align: center; padding: 1.5rem 0; font-size: 0.88rem;
  border-top: 1px solid ${brand.greyLight}; margin-top: auto;
`;

const inputStyle = { borderColor: brand.primary, borderRadius: 8, fontFamily: 'Poppins, sans-serif' };

// ─── Helpers ─────────────────────────────────────────────────────────────────
const token = () => localStorage.getItem('motivar-token');
const authHeader = () => ({ Authorization: `Bearer ${token()}` });

// ─── Main Component ───────────────────────────────────────────────────────────
const LearnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Core data
  const [userDetails, setUserDetails] = useState(null);
  const [dashboardCourses, setDashboardCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [learnerProfile, setLearnerProfile] = useState({});
  const [socialProfiles, setSocialProfiles] = useState({});
  const [academicProfiles, setAcademicProfiles] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Profile modal (initial completion)
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Certificate upload modal
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Course detail modal
  const [selectedCatCourse, setSelectedCatCourse] = useState(null);

  // Course catalogue state
  const [catalogue, setCatalogue] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const [catPage, setCatPage] = useState(1);
  const [catTotal, setCatTotal] = useState(0);
  const [enrollingId, setEnrollingId] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState({});

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: '', phoneNumber: '', country: '', gender: '', bio: '', location: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const avatarInputRef = useRef();

  // Goals & interests state
  const [goalsSaving, setGoalsSaving] = useState(false);
  const [goalsForm, setGoalsForm] = useState({
    primary_goal: '',
    interests: [],
    target_industries: [],
    target_roles: '',
  });

  // Availability state
  const [availSaving, setAvailSaving] = useState(false);
  const [availForm, setAvailForm] = useState({
    weekly_hours: '',
    motivation_level: '',
    device: '',
    preferred_learning_style: '',
    budget: '',
  });

  // Social & academic state
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialForm, setSocialForm] = useState({
    linkedin: '', twitter: '', github: '', portfolio: '',
  });
  const [academicForm, setAcademicForm] = useState({
    institution: '', fieldOfStudy: '', highestDegree: '', certifications: '',
  });

  // Messaging state
  const [msgThreads, setMsgThreads] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replying, setReplying] = useState(false);
  const msgBottomRef = useRef();

  // Interest search filter
  const [interestSearch, setInterestSearch] = useState('');

  // Rating / review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCourse, setReviewCourse] = useState(null);
  const [reviewScore, setReviewScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Discussion modal state
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [discCourse, setDiscCourse] = useState(null);
  const [discPosts, setDiscPosts] = useState([]);
  const [discLoading, setDiscLoading] = useState(false);
  const [discMessage, setDiscMessage] = useState('');
  const [discPosting, setDiscPosting] = useState(false);

  // ─── Fetch dashboard data ─────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/dashboard`, { headers: authHeader() });
        const d = res.data;

        setUserDetails(d.userDetails);
        setDashboardCourses(d.dashboardCourses || []);
        setRequests(d.requests || []);
        setLearnerProfile(d.learnerProfile || {});
        setSocialProfiles(d.socialProfiles || {});
        setAcademicProfiles(d.academicProfiles || {});
        setWishlist(d.wishlist || []);

        // Sync local form states
        setProfileForm({
          fullName: d.userDetails?.fullName || '',
          phoneNumber: d.userDetails?.phoneNumber || '',
          country: d.userDetails?.country || '',
          gender: d.userDetails?.gender || '',
          bio: d.userDetails?.bio || '',
          location: d.userDetails?.location || '',
        });
        setGoalsForm({
          primary_goal: d.learnerProfile?.primary_goal || '',
          interests: d.learnerProfile?.interests || [],
          target_industries: d.learnerProfile?.target_industries || [],
          target_roles: (d.learnerProfile?.target_roles || []).join(', '),
        });
        setAvailForm({
          weekly_hours: d.learnerProfile?.weekly_hours || '',
          motivation_level: d.learnerProfile?.motivation_level || '',
          device: d.learnerProfile?.device || '',
          preferred_learning_style: d.learnerProfile?.preferred_learning_style || '',
          budget: d.learnerProfile?.budget || '',
        });
        setSocialForm({
          linkedin: d.socialProfiles?.linkedin || '',
          twitter: d.socialProfiles?.twitter || '',
          github: d.socialProfiles?.github || '',
          portfolio: d.socialProfiles?.portfolio || '',
        });
        setAcademicForm({
          institution: d.academicProfiles?.institution || '',
          fieldOfStudy: d.academicProfiles?.fieldOfStudy || '',
          highestDegree: d.academicProfiles?.highestDegree || '',
          certifications: (d.academicProfiles?.certifications || []).join(', '),
        });

        // Show completion modal if core fields missing
        if (!d.userDetails?.fullName || !d.userDetails?.phoneNumber) {
          setShowProfileModal(true);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  // ─── Fetch course catalogue ───────────────────────────────────────────────
  const fetchCatalogue = async (search = '', page = 1) => {
    setCatLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12 });
      if (search) params.append('search', search);
      const res = await axios.get(`${BASE_URL}/explore/filter?${params}`);
      setCatalogue(res.data.courses || []);
      setCatTotal(res.data.totalCourses || 0);
    } catch {
      toast.error('Could not load course catalogue.');
    } finally {
      setCatLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'courses') fetchCatalogue(catSearch, catPage);
  }, [activeTab, catPage]);

  // ─── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = () => {
    ['motivar-token', 'motivar-refresh-token', 'motivar-user-role', 'motivar-user-fname'].forEach(k =>
      localStorage.removeItem(k)
    );
    window.location.href = '/';
  };

  // ─── Profile update ───────────────────────────────────────────────────────
  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      const formData = new FormData();
      Object.entries(profileForm).forEach(([k, v]) => { if (v) formData.append(k, v); });
      if (profilePicFile) formData.append('profilePicture', profilePicFile);

      await axios.patch(`${BASE_URL}/user/profile/update`, formData, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated successfully.');
      setEditingProfile(false);
      setProfilePicFile(null);
      setProfilePicPreview(null);
      setRefreshKey(k => k + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  // ─── Goals & interests save ───────────────────────────────────────────────
  const handleGoalsSave = async () => {
    setGoalsSaving(true);
    try {
      await axios.patch(
        `${BASE_URL}/dashboard/learner-profile`,
        {
          primary_goal: goalsForm.primary_goal,
          interests: goalsForm.interests,
          target_industries: goalsForm.target_industries,
          target_roles: goalsForm.target_roles
            ? goalsForm.target_roles.split(',').map(s => s.trim()).filter(Boolean)
            : [],
        },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      toast.success('Goals & interests saved.');
      setLearnerProfile(p => ({
        ...p,
        primary_goal: goalsForm.primary_goal,
        interests: goalsForm.interests,
        target_industries: goalsForm.target_industries,
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save goals.');
    } finally {
      setGoalsSaving(false);
    }
  };

  // ─── Availability save ────────────────────────────────────────────────────
  const handleAvailSave = async () => {
    setAvailSaving(true);
    try {
      await axios.patch(
        `${BASE_URL}/dashboard/learner-profile`,
        {
          weekly_hours: availForm.weekly_hours ? Number(availForm.weekly_hours) : undefined,
          motivation_level: availForm.motivation_level || undefined,
          device: availForm.device || undefined,
          preferred_learning_style: availForm.preferred_learning_style || undefined,
          budget: availForm.budget || undefined,
        },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      toast.success('Availability preferences saved.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save availability.');
    } finally {
      setAvailSaving(false);
    }
  };

  // ─── Social & academic save ───────────────────────────────────────────────
  const handleSocialSave = async () => {
    setSocialSaving(true);
    try {
      await axios.patch(
        `${BASE_URL}/dashboard/learner-profile`,
        {
          socialProfiles: socialForm,
          academicProfiles: {
            ...academicForm,
            certifications: academicForm.certifications
              ? academicForm.certifications.split(',').map(s => s.trim()).filter(Boolean)
              : [],
          },
        },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      toast.success('Social & academic profiles saved.');
      setSocialProfiles(socialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save profiles.');
    } finally {
      setSocialSaving(false);
    }
  };

  // ─── Certificate upload ───────────────────────────────────────────────────
  const handleUploadCertificate = async () => {
    if (!selectedFile) { toast.error('Please select a file.'); return; }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('certificate', selectedFile);
      await axios.put(
        `${BASE_URL}/dashboard/${selectedCourse._id}/upload-completion-certificate`,
        formData,
        { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } }
      );
      setDashboardCourses(prev =>
        prev.map(c => c._id === selectedCourse._id
          ? { ...c, status: 'completed', completionCertificate: 'uploaded' }
          : c
        )
      );
      toast.success('Certificate uploaded successfully.');
      setShowCertModal(false);
      setSelectedFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload certificate.');
    } finally {
      setIsUploading(false);
    }
  };

  // ─── Enroll in free course ────────────────────────────────────────────────
  const handleEnroll = async (course) => {
    setEnrollingId(course._id);
    try {
      await axios.post(
        `${BASE_URL}/dashboard/enroll/${course._id}`,
        {},
        { headers: authHeader() }
      );
      toast.success(`Enrolled in "${course.title}"!`);
      setRefreshKey(k => k + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not enroll. Try again.');
    } finally {
      setEnrollingId(null);
    }
  };

  // ─── Wishlist toggle ──────────────────────────────────────────────────────
  const handleWishlistToggle = async (course) => {
    const inWishlist = wishlist.some(w => w.courseId === course._id || w.title === course.title);
    setWishlistLoading(p => ({ ...p, [course._id]: true }));
    try {
      if (inWishlist) {
        const item = wishlist.find(w => w.courseId === course._id || w.title === course.title);
        if (item) {
          await axios.delete(`${BASE_URL}/dashboard/wishlist/${item._id}`, { headers: authHeader() });
          setWishlist(prev => prev.filter(w => w._id !== item._id));
          toast.success('Removed from wishlist.');
        }
      } else {
        const res = await axios.post(
          `${BASE_URL}/dashboard/wishlist`,
          {
            courseId: course._id,
            title: course.title,
            url: course.url,
            platform: course.platform,
            status: course.status,
            price: course.price,
            priceUnit: course.priceUnit,
          },
          { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
        );
        setWishlist(res.data.wishlist || []);
        toast.success('Added to wishlist.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update wishlist.');
    } finally {
      setWishlistLoading(p => ({ ...p, [course._id]: false }));
    }
  };

  // ─── Avatar change ────────────────────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Only image files are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5 MB.'); return; }
    setProfilePicFile(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  // ─── Mark course complete ─────────────────────────────────────────────────
  const handleMarkComplete = async (course) => {
    try {
      await axios.patch(
        `${BASE_URL}/dashboard/courses/${course._id}/complete`,
        {},
        { headers: authHeader() }
      );
      setDashboardCourses(prev =>
        prev.map(c => c._id === course._id ? { ...c, status: 'completed' } : c)
      );
      toast.success(`"${course.title}" marked as completed!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not mark course as complete.');
    }
  };

  // ─── Submit review ────────────────────────────────────────────────────────
  const handleSubmitReview = async () => {
    if (!reviewScore) { toast.error('Please select a star rating.'); return; }
    setReviewSubmitting(true);
    try {
      await axios.post(
        `${BASE_URL}/dashboard/courses/${reviewCourse._id}/review`,
        { score: reviewScore, review: reviewText },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      toast.success('Review submitted! Thank you.');
      setDashboardCourses(prev =>
        prev.map(c => c._id === reviewCourse._id
          ? { ...c, rating: { score: reviewScore, review: reviewText } }
          : c)
      );
      setShowReviewModal(false);
      setReviewScore(0);
      setReviewText('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // ─── Load discussion ──────────────────────────────────────────────────────
  const loadDiscussion = async (course) => {
    setDiscCourse(course);
    setShowDiscModal(true);
    setDiscPosts([]);
    setDiscLoading(true);
    try {
      const id = course.courseId || course._id;
      const res = await axios.get(`${BASE_URL}/dashboard/courses/${id}/discussion`, { headers: authHeader() });
      setDiscPosts(res.data.data.posts || []);
    } catch {
      toast.error('Could not load discussion.');
    } finally {
      setDiscLoading(false);
    }
  };

  // ─── Post to discussion ───────────────────────────────────────────────────
  const handlePostDiscussion = async () => {
    if (!discMessage.trim()) return;
    setDiscPosting(true);
    try {
      const id = discCourse.courseId || discCourse._id;
      const res = await axios.post(
        `${BASE_URL}/dashboard/courses/${id}/discussion`,
        { message: discMessage.trim() },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      setDiscPosts(prev => [res.data.data.post, ...prev]);
      setDiscMessage('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not post message.');
    } finally {
      setDiscPosting(false);
    }
  };

  // ─── Messaging ────────────────────────────────────────────────────────────
  const fetchMessages = async () => {
    setMsgLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/dashboard/messages`, { headers: authHeader() });
      setMsgThreads(res.data.threads || []);
    } catch {
      toast.error('Failed to load messages.');
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'messages') fetchMessages();
  }, [activeTab]);

  const handleReply = async () => {
    if (!replyContent.trim() || !selectedThread) return;
    setReplying(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/dashboard/messages/${selectedThread.threadId}/reply`,
        { content: replyContent.trim() },
        { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      const newMsg = res.data.msg;
      setSelectedThread(prev => ({ ...prev, messages: [...prev.messages, newMsg] }));
      setMsgThreads(prev => prev.map(t =>
        t.threadId === selectedThread.threadId
          ? { ...t, messages: [...t.messages, newMsg], lastMessage: newMsg }
          : t
      ));
      setReplyContent('');
      setTimeout(() => msgBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send reply.');
    } finally {
      setReplying(false);
    }
  };

  // ─── Computed ─────────────────────────────────────────────────────────────
  const pendingCount = requests.filter(r => !r.paid).length;
  const paidCount = requests.filter(r => r.paid).length;
  const enrolledCount = dashboardCourses.length;
  const completedCount = dashboardCourses.filter(c => c.status === 'completed').length;
  const catPages = Math.ceil(catTotal / 12);

  const profilePicSrc = profilePicPreview
    || (userDetails?.profilePicture?.data
      ? `data:${userDetails.profilePicture.contentType};base64,${Buffer.from(userDetails.profilePicture.data.data).toString('base64')}`
      : null);

  // ─── Loading / error states ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" style={{ color: brand.primary, width: '3rem', height: '3rem' }} />
        <p className="mt-3" style={{ color: brand.textSub }}>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="pt-5 text-center">
        <Alert variant="danger" className="d-inline-flex align-items-center gap-2">
          <FiAlertCircle /> {error}
        </Alert>
      </Container>
    );
  }

  // ─── Tab content renderers ────────────────────────────────────────────────

  // ── Overview Tab ────────────────────────────────────────────────────────
  const OverviewTab = () => (
    <>
      {/* Summary cards */}
      <Row className="g-3 mb-4">
        {[
          { icon: <FiClock />, value: pendingCount, label: 'Pending Requests', ic: brand.warning, vc: brand.warning },
          { icon: <FiCheckCircle />, value: paidCount, label: 'Paid Requests', ic: brand.success, vc: brand.success },
          { icon: <FiBookOpen />, value: enrolledCount, label: 'Enrolled Courses', ic: brand.primary, vc: brand.primary },
          { icon: <FiCheckCircle />, value: completedCount, label: 'Completed', ic: brand.success, vc: brand.primaryDark },
        ].map(({ icon, value, label, ic, vc }) => (
          <Col md={3} sm={6} key={label}>
            <SummaryCard iconColor={ic} valueColor={vc}>
              <div className="summary-icon">{icon}</div>
              <p className="summary-value">{value}</p>
              <h5>{label}</h5>
            </SummaryCard>
          </Col>
        ))}
      </Row>

      {/* CTA */}
      <div className="text-center mb-4 py-3" style={{ background: brand.backgroundWhite, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <p style={{ fontWeight: 600, color: brand.text, marginBottom: '0.75rem' }}>
          Need help funding a course? Request sponsorship here.
        </p>
        <PrimaryBtn onClick={() => window.location.href = '/help'}>
          Request for Help
        </PrimaryBtn>
      </div>

      {/* Requests & Enrolled Courses */}
      <Row className="g-4">
        <Col lg={6}>
          <SectionCard>
            <Card.Header><FiList /> Your Course Requests</Card.Header>
            <ListGroup variant="flush">
              {requests.length > 0 ? requests.map(req => (
                <StyledListItem key={req._id} iconColor={req.paid ? brand.success : brand.warning}>
                  <div className="icon-wrap">{req.paid ? <FiCheckCircle /> : <FiClock />}</div>
                  <div className="content">
                    <h6>{req.course?.courseTitle || 'Course Title Missing'}</h6>
                    <p className="text-muted">
                      {req.course?.platform || 'N/A'} &middot; {req.course?.price || 'N/A'} {req.course?.priceUnit || ''}
                    </p>
                    <StyledBadge className={req.paid ? 'bg-paid' : 'bg-pending'}>
                      {req.paid ? 'Paid' : 'Payment Pending'}
                    </StyledBadge>
                    {req.motivation && (
                      <p className="text-muted mt-1 small">"{req.motivation}"</p>
                    )}
                  </div>
                </StyledListItem>
              )) : (
                <ListGroup.Item className="text-center text-muted p-4">No requests yet.</ListGroup.Item>
              )}
            </ListGroup>
          </SectionCard>
        </Col>

        <Col lg={6}>
          <SectionCard>
            <Card.Header><FiBookOpen /> Your Enrolled Courses</Card.Header>
            <ListGroup variant="flush">
              {dashboardCourses.length > 0 ? dashboardCourses.map(course => {
                const courseUrl = course.link?.startsWith('http') ? course.link : `https://${course.link}`;
                const done = course.status === 'completed';
                return (
                  <StyledListItem key={course._id} iconColor={done ? brand.success : brand.warning}
                    style={{ justifyContent: 'space-between' }}>
                    <a
                      href={!done ? courseUrl : undefined}
                      target={!done ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, textDecoration: 'none', color: 'inherit', cursor: !done ? 'pointer' : 'default' }}
                      onClick={done ? e => e.preventDefault() : undefined}
                    >
                      <div className="icon-wrap"><FiBookOpen /></div>
                      <div className="content">
                        <h6>{course.title}</h6>
                        <p className="text-muted small">
                          {course.description?.length > 60
                            ? `${course.description.slice(0, 60)}...`
                            : course.description}
                        </p>
                        <StyledBadge className={done ? 'bg-completed' : 'bg-uncompleted'}>
                          {done ? 'Completed' : 'In Progress'}
                        </StyledBadge>
                      </div>
                    </a>
                    <div style={{ flexShrink: 0, marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {done ? (
                        <>
                          {course.completionCertificate && (
                            <PrimaryBtn
                              size="sm"
                              variant="outline-primary"
                              onClick={async () => {
                                try {
                                  const res = await fetch(`${BASE_URL}/dashboard/${course._id}/view-certificate`, { headers: authHeader() });
                                  if (!res.ok) throw new Error();
                                  const blob = await res.blob();
                                  window.open(URL.createObjectURL(blob), '_blank', 'noopener,noreferrer');
                                } catch { toast.error('Could not retrieve certificate.'); }
                              }}
                            >
                              View Cert
                            </PrimaryBtn>
                          )}
                          <PrimaryBtn
                            size="sm"
                            variant="outline-primary"
                            onClick={() => { setReviewCourse(course); setReviewScore(course.rating?.score || 0); setReviewText(course.rating?.review || ''); setShowReviewModal(true); }}
                          >
                            <FiStar size="0.85em" /> {course.rating ? 'Edit Review' : 'Rate'}
                          </PrimaryBtn>
                        </>
                      ) : (
                        <>
                          <PrimaryBtn
                            size="sm"
                            variant="outline-primary"
                            onClick={() => { setSelectedCourse(course); setShowCertModal(true); }}
                          >
                            <FiUpload size="0.85em" /> Upload Cert
                          </PrimaryBtn>
                        </>
                      )}
                      <PrimaryBtn
                        size="sm"
                        variant="outline-primary"
                        onClick={() => loadDiscussion(course)}
                      >
                        <FiMessageSquare size="0.85em" /> Forum
                      </PrimaryBtn>
                    </div>
                  </StyledListItem>
                );
              }) : (
                <ListGroup.Item className="text-center text-muted p-4">
                  No enrolled courses yet. Browse the catalogue to get started!
                </ListGroup.Item>
              )}
            </ListGroup>
          </SectionCard>
        </Col>
      </Row>
    </>
  );

  // ── Profile Tab ──────────────────────────────────────────────────────────
  const ProfileTab = () => (
    <Row className="g-4">
      <Col lg={4}>
        {/* Avatar + name card */}
        <SectionCard className="text-center p-3">
          <div
            style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem', cursor: 'pointer' }}
            onClick={() => avatarInputRef.current?.click()}
            title="Click to change profile picture"
          >
            {profilePicSrc ? (
              <img
                src={profilePicSrc}
                alt="Avatar"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${brand.primary}` }}
              />
            ) : (
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: brand.backgroundLight, border: `3px solid ${brand.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <FiUser size={40} color={brand.primary} />
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: brand.primary, border: 'none', borderRadius: '50%', padding: '0.3rem', color: 'white', display: 'flex', pointerEvents: 'none' }}>
              <FiCamera size={14} />
            </div>
            <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </div>
          <h5 style={{ fontWeight: 600, color: brand.text }}>{userDetails?.fullName || 'Your Name'}</h5>
          <p style={{ color: brand.textSub, fontSize: '0.85rem', marginBottom: '0.5rem' }}>{userDetails?.email}</p>
          <Badge bg="success" style={{ borderRadius: 50 }}>{userDetails?.role || 'learner'}</Badge>
        </SectionCard>
      </Col>

      <Col lg={8}>
        <SectionCard>
          <Card.Header>
            <FiEdit2 /> Personal Information
            {!editingProfile && (
              <PrimaryBtn size="sm" className="ms-auto" onClick={() => setEditingProfile(true)} style={{ padding: '0.3rem 0.9rem', fontSize: '0.8rem' }}>
                Edit
              </PrimaryBtn>
            )}
          </Card.Header>
          <Card.Body className="p-3">
            {editingProfile ? (
              <Form>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Full Name</Form.Label>
                      <Form.Control style={inputStyle} value={profileForm.fullName} onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Phone Number</Form.Label>
                      <Form.Control style={inputStyle} value={profileForm.phoneNumber} onChange={e => setProfileForm(p => ({ ...p, phoneNumber: e.target.value }))} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Country</Form.Label>
                      <Form.Select style={inputStyle} value={profileForm.country} onChange={e => setProfileForm(p => ({ ...p, country: e.target.value }))}>
                        <option value="">Select country</option>
                        {AFRICAN_COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Location (City/State)</Form.Label>
                      <Form.Control style={inputStyle} placeholder="e.g. Lagos, Nigeria" value={profileForm.location} onChange={e => setProfileForm(p => ({ ...p, location: e.target.value }))} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Gender</Form.Label>
                      <Form.Select style={inputStyle} value={profileForm.gender} onChange={e => setProfileForm(p => ({ ...p, gender: e.target.value }))}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: 13, fontWeight: 600 }}>Bio</Form.Label>
                      <Form.Control
                        as="textarea" rows={3} style={{ ...inputStyle, height: 'auto' }}
                        placeholder="Tell us about yourself..."
                        value={profileForm.bio}
                        onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 mt-3">
                  <PrimaryBtn onClick={handleProfileSave} disabled={profileSaving}>
                    {profileSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save Changes'}
                  </PrimaryBtn>
                  <Button variant="light" onClick={() => { setEditingProfile(false); setProfilePicFile(null); setProfilePicPreview(null); }}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <Row className="g-2">
                {[
                  ['Full Name', userDetails?.fullName],
                  ['Phone', userDetails?.phoneNumber],
                  ['Country', userDetails?.country],
                  ['Location', userDetails?.location],
                  ['Gender', userDetails?.gender],
                ].map(([label, val]) => (
                  <Col sm={6} key={label}>
                    <p style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: brand.textSub, display: 'block' }}>{label}</span>
                      <strong style={{ color: brand.text }}>{val || '—'}</strong>
                    </p>
                  </Col>
                ))}
                <Col sm={12}>
                  <p style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: brand.textSub, display: 'block' }}>Bio</span>
                    <span style={{ color: brand.text }}>{userDetails?.bio || '—'}</span>
                  </p>
                </Col>
              </Row>
            )}
          </Card.Body>
        </SectionCard>
      </Col>
    </Row>
  );

  // ── Goals Tab ────────────────────────────────────────────────────────────
  const GoalsTab = () => (
    <Row className="g-4">
      {/* Goals & Interests */}
      <Col lg={12}>
        <SectionCard>
          <Card.Header><FiTarget /> Learning Goals & Interests</Card.Header>
          <Card.Body className="p-3">
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>What is your primary learning goal?</Form.Label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {LEARNING_GOALS.map(g => (
                  <TagChip
                    key={g}
                    selected={goalsForm.primary_goal === g}
                    onClick={() => setGoalsForm(p => ({ ...p, primary_goal: p.primary_goal === g ? '' : g }))}
                  >
                    {g}
                  </TagChip>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Interests in Learning <span style={{ color: brand.textSub, fontWeight: 400 }}>(select all that apply)</span></Form.Label>
              <Form.Control
                placeholder="Filter interests..."
                value={interestSearch}
                onChange={e => setInterestSearch(e.target.value)}
                style={{ marginBottom: 10, borderColor: brand.primary, borderRadius: 20, fontSize: 13 }}
              />
              <div className="d-flex flex-wrap gap-2 mt-1">
                {INTERESTS
                  .filter(i => i.toLowerCase().includes(interestSearch.toLowerCase()))
                  .map(interest => (
                    <TagChip
                      key={interest}
                      selected={goalsForm.interests.includes(interest)}
                      onClick={() => setGoalsForm(p => ({
                        ...p,
                        interests: p.interests.includes(interest)
                          ? p.interests.filter(i => i !== interest)
                          : [...p.interests, interest],
                      }))}
                    >
                      {interest}
                    </TagChip>
                  ))}
                {/* Custom interest via search input if no match */}
                {interestSearch.trim() &&
                  !INTERESTS.some(i => i.toLowerCase() === interestSearch.trim().toLowerCase()) &&
                  !goalsForm.interests.some(i => i.toLowerCase() === interestSearch.trim().toLowerCase()) && (
                    <TagChip
                      onClick={() => {
                        setGoalsForm(p => ({ ...p, interests: [...p.interests, interestSearch.trim()] }));
                        setInterestSearch('');
                      }}
                      style={{ borderStyle: 'dashed' }}
                    >
                      + Add "{interestSearch.trim()}"
                    </TagChip>
                  )}
              </div>
              {goalsForm.interests.length > 0 && (
                <div style={{ marginTop: 8, fontSize: 12, color: brand.textSub }}>
                  Selected: {goalsForm.interests.join(', ')}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Target Industries</Form.Label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {INDUSTRIES.map(ind => (
                  <TagChip
                    key={ind}
                    selected={goalsForm.target_industries.includes(ind)}
                    onClick={() => setGoalsForm(p => ({
                      ...p,
                      target_industries: p.target_industries.includes(ind)
                        ? p.target_industries.filter(i => i !== ind)
                        : [...p.target_industries, ind],
                    }))}
                  >
                    {ind}
                  </TagChip>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Target Roles <span style={{ color: brand.textSub, fontWeight: 400 }}>(comma-separated)</span></Form.Label>
              <Form.Control
                style={inputStyle}
                placeholder="e.g. Frontend Developer, Data Analyst"
                value={goalsForm.target_roles}
                onChange={e => setGoalsForm(p => ({ ...p, target_roles: e.target.value }))}
              />
            </Form.Group>

            <PrimaryBtn onClick={handleGoalsSave} disabled={goalsSaving}>
              {goalsSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save Goals & Interests'}
            </PrimaryBtn>
          </Card.Body>
        </SectionCard>
      </Col>

      {/* Availability */}
      <Col lg={6}>
        <SectionCard>
          <Card.Header><FiCalendar /> Availability & Learning Pace</Card.Header>
          <Card.Body className="p-3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Hours Available Per Week</Form.Label>
                <Form.Control
                  type="number" min={1} max={168} style={inputStyle}
                  placeholder="e.g. 10"
                  value={availForm.weekly_hours}
                  onChange={e => setAvailForm(p => ({ ...p, weekly_hours: e.target.value }))}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Motivation Level</Form.Label>
                <Form.Select style={inputStyle} value={availForm.motivation_level} onChange={e => setAvailForm(p => ({ ...p, motivation_level: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="low">Low – I need some encouragement</option>
                  <option value="medium">Medium – I'm fairly motivated</option>
                  <option value="high">High – I'm very driven</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Preferred Device</Form.Label>
                <Form.Select style={inputStyle} value={availForm.device} onChange={e => setAvailForm(p => ({ ...p, device: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="phone">Mobile Phone</option>
                  <option value="pc">PC / Laptop</option>
                  <option value="both">Both</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Preferred Learning Style</Form.Label>
                <Form.Select style={inputStyle} value={availForm.preferred_learning_style} onChange={e => setAvailForm(p => ({ ...p, preferred_learning_style: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="video">Video-based</option>
                  <option value="reading">Reading / Articles</option>
                  <option value="hands-on">Hands-on / Projects</option>
                  <option value="live">Live classes</option>
                  <option value="mixed">Mixed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>Budget Range</Form.Label>
                <Form.Select style={inputStyle} value={availForm.budget} onChange={e => setAvailForm(p => ({ ...p, budget: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="free">Free only</option>
                  <option value="low">Low (under $20)</option>
                  <option value="medium">Medium ($20–$100)</option>
                  <option value="high">High ($100+)</option>
                </Form.Select>
              </Form.Group>
              <PrimaryBtn onClick={handleAvailSave} disabled={availSaving}>
                {availSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save Preferences'}
              </PrimaryBtn>
            </Form>
          </Card.Body>
        </SectionCard>
      </Col>

      {/* Social & Academic */}
      <Col lg={6}>
        <SectionCard>
          <Card.Header><FiLink /> Social & Academic Profiles <span style={{ fontSize: '0.75rem', color: brand.textSub, fontWeight: 400 }}>(optional)</span></Card.Header>
          <Card.Body className="p-3">
            <p style={{ fontSize: 13, color: brand.textSub, marginBottom: '1rem' }}>
              Connect your professional and academic profiles to help sponsors and mentors find you.
            </p>
            <Form>
              {[
                { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/yourname' },
                { key: 'twitter', label: 'Twitter / X Handle', placeholder: '@yourhandle' },
                { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/yourname' },
                { key: 'portfolio', label: 'Portfolio / Website URL', placeholder: 'https://yourportfolio.com' },
              ].map(({ key, label, placeholder }) => (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>{label}</Form.Label>
                  <Form.Control style={inputStyle} placeholder={placeholder} value={socialForm[key]} onChange={e => setSocialForm(p => ({ ...p, [key]: e.target.value }))} />
                </Form.Group>
              ))}

              <hr />
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: '0.75rem' }}>Academic Background</p>
              {[
                { key: 'institution', label: 'Institution / School', placeholder: 'University of Lagos' },
                { key: 'fieldOfStudy', label: 'Field of Study', placeholder: 'Computer Science' },
                { key: 'highestDegree', label: 'Highest Degree', placeholder: 'B.Sc, HND, OND, etc.' },
                { key: 'certifications', label: 'Certifications (comma-separated)', placeholder: 'AWS Cloud, Google Data Analytics' },
              ].map(({ key, label, placeholder }) => (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>{label}</Form.Label>
                  <Form.Control style={inputStyle} placeholder={placeholder} value={academicForm[key]} onChange={e => setAcademicForm(p => ({ ...p, [key]: e.target.value }))} />
                </Form.Group>
              ))}

              <PrimaryBtn onClick={handleSocialSave} disabled={socialSaving}>
                {socialSaving ? <><Spinner animation="border" size="sm" className="me-1" /> Saving...</> : 'Save Profiles'}
              </PrimaryBtn>
            </Form>
          </Card.Body>
        </SectionCard>
      </Col>
    </Row>
  );

  // ── Courses Tab ──────────────────────────────────────────────────────────
  const CoursesTab = () => (
    <>
      {/* Wishlist */}
      {wishlist.length > 0 && (
        <SectionCard className="mb-4">
          <Card.Header><FiHeart /> My Wishlist ({wishlist.length})</Card.Header>
          <ListGroup variant="flush">
            {wishlist.map(item => (
              <StyledListItem key={item._id} iconColor={brand.primary}>
                <div className="icon-wrap"><FiHeart /></div>
                <div className="content" style={{ flex: 1 }}>
                  <h6>{item.title}</h6>
                  <p className="text-muted">
                    {item.platform} &middot; {item.status === 'Free' ? 'Free' : `${item.priceUnit || '$'}${item.price || ''}`}
                  </p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <PrimaryBtn size="sm" variant="outline-primary"><FiExternalLink size="0.85em" /> View</PrimaryBtn>
                  </a>
                  <PrimaryBtn
                    size="sm"
                    variant="outline-danger"
                    onClick={async () => {
                      try {
                        await axios.delete(`${BASE_URL}/dashboard/wishlist/${item._id}`, { headers: authHeader() });
                        setWishlist(prev => prev.filter(w => w._id !== item._id));
                        toast.success('Removed from wishlist.');
                      } catch {
                        toast.error('Could not remove item.');
                      }
                    }}
                  >
                    <FiTrash2 size="0.85em" />
                  </PrimaryBtn>
                </div>
              </StyledListItem>
            ))}
          </ListGroup>
        </SectionCard>
      )}

      {/* Course Catalogue */}
      <SectionCard>
        <Card.Header><FiGrid /> Browse Course Catalogue</Card.Header>
        <Card.Body className="p-3">
          {/* Search */}
          <div className="d-flex gap-2 mb-4">
            <Form.Control
              style={{ ...inputStyle, flex: 1 }}
              placeholder="Search courses..."
              value={catSearch}
              onChange={e => setCatSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { setCatPage(1); fetchCatalogue(catSearch, 1); } }}
            />
            <PrimaryBtn onClick={() => { setCatPage(1); fetchCatalogue(catSearch, 1); }}>
              Search
            </PrimaryBtn>
          </div>

          {catLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: brand.primary }} />
              <p className="mt-2 text-muted">Loading courses...</p>
            </div>
          ) : catalogue.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FiBookOpen size={36} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <p>No courses found. Try a different search.</p>
            </div>
          ) : (
            <>
              <Row className="g-3">
                {catalogue.map(course => {
                  const inWishlist = wishlist.some(w => w.courseId === course._id || w.title === course.title);
                  const alreadyEnrolled = dashboardCourses.some(dc => dc.title === course.title);
                  const isFree = course.status === 'Free';
                  return (
                    <Col md={4} sm={6} key={course._id}>
                      <CourseCard>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Badge bg={isFree ? 'success' : 'warning'} style={{ borderRadius: 50 }}>
                              {isFree ? 'Free' : `${course.priceUnit || '$'}${course.price || ''}`}
                            </Badge>
                            <button
                              onClick={() => handleWishlistToggle(course)}
                              disabled={wishlistLoading[course._id]}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: inWishlist ? brand.danger : brand.greyMid }}
                              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                              {wishlistLoading[course._id]
                                ? <Spinner animation="border" size="sm" />
                                : <FiHeart size={18} fill={inWishlist ? brand.danger : 'none'} />
                              }
                            </button>
                          </div>
                          <div className="card-title">{course.title}</div>
                          <p className="card-text mb-2">
                            {course.description?.length > 80
                              ? `${course.description.slice(0, 80)}...`
                              : course.description || ''}
                          </p>
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {course.platform && <Badge bg="secondary" style={{ borderRadius: 50, fontSize: '0.7rem' }}>{course.platform}</Badge>}
                            {course.level && <Badge bg="light" text="dark" style={{ borderRadius: 50, fontSize: '0.7rem' }}>{course.level}</Badge>}
                          </div>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant="light"
                              style={{ flex: 1, borderRadius: 8, fontSize: '0.78rem' }}
                              onClick={() => setSelectedCatCourse(course)}
                            >
                              Details
                            </Button>
                            {isFree ? (
                              <PrimaryBtn
                                size="sm"
                                style={{ flex: 1, fontSize: '0.78rem' }}
                                disabled={alreadyEnrolled || enrollingId === course._id}
                                onClick={() => !alreadyEnrolled && handleEnroll(course)}
                              >
                                {enrollingId === course._id
                                  ? <Spinner animation="border" size="sm" />
                                  : alreadyEnrolled ? 'Enrolled' : 'Enroll Free'}
                              </PrimaryBtn>
                            ) : (
                              <a href="/help" style={{ flex: 1 }}>
                                <Button
                                  size="sm"
                                  variant="warning"
                                  style={{ width: '100%', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600 }}
                                >
                                  Get Sponsored
                                </Button>
                              </a>
                            )}
                          </div>
                        </Card.Body>
                      </CourseCard>
                    </Col>
                  );
                })}
              </Row>

              {/* Pagination */}
              {catPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-4">
                  <PrimaryBtn
                    size="sm"
                    variant="outline-primary"
                    disabled={catPage <= 1}
                    onClick={() => setCatPage(p => p - 1)}
                  >
                    Previous
                  </PrimaryBtn>
                  <span className="align-self-center text-muted" style={{ fontSize: '0.85rem' }}>
                    Page {catPage} of {catPages}
                  </span>
                  <PrimaryBtn
                    size="sm"
                    variant="outline-primary"
                    disabled={catPage >= catPages}
                    onClick={() => setCatPage(p => p + 1)}
                  >
                    Next
                  </PrimaryBtn>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </SectionCard>
    </>
  );

  // ─── Messages Tab ─────────────────────────────────────────────────────────
  const MessagesTab = () => (
    <Row className="g-4">
      {/* Thread list */}
      <Col md={4}>
        <SectionCard style={{ maxHeight: 600, overflowY: 'auto' }}>
          <Card.Header><FiMessageSquare /> Sponsor Messages</Card.Header>
          {msgLoading ? (
            <div className="text-center py-4"><Spinner animation="border" size="sm" style={{ color: brand.primary }} /></div>
          ) : msgThreads.length === 0 ? (
            <div className="text-center text-muted p-4" style={{ fontSize: 13 }}>
              No messages yet. Sponsors who fund your courses can message you here.
            </div>
          ) : (
            <ListGroup variant="flush">
              {msgThreads.map(t => (
                <ListGroup.Item
                  key={t.threadId}
                  action
                  active={selectedThread?.threadId === t.threadId}
                  onClick={() => setSelectedThread(t)}
                  style={{ cursor: 'pointer', padding: '0.9rem 1rem' }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.sponsor?.fullName || 'Sponsor'}</div>
                  <div style={{ fontSize: 11, color: brand.textSub, marginTop: 2 }}>{t.courseTitle}</div>
                  {t.lastMessage && (
                    <div style={{ fontSize: 11, color: brand.textSub, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {t.lastMessage.content}
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </SectionCard>
      </Col>

      {/* Thread messages + reply */}
      <Col md={8}>
        {!selectedThread ? (
          <SectionCard>
            <Card.Body className="text-center py-5">
              <FiMessageSquare size={40} color={brand.greyMid} style={{ marginBottom: 12 }} />
              <p style={{ color: brand.textSub, fontSize: 14 }}>Select a conversation to read and reply.</p>
            </Card.Body>
          </SectionCard>
        ) : (
          <SectionCard>
            <Card.Header>
              <FiMessageSquare /> {selectedThread.sponsor?.fullName} — <span style={{ fontWeight: 400, fontSize: 13 }}>{selectedThread.courseTitle}</span>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              {/* Messages */}
              <div style={{ maxHeight: 380, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedThread.messages.map((msg, idx) => {
                  const isMine = String(msg.senderId) === String(userDetails?._id) ||
                    (msg.senderId?._id && String(msg.senderId._id) === String(userDetails?._id));
                  return (
                    <div key={idx} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '75%',
                        background: isMine ? brand.primary : brand.greyLight,
                        color: isMine ? '#fff' : brand.text,
                        borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        padding: '0.6rem 0.9rem',
                        fontSize: 13,
                      }}>
                        <p style={{ margin: 0 }}>{msg.content}</p>
                        <p style={{ margin: '4px 0 0', fontSize: 10, opacity: 0.7, textAlign: 'right' }}>
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={msgBottomRef} />
              </div>

              {/* Reply input */}
              <div style={{ borderTop: `1px solid ${brand.greyLight}`, padding: '0.75rem 1rem', display: 'flex', gap: 8 }}>
                <Form.Control
                  placeholder="Type a reply..."
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleReply()}
                  style={{ borderColor: brand.primary, borderRadius: 20, fontSize: 13 }}
                />
                <PrimaryBtn onClick={handleReply} disabled={replying || !replyContent.trim()} style={{ borderRadius: 20, padding: '0.4rem 1rem' }}>
                  {replying ? <Spinner animation="border" size="sm" /> : <FiSend size={14} />}
                </PrimaryBtn>
              </div>
            </Card.Body>
          </SectionCard>
        )}
      </Col>
    </Row>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <DashboardWrapper>
      <GlobalStyle />

      {/* Navbar */}
      <StyledNavbar expand="lg">
        <Container>
          <Navbar.Brand href="/"><img src={Logo} alt="Motivar" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link href="/explore">Explore</Nav.Link>
              <NavDropdown title="Programs" id="programs-dd">
                <NavDropdown.Item as={Link} to="/coming-soon">DAP</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coming-soon">DigiAccess</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Community" id="community-dd">
                <NavDropdown.Item as={Link} to="/coming-soon">Find learners near you</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coming-soon">Find mentors near you</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/coming-soon">Join accountability group</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <PrimaryBtn variant="outline-danger" onClick={handleLogout}>
              <FiLogOut /> Logout
            </PrimaryBtn>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <DashboardContainer fluid="lg">
        {/* Welcome Header */}
        {userDetails && (
          <WelcomeHeader>
            <div>
              {profilePicSrc ? (
                <img src={profilePicSrc} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${brand.primary}` }} />
              ) : (
                <div style={{ background: brand.backgroundLight, padding: '0.75rem', borderRadius: '50%', display: 'inline-flex' }}>
                  <FiUser size={28} color={brand.primary} />
                </div>
              )}
            </div>
            <div>
              <h1>Welcome back, {userDetails.fullName || 'Learner'}!</h1>
              <p>Manage your courses, track progress, and grow your skills.</p>
            </div>
          </WelcomeHeader>
        )}

        {/* Tab Navigation */}
        <TabNav>
          {[
            { key: 'overview', icon: <FiGrid />, label: 'Overview' },
            { key: 'profile', icon: <FiUser />, label: 'My Profile' },
            { key: 'goals', icon: <FiTarget />, label: 'Goals & Availability' },
            { key: 'courses', icon: <FiBookOpen />, label: 'Courses & Wishlist' },
            { key: 'messages', icon: <FiMessageSquare />, label: 'Messages' },
          ].map(({ key, icon, label }) => (
            <TabBtn key={key} active={activeTab === key} onClick={() => setActiveTab(key)}>
              {icon} {label}
            </TabBtn>
          ))}
        </TabNav>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'courses' && <CoursesTab />}
        {activeTab === 'messages' && <MessagesTab />}
      </DashboardContainer>

      <StyledFooter>
        <p>Copyright © {new Date().getFullYear()} Motivar Learning Technologies</p>
      </StyledFooter>

      {/* Initial Profile Completion Modal */}
      <CompleteProfileModal
        show={showProfileModal}
        onComplete={({ fullName }) => {
          setShowProfileModal(false);
          setUserDetails(prev => ({ ...prev, fullName }));
          setRefreshKey(k => k + 1);
        }}
      />

      {/* ── Review / Rating Modal ─────────────────────────────────── */}
      <StyledModal show={showReviewModal} onHide={() => !reviewSubmitting && setShowReviewModal(false)} centered>
        <Modal.Header closeButton={!reviewSubmitting}>
          <Modal.Title>Rate This Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: 13, color: brand.textSub, marginBottom: '1rem' }}>
            <strong>{reviewCourse?.title}</strong>
          </p>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: 14 }}>Your Rating</p>
          <div className="d-flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setReviewScore(s)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 28,
                  color: s <= reviewScore ? '#ffc107' : '#ddd',
                  padding: 0, lineHeight: 1,
                }}
              >
                ★
              </button>
            ))}
            {reviewScore > 0 && (
              <span style={{ fontSize: 13, color: brand.textSub, alignSelf: 'center', marginLeft: 8 }}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][reviewScore]}
              </span>
            )}
          </div>
          <Form.Group>
            <Form.Label style={{ fontSize: 14, fontWeight: 600 }}>Review (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share what you learned or what could be improved..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              style={{ ...inputStyle, height: 'auto', resize: 'none' }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowReviewModal(false)} disabled={reviewSubmitting}>Cancel</Button>
          <PrimaryBtn onClick={handleSubmitReview} disabled={reviewSubmitting || !reviewScore}>
            {reviewSubmitting ? <><Spinner animation="border" size="sm" className="me-1" /> Submitting...</> : 'Submit Review'}
          </PrimaryBtn>
        </Modal.Footer>
      </StyledModal>

      {/* ── Discussion Forum Modal ─────────────────────────────────── */}
      <StyledModal show={showDiscModal} onHide={() => setShowDiscModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title><FiMessageSquare className="me-2" />{discCourse?.title} — Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {discLoading ? (
            <div className="text-center py-4"><Spinner animation="border" style={{ color: brand.primary }} /></div>
          ) : discPosts.length === 0 ? (
            <div className="text-center text-muted py-4">
              <FiMessageSquare size={32} style={{ marginBottom: 8 }} />
              <p>No posts yet. Be the first to start a discussion!</p>
            </div>
          ) : (
            discPosts.map((post, idx) => (
              <div key={post._id || idx} style={{ background: brand.backgroundLight, borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '0.75rem', borderLeft: `3px solid ${brand.primary}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FiUser size={14} color="#fff" />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 13, color: brand.text }}>
                    {post.userId?.fullName || 'Learner'}
                  </span>
                  <span style={{ fontSize: 11, color: brand.textSub, marginLeft: 'auto' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: brand.text, lineHeight: 1.6 }}>{post.message}</p>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer style={{ flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <Form.Control
              placeholder="Write a message to the forum..."
              value={discMessage}
              onChange={e => setDiscMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handlePostDiscussion()}
              style={{ ...inputStyle, height: 42, flex: 1 }}
              disabled={discPosting}
            />
            <PrimaryBtn onClick={handlePostDiscussion} disabled={discPosting || !discMessage.trim()} style={{ minWidth: 90 }}>
              {discPosting ? <Spinner animation="border" size="sm" /> : <><FiSend size="0.9em" /> Post</>}
            </PrimaryBtn>
          </div>
        </Modal.Footer>
      </StyledModal>

      {/* ── Moji EduBuddy ─────────────────────────────────────────── */}
      <MojiChatbot />

      {/* Certificate Upload Modal */}
      {selectedCourse && (
        <StyledModal show={showCertModal} onHide={() => !isUploading && setShowCertModal(false)} centered>
          <Modal.Header closeButton={!isUploading}>
            <Modal.Title>Upload Certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: 13, color: brand.textSub, marginBottom: '1rem' }}>
              Course: <strong>{selectedCourse.title}</strong>
            </p>
            {isUploading ? (
              <div className="text-center py-3">
                <Spinner animation="border" variant="success" />
                <p className="mt-2 mb-0 text-muted">Uploading...</p>
              </div>
            ) : (
              <Form.Group>
                <Form.Label>Select file (PDF, JPG, PNG — max 512 KB)</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file && file.size > 512 * 1024) {
                      toast.error('File must not exceed 512 KB.');
                      e.target.value = '';
                      setSelectedFile(null);
                    } else {
                      setSelectedFile(file);
                    }
                  }}
                />
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowCertModal(false)} disabled={isUploading}>Cancel</Button>
            <PrimaryBtn onClick={handleUploadCertificate} disabled={!selectedFile || isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Certificate'}
            </PrimaryBtn>
          </Modal.Footer>
        </StyledModal>
      )}

      {/* Course Detail Modal */}
      {selectedCatCourse && (
        <StyledModal show={!!selectedCatCourse} onHide={() => setSelectedCatCourse(null)} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCatCourse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex gap-2 flex-wrap mb-3">
              <Badge bg={selectedCatCourse.status === 'Free' ? 'success' : 'warning'} style={{ borderRadius: 50 }}>
                {selectedCatCourse.status === 'Free' ? 'Free' : `${selectedCatCourse.priceUnit || '$'}${selectedCatCourse.price || ''}`}
              </Badge>
              {selectedCatCourse.level && <Badge bg="secondary" style={{ borderRadius: 50 }}>{selectedCatCourse.level}</Badge>}
              {selectedCatCourse.platform && <Badge bg="light" text="dark" style={{ borderRadius: 50 }}>{selectedCatCourse.platform}</Badge>}
            </div>
            <p style={{ color: brand.textSub, fontSize: 14 }}>{selectedCatCourse.description || 'No description available.'}</p>
            {selectedCatCourse.ratings && (
              <p style={{ marginBottom: '0.5rem' }}>
                <FiStar style={{ color: '#ffc107' }} /> Rating: <strong>{selectedCatCourse.ratings}/5</strong>
              </p>
            )}
            {selectedCatCourse.tags?.length > 0 && (
              <div className="d-flex flex-wrap gap-1 mt-2">
                {selectedCatCourse.tags.map(t => (
                  <Badge key={t} bg="light" text="dark" style={{ borderRadius: 50, border: '1px solid #ddd' }}>{t}</Badge>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <a href={selectedCatCourse.url} target="_blank" rel="noopener noreferrer">
              <PrimaryBtn variant="outline-primary"><FiExternalLink /> View Course</PrimaryBtn>
            </a>
            {selectedCatCourse.status === 'Free' ? (
              <PrimaryBtn
                disabled={
                  dashboardCourses.some(dc => dc.title === selectedCatCourse.title) ||
                  enrollingId === selectedCatCourse._id
                }
                onClick={() => { setSelectedCatCourse(null); handleEnroll(selectedCatCourse); }}
              >
                {enrollingId === selectedCatCourse._id
                  ? <><Spinner animation="border" size="sm" className="me-1" /> Enrolling...</>
                  : dashboardCourses.some(dc => dc.title === selectedCatCourse.title)
                    ? 'Already Enrolled'
                    : 'Enroll Free'}
              </PrimaryBtn>
            ) : (
              <a href="/help">
                <Button variant="warning" style={{ borderRadius: 50, fontWeight: 600 }}>Get Sponsored</Button>
              </a>
            )}
          </Modal.Footer>
        </StyledModal>
      )}
    </DashboardWrapper>
  );
};

export default LearnerDashboard;
