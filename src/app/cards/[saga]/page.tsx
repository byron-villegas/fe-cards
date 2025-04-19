import CardListComponent from "@component/card-list";
import configuration from "@config/configuration";
import Card from "@model/card";

export default async function CardTypePage({ params }: { params: Promise<{ saga: string }> }) {
    const { saga } = await params;
    const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}?saga=${saga}`, { cache: 'reload' });
    const cards: Card[] = await response.json();

    return (
        <div className="container-fluid">
            <CardListComponent cards={cards} />
        </div>
    );
}