export const normalizeCategory = (category) => {
  return (
    category.charAt(0).toUpperCase() + category.slice(1).split('-').join(' ')
  );
  // mens-shoes
  // 'm' .charAt(0)
  // 'M' .toUpperCase()
  // 'ens-shoes' .slice(1)
  // ['ens, 'shoes'] .split('-')
  // 'ens shoes' .join(' ')
  // Mens shoes +
};
