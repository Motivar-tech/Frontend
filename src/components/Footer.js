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
          <SocialIcons>
            <a href="#">
              <FaXTwitter />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
          </SocialIcons>
        </LogoAndSocials>

        <LinkSections>
          <LinkGroup>
            <LinkTitle>COMPANY</LinkTitle>
            <FooterLink href="#">About us</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>PRODUCT</LinkTitle>
            <FooterLink href="#">Course finder</FooterLink>
            <FooterLink href="#">Sponsor a learner</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>PROGRAMS</LinkTitle>
            <FooterLink href="#">DigiAccess</FooterLink>
            <FooterLink href="#">DAP</FooterLink>
          </LinkGroup>

          <LinkGroup>
            <LinkTitle>RESOURCES</LinkTitle>
            <FooterLink href="#">FAQs</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
          </LinkGroup>
        </LinkSections>
      </TopSection>

      <BottomBar>Copyright © 2025 Motivar Learning Technologies</BottomBar>
    </FooterContainer>
  );
};

export default Footer;
