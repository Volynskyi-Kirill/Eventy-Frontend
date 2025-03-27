interface Category {
  id: number;
  name: string;
}

interface EventCategoriesProps {
  categoryIds?: number[];
  categories: Category[];
  t: any;
}

export function EventCategories({
  categoryIds,
  categories,
  t,
}: EventCategoriesProps) {
  const hasCategories = categoryIds && categoryIds.length > 0;

  if (!hasCategories) {
    return null;
  }

  const categoryNames = categoryIds
    .map((id: number) => {
      const category = categories.find((c: Category) => c.id === id);
      return category ? category.name : id;
    })
    .join(', ');

  return (
    <div className='mb-2 text-sm text-gray-500'>
      {t('categoriesLabel')}: {categoryNames}
    </div>
  );
}
