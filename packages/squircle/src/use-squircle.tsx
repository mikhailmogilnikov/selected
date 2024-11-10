import { Slot } from '@radix-ui/react-slot';
import { getSvgPath } from 'figma-squircle';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useElementSize } from './use-element-size';

export type SquircleOrdersRadius = {
  tl: number;
  tr: number;
  bl: number;
  br: number;
};

export type UseSquircleProps = {
  smoothing?: number;
  wrapperRadius?: number;
  wrapperClassname?: string;
  throttlingDelayMs?: number;
  asChild?: boolean;
  resizable?: boolean;
  width?: number;
  height?: number;
} & ComponentPropsWithoutRef<'div'>;

export const useSquircle = (props: UseSquircleProps) => {
  const {
    smoothing: cornerSmoothing = 0,
    asChild,
    resizable = true,
    width: staticWidth,
    height: staticHeight,
    wrapperRadius,
    throttlingDelayMs,
    wrapperClassname,
    style,
    ...restProps
  } = props;

  const Component = asChild ? Slot : 'div';

  const [ref, { width, height, borderRadius, borderRadiuses }] = useElementSize<HTMLDivElement>(
    resizable,
    throttlingDelayMs,
  );

  const actualWidth = staticWidth ?? width;
  const actualHeight = staticHeight ?? height;

  const path = useMemo(() => {
    if (!actualWidth || !actualHeight) return '';

    return getSvgPath({
      width: actualWidth,
      height: actualHeight,
      topLeftCornerRadius: borderRadiuses?.borderTopLeftRadius,
      topRightCornerRadius: borderRadiuses?.borderTopRightRadius,
      bottomLeftCornerRadius: borderRadiuses?.borderBottomLeftRadius,
      bottomRightCornerRadius: borderRadiuses?.borderBottomRightRadius,
      cornerRadius: borderRadius,
      cornerSmoothing: cornerSmoothing,
    });
  }, [actualWidth, actualHeight, borderRadius, cornerSmoothing, borderRadiuses]);

  const elStyle = useMemo(
    () => ({
      width: staticWidth,
      height: staticHeight,
      ...style,
      clipPath: `path('${path}')`,
    }),
    [staticWidth, staticHeight, style, path],
  );

  const wrapperStyle = useMemo(
    () => ({
      borderRadius: wrapperRadius,
      borderTopLeftRadius: borderRadiuses?.borderTopLeftRadius,
      borderTopRightRadius: borderRadiuses?.borderTopLeftRadius,
      borderBottomLeftRadius: borderRadiuses?.borderTopLeftRadius,
      borderBottomRightRadius: borderRadiuses?.borderTopLeftRadius,
    }),
    [wrapperRadius, borderRadiuses],
  );

  return {
    Component,
    elStyle,
    wrapperStyle,
    ref,
    wrapperClassname,
    ...restProps,
  };
};
