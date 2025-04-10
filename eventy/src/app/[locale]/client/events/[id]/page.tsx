type EventPageProps = {
  params: {
    id: string;
  };
};

export default function EventPage({ params }: EventPageProps) {
  const { id } = params;
  return <div>Event ID: {id}</div>;
}
