/* eslint-disable */

import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Tick from "../assets/Icons/tick-circle.svg";
import ArrowLeft from "../assets/Icons/arrow-left.svg";
import PaymentService from "../Services/PaymentService";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fffffa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const Body = styled.div`
  width: 45%;
  min-height: 50%;
  box-shadow: 0px 0px 65px 21px #0000000a;
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  text-align: center;
  gap: 1rem;

  @media (max-width: 1040px) {
    width: 95%;
  }
`;

const GreenBtn = styled(Button)`
  background-color: #00aa87;
  border: none;
  width: 60%;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  padding: 0.7rem;
  &:hover { background-color: #008f71; }
`;

const BackLink = styled.p`
  width: 80%;
  margin: 1rem auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 6px;
`;

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [verifyError, setVerifyError] = useState(null);

  const reference = searchParams.get("reference");
  const requestID = localStorage.getItem("requestID");
  const router = useNavigate();

  const handleConfirmAndVerify = async () => {
    if (!reference) {
      setVerifyError("Missing payment reference. Please go back and try again.");
      return;
    }
    setIsLoading(true);
    setVerifyError(null);
    try {
      const token = localStorage.getItem("motivar-token");
      const resp = await PaymentService.initiatePaymentVerification(token, reference);

      if (resp?.data?.status === "success") {
        await PaymentService.completeSponsorship(token, requestID, reference);
        setPaymentData(resp.data);
        setVerified(true);
      } else {
        setVerifyError(
          "Payment could not be confirmed. Please check your payment and try again, or contact support."
        );
      }
    } catch (err) {
      setVerifyError(
        err?.response?.data?.message ||
          "An error occurred while verifying your payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Step 1: Confirmation prompt ── */
  if (!verified && !isLoading) {
    return (
      <Wrapper>
        <Body>
          <img src={Tick} style={{ height: 70, width: 70 }} alt="tick" />
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "bolder", fontSize: 22, margin: 0 }}>
            Complete Your Sponsorship
          </p>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 15, color: "#6C757D", width: "80%" }}>
            Once you have finished your payment on Paystack, tap the button below
            to confirm and record your sponsorship.
          </p>

          {verifyError && (
            <p style={{ color: "#dc3545", fontSize: 14, width: "80%", fontFamily: "Montserrat, sans-serif" }}>
              {verifyError}
            </p>
          )}

          <GreenBtn onClick={handleConfirmAndVerify}>
            I've Paid — Confirm Sponsorship
          </GreenBtn>

          <BackLink onClick={() => router("/help-learner")}>
            <img src={ArrowLeft} style={{ height: 20, width: 30 }} alt="back" />
            <h6 style={{ fontFamily: "Montserrat, sans-serif", color: "#00AA87", fontSize: 16, padding: "5px", margin: 0 }}>
              Go back to Listing
            </h6>
          </BackLink>
        </Body>
      </Wrapper>
    );
  }

  /* ── Step 2: Verifying spinner ── */
  if (isLoading) {
    return (
      <Wrapper>
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <Spinner animation="border" />
          <p className="mt-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Verifying your payment, please wait...
          </p>
        </div>
      </Wrapper>
    );
  }

  /* ── Step 3: Success ── */
  return (
    <Wrapper>
      <Body>
        <img src={Tick} style={{ height: 70, width: 70 }} alt="tick" />
        <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "bolder", fontSize: 22, margin: 0 }}>
          Sponsorship Confirmed!
        </p>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: 15, color: "#6C757D", width: "80%" }}>
          Payment of {paymentData?.currency}
          {Number(paymentData?.amount / 100).toLocaleString()} has been recorded.
          The learner has been notified.
        </p>

        <GreenBtn onClick={() => router("/dashboard")}>
          Go to Dashboard
        </GreenBtn>

        <BackLink onClick={() => router("/help-learner")}>
          <img src={ArrowLeft} style={{ height: 20, width: 30 }} alt="back" />
          <h6 style={{ fontFamily: "Montserrat, sans-serif", color: "#00AA87", fontSize: 16, padding: "5px", margin: 0 }}>
            Sponsor Another Learner
          </h6>
        </BackLink>
      </Body>
    </Wrapper>
  );
};

export default PaymentVerification;
