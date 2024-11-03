import {
  ComponentPropsWithoutRef,
  CSSProperties,
  Ref,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Gradient } from './gradient';

import { GradientColors } from './colors';
import { useObjectRef } from '@react-aria/utils';
import { useInView } from 'react-intersection-observer';

export type GradientPalette = { color1: string; color2: string; color3: string; color4: string };

export type UseMeshGradientProps = ComponentPropsWithoutRef<'canvas'> & {
  ref?: Ref<HTMLCanvasElement> | null;
  colors?: GradientPalette;
  color?: GradientColors;
  darken?: boolean;
  pause?: boolean;
  opacity?: number;
  animationDuration?: number;
};

export const useMeshGradient = (props: UseMeshGradientProps) => {
  const {
    ref,
    colors,
    color = 'green',
    darken,
    pause = false,
    className,
    opacity = 1,
    animationDuration = 150,
    ...restProps
  } = props;

  const id = useId().replace(/[:]/g, '');
  const canvasId = useMemo(() => `gradient-canvas-${id}`, []);

  const [isFading, setIsFading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const gradientRef = useRef<Gradient | null>(null);
  const domRef = useObjectRef(ref);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const fadeIn = useCallback(() => {
    setIsFading(false);
    setIsVisible(true);
  }, []);

  const fadeOut = useCallback((callback: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      gradientRef.current?.initGradient(`#${canvasId}`);
      setIsVisible(false);
      callback();
    }, animationDuration);
  }, []);

  const reloadGradient = useCallback(() => {
    fadeOut(() => {
      requestAnimationFrame(() => {
        fadeIn();
      });
    });
  }, []);

  useEffect(() => {
    if (!gradientRef.current) {
      const gradient = new Gradient({ seed: 5 });
      gradient.initGradient(`#${canvasId}`);
      gradientRef.current = gradient;
    }
  }, []);

  useEffect(() => {
    if (gradientRef?.current) {
      reloadGradient();
    }
  }, [color, colors, gradientRef?.current]);

  useEffect(() => {
    if (gradientRef?.current) {
      if (pause || !inView) {
        gradientRef.current.pause();
      } else if (!pause && inView) {
        gradientRef.current.play();
      }
    }
  }, [gradientRef?.current, pause, inView]);

  useEffect(() => {
    if (gradientRef.current && domRef.current) {
      const canvas = domRef.current;

      if (darken) {
        canvas?.setAttribute('data-js-darken-top', '');
        reloadGradient();
      } else {
        canvas?.removeAttribute('data-js-darken-top');
        reloadGradient();
      }
    }
  }, [darken, domRef?.current, gradientRef?.current]);

  const colorVars = useMemo(
    () =>
      colors
        ? ({
            '--gradient-color-1': colors.color1,
            '--gradient-color-2': colors.color2,
            '--gradient-color-3': colors.color3,
            '--gradient-color-4': colors.color4,
          } as CSSProperties)
        : ({
            '--gradient-color-1': GradientColors[color].color1,
            '--gradient-color-2': GradientColors[color].color2,
            '--gradient-color-3': GradientColors[color].color3,
            '--gradient-color-4': GradientColors[color].color4,
          } as CSSProperties),
    [colors, color],
  );

  const setRefs = useCallback(
    (node: HTMLCanvasElement | null) => {
      domRef.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  return { setRefs, colorVars, canvasId, isFading, isVisible, opacity, animationDuration, ...restProps };
};
