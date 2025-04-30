import CardListComponent from "@component/card-list";
import configuration from "@config/configuration";
import Card from "@model/card";

export default async function CardGamePage({ params }: { params: Promise<{ game: string }> }) {
    const { game } = await params;
    const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}?game=${game}`, { cache: 'default' });
    const cards: Card[] = await response.json();

    return (
        <div className="container-fluid">
            <CardListComponent cards={cards} />
        </div>
    );
}