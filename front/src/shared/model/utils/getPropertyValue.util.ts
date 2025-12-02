export const getPropertyValue = (property: string) =>
  parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(property)
  );
