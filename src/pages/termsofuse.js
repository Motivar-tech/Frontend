/*eslint-disable*/

import React from 'react';
import styled from 'styled-components';


const BodyContainer = styled.div`
  margin: 0;
  padding: 20px;
  background-color: #f9fafb;

  * {
    background: transparent !important;
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.span`
  display: block;
  margin: 0 auto 3.125rem;
  width: 11.125rem;
  height: 2.375rem;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAxNzggMzgiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRDFEMUQxIiBkPSJNNC4yODMgMjQuMTA3Yy0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY2LS43NjhoLS4wODVjLjA1Ny41MDIuMDg2Ljc5Mi4wODYuODd2Mi40MzRILjk4NXYtOC42NDhoMS4zMzJsLjIzMS43NzloLjA3NmMuMzgzLS41OTQuOTUtLjg5MiAxLjcwMi0uODkyLjcxIDAgMS4yNjQuMjc0IDEuNjY1LjgyMi40MDEuNTQ4LjYwMiAxLjMwOS42MDIgMi4yODMgMCAuNjQtLjA5NCAxLjE5OC0uMjgyIDEuNjctLjE4OC40NzMtLjQ1Ni44MzMtLjgwMyAxLjA4LS4zNDcuMjQ3LS43NTYuMzctMS4yMjUuMzd6TTMuOCAxOS4xOTNjLS40MDUgMC0uNy4xMjQtLjg4Ni4zNzMtLjE4Ny4yNDktLjI4My42Ni0uMjkgMS4yMzN2LjE3N2MwIC42NDUuMDk1IDEuMTA3LjI4NyAxLjM4Ni4xOTIuMjguNDk1LjQxOS45MS40MTkuNzM0IDAgMS4xMDEtLjYwNSAxLjEwMS0xLjgxNiAwLS41OS0uMDktMS4wMzQtLjI3LTEuMzI5LS4xODItLjI5NS0uNDY1LS40NDMtLjg1Mi0uNDQzem01LjU3IDEuNzk0YzAgLjU5NC4wOTggMS4wNDQuMjkzIDEuMzQ4LjE5Ni4zMDQuNTEzLjQ1Ny45NTQuNDU3LjQzNyAwIC43NS0uMTUyLjk0Mi0uNDU0LjE5Mi0uMzAzLjI4OC0uNzUzLjI4OC0xLjM1MSAwLS41OTUtLjA5Ny0xLjA0LS4yOS0xLjMzOC0uMTk0LS4yOTctLjUxLS40NDUtLjk1LS40NDUtLjQzOCAwLS43NTMuMTQ3LS45NDYuNDQzLS4xOTQuMjk1LS4yOS43NDItLjI5IDEuMzR6bTQuMTUzIDBjMCAuOTc3LS4yNTggMS43NDItLjc3NCAyLjI5My0uNTE1LjU1Mi0xLjIzMy44MjctMi4xNTQuODI3LS41NzYgMC0xLjA4NS0uMTI2LTEuNTI1LS4zNzhhMi41MiAyLjUyIDAgMCAxLTEuMDE1LTEuMDg4Yy0uMjM3LS40NzMtLjM1NS0xLjAyNC0uMzU1LTEuNjU0IDAtLjk4MS4yNTYtMS43NDQuNzY4LTIuMjg4LjUxMi0uNTQ1IDEuMjMyLS44MTcgMi4xNi0uODE3LjU3NiAwIDEuMDg1LjEyNiAxLjUyNS4zNzYuNDQuMjUxLjc3OS42MSAxLjAxNSAxLjA4LjIzNi40NjkuMzU1IDEuMDE5LjM1NSAxLjY0OXpNMTkuNzEgMjRsLS40NjItMi4xLS42MjMtMi42NTNoLS4wMzdMMTcuNDkzIDI0SDE1LjczbC0xLjcwOC02LjAwNWgxLjYzM2wuNjkzIDIuNjU5Yy4xMS40NzYuMjI0IDEuMTMzLjMzOCAxLjk3MWguMDMyYy4wMTUtLjI3Mi4wNzctLjcwNC4xODgtMS4yOTRsLjA4Ni0uNDU3Ljc0Mi0yLjg3OWgxLjgwNGwuNzA0IDIuODc5Yy4wMTQuMDc5LjAzNy4xOTUuMDY3LjM1YTIwLjk5OCAyMC45OTggMCAwIDEgLjE2NyAxLjAwMmMuMDIzLjE2NS4wMzYuMjk5LjA0LjM5OWguMDMyYy4wMzItLjI1OC4wOS0uNjExLjE3Mi0xLjA2LjA4Mi0uNDUuMTQxLS43NTQuMTc3LS45MTFsLjcyLTIuNjU5aDEuNjA2TDIxLjQ5NCAyNGgtMS43ODN6bTcuMDg2LTQuOTUyYy0uMzQ4IDAtLjYyLjExLS44MTcuMzMtLjE5Ny4yMi0uMzEuNTMzLS4zMzguOTM3aDIuMjk5Yy0uMDA4LS40MDQtLjExMy0uNzE3LS4zMTctLjkzNy0uMjA0LS4yMi0uNDgtLjMzLS44MjctLjMzem0uMjMgNS4wNmMtLjk2NiAwLTEuNzIyLS4yNjctMi4yNjYtLjgtLjU0NC0uNTM0LS44MTYtMS4yOS0uODE2LTIuMjY3IDAtMS4wMDcuMjUxLTEuNzg1Ljc1NC0yLjMzNC41MDMtLjU1IDEuMTk5LS44MjUgMi4wODctLjgyNS44NDggMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDcyLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MSAwIC43MDMtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45Mi4zMmE1Ljc5IDUuNzkgMCAwIDEtMS4xOTEuMTA0em03LjI1My02LjIyNmMuMjIyIDAgLjQwNi4wMTYuNTUzLjA0OWwtLjEyNCAxLjUzNmExLjg3NyAxLjg3NyAwIDAgMC0uNDgzLS4wNTRjLS41MjMgMC0uOTMuMTM0LTEuMjIyLjQwMy0uMjkyLjI2OC0uNDM4LjY0NC0uNDM4IDEuMTI4VjI0aC0xLjYzOHYtNi4wMDVoMS4yNGwuMjQyIDEuMDFoLjA4Yy4xODctLjMzNy40MzktLjYwOC43NTYtLjgxNGExLjg2IDEuODYgMCAwIDEgMS4wMzQtLjMwOXptNC4wMjkgMS4xNjZjLS4zNDcgMC0uNjIuMTEtLjgxNy4zMy0uMTk3LjIyLS4zMS41MzMtLjMzOC45MzdoMi4yOTljLS4wMDctLjQwNC0uMTEzLS43MTctLjMxNy0uOTM3LS4yMDQtLjIyLS40OC0uMzMtLjgyNy0uMzN6bS4yMyA1LjA2Yy0uOTY2IDAtMS43MjItLjI2Ny0yLjI2Ni0uOC0uNTQ0LS41MzQtLjgxNi0xLjI5LS44MTYtMi4yNjcgMC0xLjAwNy4yNTEtMS43ODUuNzU0LTIuMzM0LjUwNC0uNTUgMS4yLS44MjUgMi4wODctLjgyNS44NDkgMCAxLjUxLjI0MiAxLjk4Mi43MjUuNDczLjQ4NC43MDkgMS4xNTIuNzA5IDIuMDA0di43OTVoLTMuODczYy4wMTguNDY1LjE1Ni44MjkuNDE0IDEuMDkuMjU4LjI2MS42Mi4zOTIgMS4wODUuMzkyLjM2MiAwIC43MDQtLjAzNyAxLjAyNi0uMTEzYTUuMTMzIDUuMTMzIDAgMCAwIDEuMDEtLjM2djEuMjY4Yy0uMjg3LjE0My0uNTkzLjI1LS45MTkuMzJhNS43OSA1Ljc5IDAgMCAxLTEuMTkyLjEwNHptNS44MDMgMGMtLjcwNiAwLTEuMjYtLjI3NS0xLjY2My0uODIyLS40MDMtLjU0OC0uNjA0LTEuMzA3LS42MDQtMi4yNzggMC0uOTg0LjIwNS0xLjc1Mi42MTUtMi4zMDEuNDEtLjU1Ljk3NS0uODI1IDEuNjk1LS44MjUuNzU1IDAgMS4zMzIuMjk0IDEuNzI5Ljg4MWguMDU0YTYuNjk3IDYuNjk3IDAgMCAxLS4xMjQtMS4xOTh2LTEuOTIyaDEuNjQ0VjI0SDQ2LjQzbC0uMzE3LS43NzloLS4wN2MtLjM3Mi41OTEtLjk0Ljg4Ni0xLjcwMi44ODZ6bS41NzQtMS4zMDZjLjQyIDAgLjcyNi0uMTIxLjkyMS0uMzY1LjE5Ni0uMjQzLjMwMi0uNjU3LjMyLTEuMjR2LS4xNzhjMC0uNjQ0LS4xLTEuMTA2LS4yOTgtMS4zODYtLjE5OS0uMjc5LS41MjItLjQxOS0uOTctLjQxOWEuOTYyLjk2MiAwIDAgMC0uODUuNDY1Yy0uMjAzLjMxLS4zMDQuNzYtLjMwNCAxLjM1IDAgLjU5Mi4xMDIgMS4wMzUuMzA2IDEuMzMuMjA0LjI5Ni40OTYuNDQzLjg3NS40NDN6bTEwLjkyMi00LjkyYy43MDkgMCAxLjI2NC4yNzcgMS42NjUuODMuNC41NTMuNjAxIDEuMzEyLjYwMSAyLjI3NSAwIC45OTItLjIwNiAxLjc2LS42MiAyLjMwNC0uNDE0LjU0NC0uOTc3LjgxNi0xLjY5LjgxNi0uNzA1IDAtMS4yNTgtLjI1Ni0xLjY1OS0uNzY4aC0uMTEzbC0uMjc0LjY2MWgtMS4yNTF2LTguMzU3aDEuNjM4djEuOTQ0YzAgLjI0Ny0uMDIxLjY0My0uMDY0IDEuMTg3aC4wNjRjLjM4My0uNTk0Ljk1LS44OTIgMS43MDMtLjg5MnptLS41MjcgMS4zMWMtLjQwNCAwLS43LjEyNS0uODg2LjM3NC0uMTg2LjI0OS0uMjgzLjY2LS4yOSAxLjIzM3YuMTc3YzAgLjY0NS4wOTYgMS4xMDcuMjg3IDEuMzg2LjE5Mi4yOC40OTUuNDE5LjkxLjQxOS4zMzcgMCAuNjA1LS4xNTUuODA0LS40NjUuMTk5LS4zMS4yOTgtLjc2LjI5OC0xLjM1IDAtLjU5MS0uMS0xLjAzNS0uMy0xLjMzYS45NDMuOTQzIDAgMCAwLS44MjMtLjQ0M3ptMy4xODYtMS4xOTdoMS43OTRsMS4xMzQgMy4zNzljLjA5Ni4yOTMuMTYzLjY0LjE5OCAxLjA0MmguMDMzYy4wMzktLjM3LjExNi0uNzE3LjIzLTEuMDQybDEuMTEyLTMuMzc5aDEuNzU3bC0yLjU0IDYuNzczYy0uMjM0LjYyNy0uNTY2IDEuMDk2LS45OTcgMS40MDctLjQzMi4zMTItLjkzNi40NjgtMS41MTIuNDY4LS4yODMgMC0uNTYtLjAzLS44MzMtLjA5MnYtMS4zYTIuOCAyLjggMCAwIDAgLjY0NS4wN2MuMjkgMCAuNTQzLS4wODguNzYtLjI2Ni4yMTctLjE3Ny4zODYtLjQ0NC41MDgtLjgwM2wuMDk2LS4yOTUtMi4zODUtNS45NjJ6Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzMpIj4KICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTkiIGN5PSIxOSIgcj0iMTkiIGZpbGw9IiNFMEUwRTAiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTTIyLjQ3NCAxNS40NDNoNS4xNjJMMTIuNDM2IDMwLjRWMTAuMzYzaDE1LjJsLTUuMTYyIDUuMDh6Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGZpbGw9IiNEMkQyRDIiIGQ9Ik0xMjEuNTQ0IDE0LjU2di0xLjcyOGg4LjI3MnYxLjcyOGgtMy4wMjRWMjRoLTIuMjR2LTkuNDRoLTMuMDA4em0xMy43NDQgOS41NjhjLTEuMjkgMC0yLjM0MS0uNDE5LTMuMTUyLTEuMjU2LS44MS0uODM3LTEuMjE2LTEuOTQ0LTEuMjE2LTMuMzJzLjQwOC0yLjQ3NyAxLjIyNC0zLjMwNGMuODE2LS44MjcgMS44NzItMS4yNCAzLjE2OC0xLjI0czIuMzYuNDAzIDMuMTkyIDEuMjA4Yy44MzIuODA1IDEuMjQ4IDEuODggMS4yNDggMy4yMjQgMCAuMzEtLjAyMS41OTctLjA2NC44NjRoLTYuNDY0Yy4wNTMuNTc2LjI2NyAxLjA0LjY0IDEuMzkyLjM3My4zNTIuODQ4LjUyOCAxLjQyNC41MjguNzc5IDAgMS4zNTUtLjMyIDEuNzI4LS45NmgyLjQzMmEzLjg5MSAzLjg5MSAwIDAgMS0xLjQ4OCAyLjA2NGMtLjczNi41MzMtMS42MjcuOC0yLjY3Mi44em0xLjQ4LTYuNjg4Yy0uNC0uMzUyLS44ODMtLjUyOC0xLjQ0OC0uNTI4cy0xLjAzNy4xNzYtMS40MTYuNTI4Yy0uMzc5LjM1Mi0uNjA1LjgyMS0uNjggMS40MDhoNC4xOTJjLS4wMzItLjU4Ny0uMjQ4LTEuMDU2LS42NDgtMS40MDh6bTcuMDE2LTIuMzA0djEuNTY4Yy41OTctMS4xMyAxLjQ2MS0xLjY5NiAyLjU5Mi0xLjY5NnYyLjMwNGgtLjU2Yy0uNjcyIDAtMS4xNzkuMTY4LTEuNTIuNTA0LS4zNDEuMzM2LS41MTIuOTE1LS41MTIgMS43MzZWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnptNi40NDggMHYxLjMyOGMuNTY1LS45NyAxLjQ4My0xLjQ1NiAyLjc1Mi0xLjQ1Ni42NzIgMCAxLjI3Mi4xNTUgMS44LjQ2NC41MjguMzEuOTM2Ljc1MiAxLjIyNCAxLjMyOC4zMS0uNTU1LjczMy0uOTkyIDEuMjcyLTEuMzEyYTMuNDg4IDMuNDg4IDAgMCAxIDEuODE2LS40OGMxLjA1NiAwIDEuOTA3LjMzIDIuNTUyLjk5Mi42NDUuNjYxLjk2OCAxLjU5Ljk2OCAyLjc4NFYyNGgtMi4yNHYtNC44OTZjMC0uNjkzLS4xNzYtMS4yMjQtLjUyOC0xLjU5Mi0uMzUyLS4zNjgtLjgzMi0uNTUyLTEuNDQtLjU1MnMtMS4wOS4xODQtMS40NDguNTUyYy0uMzU3LjM2OC0uNTM2Ljg5OS0uNTM2IDEuNTkyVjI0aC0yLjI0di00Ljg5NmMwLS42OTMtLjE3Ni0xLjIyNC0uNTI4LTEuNTkyLS4zNTItLjM2OC0uODMyLS41NTItMS40NC0uNTUycy0xLjA5LjE4NC0xLjQ0OC41NTJjLS4zNTcuMzY4LS41MzYuODk5LS41MzYgMS41OTJWMjRoLTIuMjU2di04Ljg2NGgyLjI1NnpNMTY0LjkzNiAyNFYxMi4xNmgyLjI1NlYyNGgtMi4yNTZ6bTcuMDQtLjE2bC0zLjQ3Mi04LjcwNGgyLjUyOGwyLjI1NiA2LjMwNCAyLjM4NC02LjMwNGgyLjM1MmwtNS41MzYgMTMuMDU2aC0yLjM1MmwxLjg0LTQuMzUyeiIvPgogICAgPC9nPgo8L3N2Zz4K) center no-repeat;
