import "@style/CardListComponent.css"; // Import local styles

import Card from "@model/card";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Link from 'next/link';

export default function CardListComponent({ cards }: { cards: Card[] }) {
    return (
        <div className="container-fluid mt-5">
            <div className="row row-cols-1 row-cols-md-5">
                {cards.map((card: Card) => (
                    <div className="col mb-3" id={`card-${card.id}`} key={`card-${card.id}`}>
                        <div className="card card-card">
                            <div className="card-img">
                                <Link href={`/cards/${card.id}`}>
                                    <div className="card-element-list">
                                        <Image src={card.image} className="card-img-top" width={300} height={400} alt={card.name} title={card.name} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}