import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/card-list.css"; // Import local styles
import "../styles/globals.css"; // Import custom CSS

import Card from "@component/models/card";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Link from 'next/link';

export default function CardList() {

    const cards: Card[] = [
        {
            id: 'gandalf',
            name: 'Gandalf, White Rider',
            nameFont: 'jacquard',
            number: 290,
            cost: {
                name: 'mana',
                value: 3,
                color: 'white',
            },
            strengh: 3,
            health: 3,
            damageAndHealthType: 'P/T',
            rarity: 'rare',
            image: 'https://media.wizards.com/2023/ltr/en_54166525b7.png',
            saga: 'Magic: The Gathering',
            type: 'Legendary Creature — Avatar Wizard',
            expansion: 'The Lord of the Rings: Tales of Middle Earth',
            text: 'Vigilance\nWhenever you cast a spell, creatures you control get +1/+0 until end of turn. Scry 1.\n When Gandalf dies, you may put it into its owner\'s library fifth from the top.',
            aditionalText: 'He has passed through the fire and the abyss, and the enemy shall fear him.',
            artist: 'Ekaterina Burmak'
        },
        {
            id: 'tamis',
            name: 'Tamis',
            nameFont: 'fondamento',
            number: 1,
            cost: {
                name: 'mana',
                value: 5,
                color: 'white',
            },
            strengh: 3,
            health: 3,
            damageAndHealthType: 'P/T',
            rarity: 'rare',
            image: '/Tamis.webp',
            saga: 'Mitos y Leyenda',
            type: '',
            expansion: '',
            text: 'A legendary figure from ancient myths.',
            aditionalText: '',
            artist: 'Mauricio Herrera'
        },
        {
            id: 'wargreymon',
            name: 'Wargreymon',
            nameFont: 'jersey',
            number: 1,
            cost: {
                name: 'memory',
                value: 5,
                color: '',
            },
            strengh: 3,
            health: 3,
            damageAndHealthType: 'P/T',
            rarity: 'rare',
            image: '/Wargreymon.webp',
            saga: 'Digimon Card Game',
            type: '',
            expansion: '',
            text: 'A powerful Digimon warrior clad in Chrome Digizoid armor.',
            aditionalText: '',
            artist: 'Bandai'
        },
    ];

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