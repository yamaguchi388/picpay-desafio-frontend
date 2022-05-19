import { ReactElement } from "react";
import loginBannerImage from "../../../../assets/images/login-banner.svg";
import Image from "next/image";
import { useViewport } from "../../../../core/hooks";
import { BannerProps } from "./types";
import { Section } from "../../../../core/components";

export const Banner = ({ area }: BannerProps): ReactElement => {
  const { isMobile } = useViewport();
  return (
    <Section area={area} width={isMobile ? 60 : 100}>
      <Image
        src={loginBannerImage}
        alt="Pessoa em uma praça com celular na mão mexendo no aplicativo picfriends"
        loading="lazy"
      />
    </Section>
  );
};
