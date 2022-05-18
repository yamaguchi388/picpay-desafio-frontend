import { ReactElement } from "react";
import { Banner, LoginForm } from "../components";
import { Content, FeaturedBannerLayout } from "./styles";

export const LoginLayout = (): ReactElement => (
  <FeaturedBannerLayout>
    <Content>
      <Banner area="banner" />
      <LoginForm area="login-form" />
    </Content>
  </FeaturedBannerLayout>
);
