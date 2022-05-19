import { ComponentType, ReactElement } from "react";

export const withProvider =
  (...providers: ComponentType<any>[]) =>
  (WrappedComponent: ComponentType<any>): ComponentType => {
    const WithProvider = (props: any): ReactElement =>
      providers.reduceRight(
        (CombinedProvider, Provider) => <Provider>{CombinedProvider}</Provider>,
        <WrappedComponent {...props} />
      );
    WithProvider.displayName = WrappedComponent.displayName;

    return WithProvider;
  };
