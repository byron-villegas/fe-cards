"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css"; // Import custom CSS
import "../styles/card-view.css"; // Import local styles

import Image from "next/image"; // Use Next.js Image component for optimized images
import { useEffect, useRef, useState } from "react";
import Card from "@component/models/card";
import configuration from "@component/config/configuration";

export default function CardViewComponent({ id }: { id: string }) {

    const hoverStyleRef = useRef<HTMLStyleElement | null>(null);

    const [card, setCard] = useState<Card>();

    // Obtener datos en el cliente usando useEffect
    useEffect(() => {
        const fetchCard = async () => {
            const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}` , { cache: 'force-cache' });
            const cards = await response.json();
            const foundCard = cards.find((card: Card) => card.id == id);
            setCard(foundCard);
        };

        fetchCard();
    }, [id]);

    if (!card) {
        return <div className="container mt-5">Card not found</div>;
    }

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
        <div className="container mt-3">
            <div className="row">
                {/* Columna izquierda: Imagen de la carta */}
                <div className="col-md-4">
                    <div
                        className="card-element"
                        id={"card-" + card.id}
                        key={"card-" + card.id}
                        onMouseMove={(e) => handleInteractionMove(e, "card-" + card.id)}
                        onTouchMove={(e) => handleInteractionMove(e, "card-" + card.id)}
                        onMouseLeave={() => handleInteractionEnd("card-" + card.id)}
                        onTouchEnd={() => handleInteractionEnd("card-" + card.id)} >
                        <Image
                            src={card.image}
                            alt={card.name}
                            priority={true}
                            width={400}
                            height={600} />
                    </div>
                </div>

                {/* Columna derecha: Detalles de la carta */}
                <div className="col-md-5 mt-3 card-details">
                    <h1 className={"mb-3 " + "font-" + card.nameFont}>{card.name}</h1>
                    <p><strong>Card name:</strong> {card.name}</p>
                    <p><strong>Card number:</strong> {card.number}</p>
                    <p><strong>Rarity:</strong> {card.rarity}</p>
                    <p className="text-capitalize"><strong>{card.cost.name}:</strong> {card.cost.value} {card.cost.color}</p>
                    <p><strong>{card.damageAndHealthType}:</strong> {card.strengh} / {card.health}</p>
                    <p><strong>Type:</strong> {card.type}</p>
                    <p><strong>Expansion:</strong> {card.expansion}</p>
                    <p className="card-text"><strong>Card text:</strong> {card.text}</p>
                    <p className="card-text"><strong>Aditional text:</strong> {card.aditionalText}</p>
                    <p><strong>Saga:</strong> {card.saga}</p>
                    <p><strong>Artist:</strong> {card.artist}</p>
                </div>
            </div>
        </div>
    );
}