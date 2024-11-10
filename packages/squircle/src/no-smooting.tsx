import { Slot } from '@radix-ui/react-slot';
import { SquircleProps } from './squircle';

export const NoSmoothing = (props: SquircleProps) => {
  const {
    asChild,
    smoothing,
    resizable,
    wrapperRadius,
    throttlingDelayMs,
    wrapperClassname,
    width,
    height,
    ...componentProps
  } = props;

  const Component = asChild ? Slot : 'div';

  return <Component {...componentProps} />;
};
