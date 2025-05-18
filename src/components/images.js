import styled from "styled-components";

const ImageWrapper = styled.img`
  object-fit: contain;
  width: ${(props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "100px")};

  @media (max-width: 900px){
    width: 100%;
    height: 100%;
  }
`;

export const StyledImage = ({ src, width, height }) => {
  return (
    <>
      <ImageWrapper src={src} width={width} height={height} />
    </>
  );
};
