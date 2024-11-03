import { forwardRef } from 'react';
import { useMeshGradient, UseMeshGradientProps } from './use-mesh-gradient';

export interface MeshGradientProps extends UseMeshGradientProps {}

type MeshGradientRef = HTMLCanvasElement;

export const MeshGradient = forwardRef<MeshGradientRef, MeshGradientProps>((props, ref) => {
  const { setRefs, colorVars, isFading, canvasId, animationDuration, opacity, ...restProps } = useMeshGradient({
    ref,
    ...props,
  });

  return (
    <canvas
      ref={setRefs}
      id={canvasId}
      style={{
        ...colorVars,
        opacity: isFading ? 0 : opacity,
        transition: `opacity ${animationDuration}ms linear`,
      }}
      {...restProps}
    />
  );
});
