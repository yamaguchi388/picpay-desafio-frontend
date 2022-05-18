import { ReactElement } from "react";
import loginBannerImage from "../../../../assets/images/login-banner.svg";
import Image from "next/image";
import { Section } from "./styles";
import { useViewport } from "../../../../core/hooks";

export const Banner = ({ area }): ReactElement => {
  const { isMobile } = useViewport();
  return (
    <Section area={area} width={isMobile ? 50 : 100}>
      <Image
        src={loginBannerImage}
        alt="Pessoa em uma praça com celular na mão mexendo no aplicativo picfriends"
        loading="lazy"
      />
    </Section>
  );
};
