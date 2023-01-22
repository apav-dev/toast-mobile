export const flattenCategories = (
  categories?: ParentCategory[]
): CategoryLink[] => {
  if (!categories) return [];

  const links: CategoryLink[] = [];
  categories.forEach((category) => {
    if (category.c_parentCategory?.[0]) {
      const parentIndex = links
        .map((link) => link.name)
        .indexOf(category.c_parentCategory?.[0].name);
      if (parentIndex === -1) {
        links.push({ name: category.name, slug: category.slug });
      } else {
        links.splice(parentIndex + 1, 0, {
          name: category.name,
          slug: category.slug,
        });
      }
    } else {
      links.unshift({ name: category.name, slug: category.slug });
    }
  });
  return links;
};
