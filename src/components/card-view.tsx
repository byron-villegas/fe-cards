"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css"; // Import custom CSS
import "../styles/card-view.css"; // Import local styles
import "@saeris/typeface-beleren-bold" // Magic font

import VanillaTilt from 'vanilla-tilt'; // Import VanillaTilt for tilt effect

import Image from "next/image"; // Use Next.js Image component for optimized images
import { useEffect, useRef, useState } from "react";
import Card from "@component/models/card";
import configuration from "@component/config/configuration";

function fontBySaga(saga: string): string {
    switch (saga) {
        case "Magic The Gathering":
            return "font-beleren-bold";
        case "Mitos y Leyendas":
            return "font-eagle-lake";
        case "Digimon Card Game":
            return "jersey";
        default:
            return "font-default";
    }
}

export default function CardViewComponent({ id }: { id: string }) {
    const [card, setCard] = useState<Card>();
    const tiltRef = useRef<HTMLDivElement>(null); // Ref para el contenedor de VanillaTilt

    useEffect(() => {
        const fetchCard = async () => {
            try {
                // Si no se encuentra, hacer una solicitud directa al servicio `cards/id`
                const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}/${id}`, { cache: 'force-cache' });
                const cardFound = await response.json();
                setCard(cardFound);
            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        };

        fetchCard();
    }, [id]);

    // Inicializar VanillaTilt
    useEffect(() => {
        if (tiltRef.current && card) {
            console.log("Inicializando VanillaTilt...");
            VanillaTilt.init(tiltRef.current, {
                max: 25, // Máxima inclinación
                speed: 400, // Velocidad de animación
                glare: true, // Habilitar efecto de brillo
                "max-glare": 0.5, // Máximo brillo
            });
        }
    }, [card]);

    if (!card) {
        return <div className="container mt-5">Card not found</div>;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                {/* Columna izquierda: Imagen de la carta */}
                <div className="col-md-4">
                    <div
                        ref={tiltRef} // Asignar el ref al contenedor
                        className="card-element"
                        id={"card-" + card.id}
                        key={"card-" + card.id} >
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
                    <h1 className={"mb-3 " + fontBySaga(card.saga)}>{card.name}</h1>
                    <p><strong>Card name:</strong> {card.name}</p>
                    <p><strong>Card number:</strong> {card.number}</p>
                    <p><strong>Rarity:</strong> {card.rarity}</p>
                    <p className="text-capitalize"><strong>{card.cost.name}:</strong> {card.cost.value} {card.cost.color}</p>
                    <p><strong>{card.damageAndHealthType}:</strong> {card.strength} / {card.health}</p>
                    <p><strong>Type:</strong> {card.type}</p>
                    <p><strong>Expansion:</strong> {card.expansion}</p>
                    <p className="card-text"><strong>Card text:</strong> {card.text}</p>
                    <p className="card-text"><strong>Aditional text:</strong> {card.aditionalText}</p>
                    <p><strong>Saga:</strong> {card.saga}</p>
                    <p><strong>Artist:</strong> {card.artist}</p>
                    <p><strong>Count:</strong> {card.count}</p>
                </div>
            </div>
        </div>
    );
}