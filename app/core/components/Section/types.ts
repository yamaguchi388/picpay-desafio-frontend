import { ReactNode } from "react";

export interface ISectionPropsStyle {
  area: string | undefined;
  $width: number;
  hasBackground?: boolean;
}

export interface ISectionProps {
  children: ReactNode;
  area?: string;
  width?: number;
  hasBackground?: boolean;
}
