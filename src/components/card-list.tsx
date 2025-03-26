"use client";

import React from "react";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Card from "@component/models/card";

export default function CardList() {
    const cards: Card[] = [
        {
            name: 'Gandalf, White Rider',
            image: 'https://media.wizards.com/2023/ltr/en_54166525b7.png',
            type: 'Magic The Gathering',
            lore: ''
        },
        {
            name: 'Tamis',
            image: '/Tamis.webp', // Local image example
            type: 'Mitos y Leyenda',
            lore: ''
        },
        {
            name: 'Wargreymon',
            image: '/Wargreymon.webp',
            type: 'Digimon Card Game',
            lore: ''
        }
    ];

    const handleInteractionMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
        cardId: string
    ) => {
        const card = document.getElementById(cardId);
        if (card) {
            const rect = card.getBoundingClientRect();
            let x, y;
    
            if ("touches" in e) {
                // Handle touch events
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                // Handle mouse events
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
    
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10; // Adjust rotation intensity
            const rotateY = ((x - centerX) / centerX) * -10;
    
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    };
    
    const handleInteractionEnd = (cardId: string) => {
        const card = document.getElementById(cardId);
        if (card) {
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        }
    };

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mt-3">
            {cards.map((card: Card, index: number) => (
                <div
                    className="col mb-3"
                    id={"card-" + card.name}
                    key={'card-' + (index + 1)}
                    onMouseMove={(e) => handleInteractionMove(e, "card-" + card.name)}
                    onMouseLeave={() => handleInteractionEnd("card-" + card.name)}
                    onTouchMove={(e) => handleInteractionMove(e, "card-" + card.name)}
                    onTouchEnd={() => handleInteractionEnd("card-" + card.name)}
                >
                    <div
                        className="card shadow-sm"
                        style={{
                            borderRadius: '24px',
                            border: 'none',
                            transition: 'transform 0.2s ease', // Smooth transition
                            perspective: '1000px' // Add perspective for 3D effect
                        }}
                    >
                        <Image
                            className="bd-placeholder-img card-img-top cursor-pointer"
                            id={card.name}
                            src={card.image}
                            width={300} // Adjust width for Next.js Image
                            height={400} // Adjust height for Next.js Image
                            style={{
                                borderRadius: '20px',
                                maxHeight: '480px',
                                transition: 'transform 0.2s ease' // Smooth transition for the image
                            }}
                            alt={card.name}
                            title={card.name}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}