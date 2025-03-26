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
            let posX, posY;
    
            // Normalizar eventos de mouse y touch
            if ("touches" in e) {
                posX = e.touches[0].clientX - rect.left;
                posY = e.touches[0].clientY - rect.top;
            } else {
                posX = e.clientX - rect.left;
                posY = e.clientY - rect.top;
            }
    
            const width = rect.width;
            const height = rect.height;
    
            // Calcular posición relativa al centro de la carta
            const centerX = width / 2;
            const centerY = height / 2;
    
            // Calcular rotaciones basadas en la posición del mouse o toque
            const rotateX = ((posY - centerY) / centerY) * -15; // Rotación en X (hacia adelante o atrás)
            const rotateY = ((posX - centerX) / centerX) * 15; // Rotación en Y (hacia los lados)
    
            // Aplicar transformaciones al estilo del elemento
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = "transform 0.1s ease-out"; // Suavizar el movimiento
        }
    };
    
    const handleInteractionEnd = (cardId: string) => {
        const card = document.getElementById(cardId);
        if (card) {
            // Restablecer transformaciones
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
            card.style.transition = "transform 0.5s ease"; // Suavizar el regreso
        }
    };

    return (
        <section className="cards">
            {cards.map((card: Card, index: number) => (
                    <div
                        className="card-element" id={card.name + "-" + index} key={card.name + "-" + index}
                        onMouseMove={(e) => handleInteractionMove(e, card.name + "-" + index)}
                        onTouchMove={(e) => handleInteractionMove(e, card.name + "-" + index)}
                        onMouseLeave={() => handleInteractionEnd(card.name + "-" + index)}
                        onTouchEnd={() => handleInteractionEnd(card.name + "-" + index)}
                    >
                        <Image
                            id={card.name}
                            src={card.image}
                            width={300} // Adjust width for Next.js Image
                            height={400} // Adjust height for Next.js Image
                            alt={card.name}
                            title={card.name}
                        />
                    </div>
            ))}
        </section>
    );
}