`;

const Title = styled.h1`
  font-family: Arial, sans-serif !important;
  font-size: 26px !important;
  color: #000000 !important;
  line-height: 1.5;
  margin: 0;
`;

const Subtitle = styled.div`
  font-family: Arial, sans-serif !important;
  color: #595959 !important;
  font-size: 14px !important;
  line-height: 1.5;
  font-weight: bold;
`;

const Heading1 = styled.h2`
  font-family: Arial, sans-serif !important;
  font-size: 19px !important;
  color: #000000 !important;
  line-height: 1.5;
  margin: 0;
`;

const Heading2 = styled.h3`
  font-family: Arial, sans-serif !important;
  font-size: 17px !important;
  color: #000000 !important;
  line-height: 1.5;
  margin: 0;
`;

const BodyText = styled.div`
  color: #595959 !important;
  font-size: 14px !important;
  font-family: Arial, sans-serif !important;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #3030F1 !important;
  font-size: 14px !important;
  font-family: Arial, sans-serif !important;
  word-break: break-word !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledList = styled.ul`
  list-style-type: square;
  margin-left: 20px;
  color: #595959;
  font-family: Arial, sans-serif;
  font-size: 14px;

  ul {
    list-style-type: circle;

    ul {
      list-style-type: square;
    }
  }
`;

