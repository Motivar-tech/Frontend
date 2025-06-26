import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #fff;
  padding: 60px 20px 20px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopSection = styled.div`
  width: 100%;
  max-width: 1500px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LogoAndSocials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const Logo = styled.img`
  width: 130px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    width: 100px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  font-size: 20px;

  a {
    color: #000;
    transition: 0.3s ease;

    &:hover {
      color: #007b7f;
    }
  }
`;

export const LinkSections = styled.div`
  display: flex;
  gap: 60px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

export const LinkGroup = styled.div`
  min-width: 140px;
`;

export const LinkTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const FooterLink = styled.a`
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  text-decoration: none;

  &:hover {
    color: #007b7f;
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #555;
`;
