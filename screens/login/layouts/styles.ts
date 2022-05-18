import styled from "styled-components";

export const FeaturedBannerLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: "login-form banner";
  justify-content: center;
  align-items: center;
`;
