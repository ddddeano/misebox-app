export const gridFilter = (heroes, layout, index) => {
  return heroes.filter((hero, i) => i % layout === index);
};
