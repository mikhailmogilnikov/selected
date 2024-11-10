import { SquircleProps } from './squircle';
import { useSquircle } from './use-squircle';

export const HaveSmoothing = (props: SquircleProps) => {
  const { Component, elStyle, ref, wrapperClassname, wrapperStyle, ...restProps } =
    useSquircle(props);

  if (wrapperClassname) {
    return (
      <div className={wrapperClassname} style={wrapperStyle}>
        <Component ref={ref} style={elStyle} {...restProps} />
      </div>
    );
  }

  return <Component ref={ref} style={elStyle} {...restProps} />;
};
