import { ReactElement } from "react";
import loginBannerImage from "../../../../assets/images/login-banner.svg";
import Image from "next/image";
import { Section } from "./styles";

export const Banner = ({ area }): ReactElement => {
  return (
    <Section area={area}>
      <Image
        src={loginBannerImage}
        alt="Pessoa em uma praça com celular na mão mexendo no aplicativo picfriends"
        loading="lazy"
      />
    </Section>
  );
};