const StyledListItem = styled.li`
  font-family: Arial, sans-serif;
  color: #595959;
  font-size: 14px;
  line-height: 1.5;
`;

const StyledOrderedItem = styled.li`
  font-family: Arial, sans-serif;
  color: #595959;
  font-size: 14px;
`;

const MsoNormal = styled.div`
  margin-bottom: 15px;
`;

const Spacer = styled.div`
  line-height: 1;
  height: 1px;
`;

const SpacerLg = styled.div`
  line-height: 1.5;
  height: 1px;
`;

const TermsOfUse = () => {
  return (
    <BodyContainer>
      <ContentContainer>
        {/* Logo */}
        <LogoContainer />

        <div data-custom-class="body">
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="title" style={{ lineHeight: '1.5' }}>
              <bdt class="block-component"><span style={{ fontSize: '19px' }}></span></bdt>
              <bdt class="question"><Title>TERMS OF USE</Title></bdt>
              <bdt class="statement-end-if-in-editor"></bdt>
            </MsoNormal>
            <MsoNormal data-custom-class="subtitle" style={{ lineHeight: '1.5' }}>
              <Subtitle>
                <strong>Last updated</strong> <bdt class="question"><strong>July 01, 2025</strong></bdt>
              </Subtitle>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.1' }}><br /></MsoNormal>
            <div style={{ lineHeight: '1.5' }}><br /></div>
            <div style={{ lineHeight: '1.5' }}>
              <strong><span data-custom-class="heading_1"><Heading1>AGREEMENT TO OUR LEGAL TERMS</Heading1></span></strong>
            </div>
          </div>

          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal id="agreement" style={{ lineHeight: '1.5' }}><a name="_6aa3gkhykvst"></a></MsoNormal>
          </div>

          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We are <bdt class="block-container question question-in-editor" data-id="9d459c4e-c548-e5cb-7729-a118548965d2" data-type="question">Edu-SupportTechnologies</bdt>, doing business as <bdt class="question">Motivar</bdt> ('<strong>Company</strong>', '<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), a company registered in <bdt class="question">Nigeria</bdt> at <bdt class="question">__________</bdt>, <bdt class="question">__________</bdt>.
              </BodyText>
            </MsoNormal>
          </div>
          <div align="center" style={{ lineHeight: '1' }}><br /></div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We operate the website <span style={{ color: 'rgb(0, 58, 250)' }}><bdt class="question"><Link href="http://www.motivar.live" target="_blank">http://www.motivar.live</Link></bdt></span> (the '<strong>Site</strong>'), as well as any other related products and services that refer or link to these legal terms (the '<strong>Legal Terms</strong>') (collectively, the '<strong>Services</strong>').
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                <bdt class="question">We provide learner support services designed to help young people start, find, and complete online courses they need to upskill</bdt>
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                You can contact us by phone at <bdt class="question">09050731685</bdt>, email at <bdt class="question">contact@motivar.live</bdt>, or by mail to <bdt class="question">__________</bdt>, <bdt class="question">__________</bdt>, <bdt class="question">Nigeria</bdt>.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('<strong>you</strong>'), and <bdt class="question">Edu-SupportTechnologies</bdt>, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by <bdt class="question">contact@motivar.live</bdt>, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.
              </BodyText>
            </MsoNormal>
          </div>

          <div align="center" style={{ lineHeight: '1' }}><br /></div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                The Services are intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>We recommend that you print a copy of these Legal Terms for your records.</BodyText>
            </MsoNormal>

            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="heading_1" style={{ lineHeight: '1.5' }}>
              <Heading1><strong>TABLE OF CONTENTS</strong></Heading1>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#services">1. OUR SERVICES</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#ip">2. INTELLECTUAL PROPERTY RIGHTS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#userreps">3. USER REPRESENTATIONS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#userreg">4. USER REGISTRATION</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#subscriptions">5. SUBSCRIPTIONS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#prohibited">6. PROHIBITED ACTIVITIES</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#ugc">7. USER GENERATED CONTRIBUTIONS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#license">8. CONTRIBUTION LICENCE</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#socialmedia">9. SOCIAL MEDIA</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#thirdparty">10. THIRD-PARTY WEBSITES AND CONTENT</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#sitemanage">11. SERVICES MANAGEMENT</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#ppyes">12. PRIVACY POLICY</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#terms">13. TERM AND TERMINATION</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#modifications">14. MODIFICATIONS AND INTERRUPTIONS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#law">15. GOVERNING LAW</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#disputes">16. DISPUTE RESOLUTION</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#corrections">17. CORRECTIONS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#disclaimer">18. DISCLAIMER</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#liability">19. LIMITATIONS OF LIABILITY</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#indemnification">20. INDEMNIFICATION</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#userdata">21. USER DATA</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#electronic">22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#sms">23. SMS TEXT MESSAGING</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#california">24. CALIFORNIA USERS AND RESIDENTS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#misc">25. MISCELLANEOUS</Link></MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><Link href="#contact">26. CONTACT US</Link></MsoNormal>
          </div>

          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="heading_1" id="services" style={{ lineHeight: '1.5' }}>
              <Heading1><strong>1. OUR SERVICES</strong></Heading1>
            </MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
          </div>

          <div align="center" data-custom-class="heading_1" style={{ textAlign: 'left', lineHeight: '1.5' }}>
            <Heading1><span id="ip"><strong>2. INTELLECTUAL PROPERTY RIGHTS</strong></span></Heading1>
          </div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
              <Heading2><strong>Our intellectual property</strong></Heading2>
            </MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purpose only.
              </BodyText>
            </MsoNormal>
            <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
              <Heading2><strong>Your use of our Services</strong></Heading2>
            </MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                Subject to your compliance with these Legal Terms, including the '<Link href="#prohibited">PROHIBITED ACTIVITIES</Link>' section below, we grant you a non-exclusive, non-transferable, revocable licence to:
              </BodyText>
            </MsoNormal>
            <StyledList>
              <StyledListItem>access the Services; and</StyledListItem>
              <StyledListItem>download or print a copy of any portion of the Content to which you have properly gained access,</StyledListItem>
            </StyledList>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                solely for your personal, non-commercial use or internal business purpose.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <bdt class="question">contact@motivar.live</bdt>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
              </BodyText>
            </MsoNormal>
          </div>
          <div align="center" style={{ lineHeight: '1.5' }}><br /></div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.
              </BodyText>
            </MsoNormal>
            <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
              <Heading2><strong>Your submissions</strong></Heading2>
            </MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                Please review this section and the '<Link href="#prohibited">PROHIBITED ACTIVITIES</Link>' section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                <strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ('Submissions'), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                <strong>You are responsible for what you post or upload:</strong> By sending us Submissions through any part of the Services you:
              </BodyText>
            </MsoNormal>
            <StyledList>
              <StyledListItem>confirm that you have read and agree with our '<Link href="#prohibited">PROHIBITED ACTIVITIES</Link>' and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</StyledListItem>
              <StyledListItem>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</StyledListItem>
              <StyledListItem>warrant that any such Submission are original to you or that you have the necessary rights and licences to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</StyledListItem>
              <StyledListItem>warrant and represent that your Submissions do not constitute confidential information.</StyledListItem>
            </StyledList>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual property rights, or (c) applicable law.
              </BodyText>
            </MsoNormal>
            <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
              <Heading2><strong>Copyright infringement</strong></Heading2>
            </MsoNormal>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately refer to the '<Link href="#contact">CONTACT US</Link>' section below.
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
          </div>

          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="heading_1" id="userreps" style={{ lineHeight: '1.5' }}>
              <Heading1><strong>3. USER REPRESENTATIONS</strong></Heading1>
            </MsoNormal>
          </div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
              <BodyText>
                By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not under the age of 13; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (6) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the Services for any illegal or unauthorised purpose; and (8) your use of the Services will not violate any applicable law or regulation.
              </BodyText>
            </MsoNormal>
          </div>
          <div align="center" style={{ lineHeight: '1.5' }}><br /></div>
          <div align="center" style={{ textAlign: 'left' }}>
            <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
              <BodyText>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
              </BodyText>
            </MsoNormal>
            <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>
          </div>

          <MsoNormal style={{ lineHeight: '1' }}>
            <MsoNormal data-custom-class="heading_1" id="userreg" style={{ lineHeight: '1.5', textAlign: 'left' }}>
              <Heading1><strong>4. USER REGISTRATION</strong></Heading1>
            </MsoNormal>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1' }}>
            <MsoNormal data-custom-class="body_text" style={{ textAlign: 'left', lineHeight: '1.5' }}>
              <BodyText>
                You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </BodyText>
            </MsoNormal>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="subscriptions" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>5. SUBSCRIPTIONS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
            <Heading2><strong>Billing and Renewal</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
            <Heading2><strong>Cancellation</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at <bdt class="question">contact@motivar.live</bdt>.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5' }}>
            <Heading2><strong>Fee Changes</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="prohibited" style={{ textAlign: 'left', lineHeight: '1.5' }}>
            <Heading1><strong>6. PROHIBITED ACTIVITIES</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>As a user of the Services, you agree not to:</BodyText>
          </MsoNormal>
          <StyledList>
            <StyledListItem>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</StyledListItem>
            <StyledListItem>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</StyledListItem>
            <StyledListItem>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</StyledListItem>
            <StyledListItem>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</StyledListItem>
            <StyledListItem>Use any information obtained from the Services in order to harass, abuse, or harm another person.</StyledListItem>
            <StyledListItem>Make improper use of our support services or submit false reports of abuse or misconduct.</StyledListItem>
            <StyledListItem>Use the Services in a manner inconsistent with any applicable laws or regulations.</StyledListItem>
            <StyledListItem>Engage in unauthorised framing of or linking to the Services.</StyledListItem>
            <StyledListItem>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</StyledListItem>
            <StyledListItem>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</StyledListItem>
            <StyledListItem>Delete the copyright or other proprietary rights notice from any Content.</StyledListItem>
            <StyledListItem>Attempt to impersonate another user or person or use the username of another user.</StyledListItem>
            <StyledListItem>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ('gifs'), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as 'spyware' or 'passive collection mechanisms' or 'pcms').</StyledListItem>
            <StyledListItem>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</StyledListItem>
            <StyledListItem>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</StyledListItem>
            <StyledListItem>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</StyledListItem>
            <StyledListItem>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</StyledListItem>
            <StyledListItem>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</StyledListItem>
            <StyledListItem>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.</StyledListItem>
            <StyledListItem>Use a buying agent or purchasing agent to make purchases on the Services.</StyledListItem>
            <StyledListItem>Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretences.</StyledListItem>
            <StyledListItem>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.</StyledListItem>
            <StyledListItem>Sell or otherwise transfer your profile.</StyledListItem>
            <StyledListItem>Use the Services to advertise or offer to sell goods and services.</StyledListItem>
          </StyledList>
          <MsoNormal><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="ugc" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>7. USER GENERATED CONTRIBUTIONS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              The Services does not offer users to submit or post content.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="license" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>8. CONTRIBUTION LICENCE</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="socialmedia" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>9. SOCIAL MEDIA</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a 'Third-Party Account') by either: (1) providing your Third-Party Account login information through the Services; or (2) allowing us to access your Third-Party Account, as is permitted under the applicable terms and conditions that govern your use of each Third-Party Account. You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account, and without obligating us to pay any fees or making us subject to any usage limitations imposed by the third-party service provider of the Third-Party Account. By granting us access to any Third-Party Accounts, you understand that (1) we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account (the 'Social Network Content') so that it is available on and through the Services via your account, including without limitation any friend lists and (2) we may submit to and receive from your Third-Party Account additional information to the extent you are notified when you link your account with the Third-Party Account. Depending on the Third-Party Accounts you choose and subject to the privacy settings that you have set in such Third-Party Accounts, personally identifiable information that you post to your Third-Party Accounts may be available on and through your account on the Services. Please note that if a Third-Party Account or associated service becomes unavailable or our access to such Third-Party Account is terminated by the third-party service provider, then Social Network Content may no longer be available on and through the Services. You will have the ability to disable the connection between your account on the Services and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content for any purpose, including but not limited to, for accuracy, legality, or non-infringement, and we are not responsible for any Social Network Content. You acknowledge and agree that we may access your email address book associated with a Third-Party Account and your contacts list stored on your mobile device or tablet computer solely for purposes of identifying and informing you of those contacts who have also registered to use the Services. You can deactivate the connection between the Services and your Third-Party Account by contacting us using the contact information below or through your account settings (if applicable). We will attempt to delete any information stored on our servers that was obtained through such Third-Party Account, except the username and profile picture that become associated with your account.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="thirdparty" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>10. THIRD-PARTY WEBSITES AND CONTENT</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              The Services may contain (or you may be sent via the Site) links to other websites ('Third-Party Websites') as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ('Third-Party Content'). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="sitemanage" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>11. SERVICES MANAGEMENT</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="ppyes" style={{ lineHeight: '1.5' }}>
            <Heading1><strong>12. PRIVACY POLICY</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5' }}>
            <BodyText>
              We care about data privacy and security. Please review our Privacy Policy: <strong><Link href="https://www.freeprivacypolicy.com/live/37127b01-6492-48cd-b7d5-b2f521359753" target="_blank">https://www.freeprivacypolicy.com/live/37127b01-6492-48cd-b7d5-b2f521359753</Link></strong>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in <bdt class="question">Nigeria</bdt> and <bdt class="question">Lithuania</bdt>. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in <bdt class="question">Nigeria</bdt> and <bdt class="question">Lithuania</bdt>, then through your continued use of the Services, you are transferring your data to <bdt class="question">Nigeria</bdt> and <bdt class="question">Lithuania</bdt>, and you expressly consent to have your data transferred to and processed in <bdt class="question">Nigeria</bdt> and <bdt class="question">Lithuania</bdt>. Further, we do not knowingly accept, request, or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S. Children's Online Privacy Protection Act, if we receive actual knowledge that anyone under the age of 13 has provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the Services as quickly as is reasonably practical.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="terms" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>13. TERM AND TERMINATION</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="modifications" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>14. MODIFICATIONS AND INTERRUPTIONS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="law" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>15. GOVERNING LAW</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              These Legal Terms shall be governed by and defined following the laws of <bdt class="question">Nigeria</bdt>. <bdt class="question">Edu-SupportTechnologies</bdt> and yourself irrevocably consent that the courts of <bdt class="question">Nigeria</bdt> shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="disputes" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>16. DISPUTE RESOLUTION</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Informal Negotiations</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 'Dispute' and collectively, the 'Disputes') brought by either you or us (individually, a 'Party' and collectively, the 'Parties'), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least <bdt class="question">thirty (30)</bdt> days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Binding Arbitration</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause. The number of arbitrators shall be <bdt class="question">three (3)</bdt>. The seat, or legal place, or arbitration shall be <bdt class="question">Lagos</bdt>, <bdt class="question">Nigeria</bdt>. The language of the proceedings shall be <bdt class="question">English</bdt>. The governing law of these Legal Terms shall be substantive law of <bdt class="question">Nigeria</bdt>.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Restrictions</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilise class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Exceptions to Informal Negotiations and Arbitration</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorised use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="corrections" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>17. CORRECTIONS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="disclaimer" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>18. DISCLAIMER</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORISED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="liability" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>19. LIMITATIONS OF LIABILITY</strong></Heading1>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE <bdt class="question">three (3)</bdt> MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR <bdt class="question">100,000</bdt>. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="indemnification" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>20. INDEMNIFICATION</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defence and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defence of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="userdata" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>21. USER DATA</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="electronic" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="sms" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>23. SMS TEXT MESSAGING</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Message Frequency</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <bdt class="question">This SMS will give you notification of your interaction on the website. </bdt>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Opting Out</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP." You may receive an SMS message confirming your opt out.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Message and Data Rates</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="heading_2" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading2><strong>Support</strong></Heading2>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              If you have any questions or need assistance regarding our SMS communications, please email us at <bdt class="question">contact@motivar.live</bdt> or call at <bdt class="question">09050731685</bdt>.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="california" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>24. CALIFORNIA USERS AND RESIDENTS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="misc" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>25. MISCELLANEOUS</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defences you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>

          <MsoNormal data-custom-class="heading_1" id="contact" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <Heading1><strong>26. CONTACT US</strong></Heading1>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </BodyText>
          </MsoNormal>
          <MsoNormal style={{ lineHeight: '1.5', textAlign: 'left' }}><br /></MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong><bdt class="question">Edu-SupportTechnologies</bdt></strong>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong><bdt class="question">__________</bdt></strong>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong><bdt class="question">__________</bdt></strong>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong><bdt class="question">Nigeria</bdt></strong>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong>Phone: <bdt class="question">09050731685</bdt></strong>
            </BodyText>
          </MsoNormal>
          <MsoNormal data-custom-class="body_text" style={{ lineHeight: '1.5', textAlign: 'left' }}>
            <BodyText>
              <strong><bdt class="question">contact@motivar.live</bdt></strong>
            </BodyText>
          </MsoNormal>
        </div>
      </ContentContainer>
    </BodyContainer>
  );
};

export default TermsOfUse;