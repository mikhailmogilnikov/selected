export const getVariableFromRoot = (variable: string) => {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(variable);
};
