/*eslint-disable*/

import React, { useState } from "react";
import styled from "styled-components";
import Tick from "../assets/Icons/tick-circle.svg";
import ArrowLeft from "../assets/Icons/arrow-left.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

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

const SponsorStatus = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  let learner = searchParams.get("learner");
  let learner_id = searchParams.get("id");
  let price = searchParams.get("price");
  let state = searchParams.get("state");
  let unit = searchParams.get("unit");

  if (state === "meet") {
    return (
      <MeetLearner
        learner={learner}
        name={learner}
        id={learner_id}
        price={price}
        unit={unit}
      />
    );
  } else {
    return (
      <PayCourse
        learner={learner}
        id={learner_id}
        price={price}
        unit={unit}
        loading={loading}
        setLoading={setLoading}
      />
    );
  }
};

const MeetLearner = ({ learner, name, id, price, unit }) => {
  const router = useNavigate();
  return (
    <>
      <Wrapper>
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
            Meeting Scheduled!
          </p>
          <p
            style={{
              width: "65%",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            Your meeting with {learner} has been successfully scheduled. Please
            check your mail to confirm the details
          </p>

          <Button
            onClick={() =>
              router(
                `/sponsor-status?state=pay&learner=${name}&id=${id}&price=${price}&unit=${unit}`
              )
            }
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
      </Wrapper>
    </>
  );
};

const PayCourse = ({ learner, id, price, unit, loading, setLoading }) => {
  const router = useNavigate();

  const handlePayWithPaystack = async () => {
    setLoading(true);
    const token = await localStorage.getItem("motivar-token");
    try {
      const resp = await PaymentService.InitiatePayment(
        Number(price) * 100,
        token
      );
      setLoading(false);

      window.open(resp.data.data.data.authorization_url, "_blank");
    } catch (error) {
      setLoading(false);
      console.log("Error intiating payment..", error);
    }
  };

  return (
    <Wrapper>
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
          Complete Your Sponsorship!
        </p>
        <p
          style={{
            width: "65%",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Now complete your
          <br />{" "}
          <b>
            {unit === "NGN"
              ? "₦"
              : unit === "USD"
              ? "$"
              : unit === "GBP"
              ? "£"
              : "#"}
            {Number(price).toLocaleString("en-US", {
              minimumFractionDigits: 0,
            })}
          </b>{" "}
          sponsorship for <b>{learner}</b>
        </p>

        <Button
          onClick={() => handlePayWithPaystack()}
          style={{
            backgroundColor: "#00AA87",
            border: "none",
            width: "50%",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {loading && <Spinner animation="border" role="status" />}
          {!loading && "Pay for course"}
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
    </Wrapper>
  );
};

export default SponsorStatus;
