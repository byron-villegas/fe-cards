import CardListComponent from "@component/components/card-list";

import "../../styles/card-view.css"; // Import local styles
import Card from "@component/models/card";
import configuration from "@component/config/configuration";

export default async function Page() {

  const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}`, { cache: 'reload' });
  const cards: Card[] = await response.json();

  return <div className="container-fluid"><CardListComponent cards={cards} /></div>
}