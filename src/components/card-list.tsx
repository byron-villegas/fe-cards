"use client";

import React, { useRef } from "react";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Card from "@component/models/card";

export default function CardList() {
    const hoverStyleRef = useRef<HTMLStyleElement | null>(null);

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

            // Calcular posición relativa
            const px = Math.abs(Math.floor((100 / width) * posX) - 100);
            const py = Math.abs(Math.floor((100 / height) * posY) - 100);

            const pa = (50 - px) + (50 - py);

            // Calcular transformaciones
            const lp = 50 + (px - 50) / 1.5;
            const tp = 50 + (py - 50) / 1.5;

            const pxSpark = 50 + (px - 50) / 7;
            const pySpark = 50 + (py - 50) / 7;
            const pOpc = 20 + Math.abs(pa) * 1.5;
            const rotateX = ((tp - 50) / 2) * -1; // Rotación en X
            const rotateY = ((lp - 50) / 1.5) * 0.5; // Rotación en Y

            // Aplicar transformaciones al estilo del elemento
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = "none";

            // Actualizar estilos para gradiente y efectos
            if (!hoverStyleRef.current) {
                hoverStyleRef.current = document.createElement("style");
                document.head.appendChild(hoverStyleRef.current);
            }
            const grad_pos = `background-position: ${lp}% ${tp}%;`;
            const sprk_pos = `background-position: ${pxSpark}% ${pySpark}%;`;
            const opc = `opacity: ${pOpc / 100};`;
            hoverStyleRef.current.innerHTML = `
                #${cardId}:hover:before { ${grad_pos} }  /* gradient */
                #${cardId}:hover:after { ${sprk_pos} ${opc} }   /* sparkles */
            `;
        }
    };

    const handleInteractionEnd = (cardId: string) => {
        const card = document.getElementById(cardId);
        if (card) {
            // Restablecer transformaciones
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
            card.style.transition = "transform 0.5s ease"; // Suavizar el regreso

            // Limpiar estilos
            if (hoverStyleRef.current) {
                hoverStyleRef.current.innerHTML = "";
            }
        }
    };

    return (
        <section className="cards">
            {cards.map((card: Card, index: number) => (
                <div
                    className="card-element"
                    id={"card-" + index}
                    key={"card-" + index}
                    onMouseMove={(e) => handleInteractionMove(e, "card-" + index)}
                    onTouchMove={(e) => handleInteractionMove(e, "card-" + index)}
                    onMouseLeave={() => handleInteractionEnd("card-" + index)}
                    onTouchEnd={() => handleInteractionEnd("card-" + index)}
                >
                    <Image
                        id={card.name}
                        src={card.image}
                        width={300} // Ajustar ancho para Next.js Image
                        height={400} // Ajustar alto para Next.js Image
                        alt={card.name}
                        title={card.name}
                    />
                </div>
            ))}
        </section>
    );
}