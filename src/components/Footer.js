/* eslint-disable */


import React from "react";
import {
  FooterContainer,
  TopSection,
  LogoAndSocials,
  Logo,
  SocialIcons,
  LinkSections,
  LinkGroup,
  LinkTitle,
  FooterLink,
  BottomBar,
} from "./footer.styles";

import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import logo from "../assets/images/logo.svg";
import { StyledImage } from "./images";

const Footer = () => {
  return (
    <FooterContainer>
      <TopSection>
        <LogoAndSocials>
          <StyledImage src={logo} width={"100%"} height={"100%"} />
          <h4 style={{fontSize: '14px',fontWeight: "400", fontStyle: "italic", marginTop: "20px"}}>
            Find Us on Social Media:
          </h4>
          <SocialIcons>
            <a href="https://x.com/_Motivar/">
              <FaXTwitter />
            </a>
            <a href="https://www.linkedin.com/company/motivar-africa">
              <FaLinkedinIn />
            </a>
            <a href="https://www.facebook.com/people/Motivar/61575912054718/">
              <FaFacebookF />
            </a>
          </SocialIcons>
        </LogoAndSocials>

        <LinkSections>
          <LinkGroup>
            <LinkTitle>COMPANY</LinkTitle>
            <FooterLink href="/coming-soon">About us</FooterLink>
            <FooterLink href="/coming-soon">Pricing</FooterLink>
            <FooterLink href="mailto:contact@motivar.live">Contact</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>PRODUCT</LinkTitle>
            <FooterLink href="/explore">Course finder</FooterLink>
            <FooterLink href="/help-learner">Sponsor a learner</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>PROGRAMS</LinkTitle>
            <FooterLink href="/coming-soon">DigiAccess</FooterLink>
            <FooterLink href="/coming-soon">DAP</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>RESOURCES</LinkTitle>
            <FooterLink href="/#faqs">FAQs</FooterLink>
            <FooterLink href="/coming-soon">Blog</FooterLink>
          </LinkGroup>
        </LinkSections>
      </TopSection>

      <BottomBar>Copyright © 2025 Motivar Learning Technologies</BottomBar>
    </FooterContainer>
  );
};

export default Footer;
