import "@style/CardListComponent.css"; // Import local styles

import Card from "@model/card";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Link from 'next/link';

export default function CardListComponent({ cards }: { cards: Card[] }) {
    return (
        <div className="container-fluid">
            <div className="row row-cols-1 row-cols-lg-5 g-2 g-lg-3">
                {cards.map((card: Card) => (
                    <div className="col mb-3" id={`card-${card.id}`} key={`card-${card.id}`}>
                        <div className="card">
                            <Link href={`/card/${card.id}`}>
                                <div>
                                    <Image src={card.image} width={300} height={400} alt={card.name} title={card.name} />
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}