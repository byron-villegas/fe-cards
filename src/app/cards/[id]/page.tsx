import CardView from '@component/components/card-view';

export default async function CardViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  return <CardView id={id} />;
}