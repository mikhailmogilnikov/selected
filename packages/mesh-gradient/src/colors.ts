export const GradientColors = {
  green: {
    color1: '#043D5D',
    color2: '#032E46',
    color3: '#23B684',
    color4: '#0F595E',
  },
  peach: {
    color1: '#FE6860',
    color2: '#FE8A71',
    color3: '#D9BBAE',
    color4: '#F3C9BF',
  },
  sky: {
    color1: '#c3e4ff',
    color2: '#6ec3f4',
    color3: '#eae2ff',
    color4: '#b9beff',
  },
  purple: {
    color1: '#ba53df',
    color2: '#7948ea',
    color3: '#6b03b0',
    color4: '#210368',
  },
  yellow: {
    color1: '#ffa061',
    color2: '#ffc370',
    color3: '#d9ceaf',
    color4: '#f2ecbf',
  },
  lime: {
    color1: '#d5ff61',
    color2: '#b0ff70',
    color3: '#d0d9af',
    color4: '#dbf2bf',
  }
};

export type GradientColors = keyof typeof GradientColors;
