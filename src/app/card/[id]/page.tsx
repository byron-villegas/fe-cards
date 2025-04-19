import CardViewComponent from '@component/card-view';

export default async function CardViewPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  return <CardViewComponent id={id} />;
}