import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getSvgPath } from 'figma-squircle';

export interface StaticSquircleProps {
  width: number;
  height: number;
  asChild?: boolean;
  cornerRadius?: number;
  cornerSmoothing?: number;
}

export const StaticSquircle = ({
  asChild,
  width,
  height,
  cornerRadius = 0,
  cornerSmoothing = 0.6,
  style,
  ...props
}: PropsWithChildren<StaticSquircleProps & ComponentPropsWithoutRef<'div'>>) => {
  const Component = asChild ? Slot : 'div';

  const path = useMemo(() => {
    return getSvgPath({
      width,
      height,
      cornerRadius,
      cornerSmoothing,
    });
  }, [width, height, cornerRadius, cornerSmoothing]);

  return <Component style={{ clipPath: `path('${path}')`, ...style }} {...props} />;
};
