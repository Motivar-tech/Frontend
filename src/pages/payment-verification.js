/* eslint-disable */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tick from "../assets/Icons/tick-circle.svg";
import ArrowLeft from "../assets/Icons/arrow-left.svg";
import PaymentService from "../Services/PaymentService";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fffffa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  width: 45%;
  height: 50%;
  box-shadow: 0px 0px 65px 21px #0000000a;
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1040px) {
    width: 95%;
    height: 80%;
  }
`;

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  let txref = searchParams.get("trxref");
  let reference = searchParams.get("reference");
  let requestID = localStorage.getItem("requestID");

  const router = useNavigate();

  const handleVerifyPayment = async () => {
    const token = localStorage.getItem("motivar-token");

    try {
      setIsLoading(true);
      const resp = await PaymentService.initiatePaymentVerification(
        token,
        reference
      );

      if (resp.data.status === "success") {
        setStatus(resp.data.status);
        let res = await PaymentService.completeSponsorship(
          token,
          requestID,
          reference
        );

        if (res) {
          setIsLoading(false);
          setData(resp.data);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyPayment();
  }, [reference]);

  return (
    <>
      <Wrapper>
        {!isLoading && (
          <Body>
            <img
              src={Tick}
              style={{
                objectFit: "center",
                height: "70px",
                width: "70px",
              }}
            />
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bolder",
                fontSize: "20px",
                padding: "20px 0px 5px 0px",
              }}
            >
              Sucessfull Payment!
            </p>
            <p
              style={{
                width: "65%",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Payment of {data?.currency}
              {Number(data?.amount / 100).toLocaleString()} been made
              successfully, check your sponsored courses?
            </p>

            <Button
              onClick={() => router(`/dashboard`)}
              style={{
                backgroundColor: "#00AA87",
                border: "none",
                width: "50%",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Continue
            </Button>

            <p
              onClick={() => {
                router("/help-learner");
              }}
              style={{
                width: "80%",
                margin: "2vh auto 2vh auto",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={ArrowLeft}
                style={{
                  objectFit: "center",
                  height: "20px",
                  width: "30px",
                }}
              />
              <div>
                <h6
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "#00AA87",
                    fontSize: "16px",
                    padding: "10px",
                  }}
                >
                  Go back to Listing
                </h6>
              </div>
            </p>
          </Body>
        )}
      </Wrapper>
    </>
  );
};

export default PaymentVerification;
