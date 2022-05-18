import { ReactElement } from "react";
import { Banner, LoginForm } from "../components";
import { Content, FeaturedBannerLayout } from "./styles";

export const LoginLayout = (): ReactElement => (
  <FeaturedBannerLayout>
    <Content>
      <LoginForm area="login-form" />
      <Banner area="banner" />
    </Content>
  </FeaturedBannerLayout>
);
