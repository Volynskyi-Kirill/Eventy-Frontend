interface EventTitleProps {
  title?: string;
  t: any;
}

export function EventTitle({ title, t }: EventTitleProps) {
  const displayTitle = title || t('titlePlaceholder');

  return <h2 className='text-xl font-bold mb-2'>{displayTitle}</h2>;
}
