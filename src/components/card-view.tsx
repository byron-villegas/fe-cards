"use client";

import "@saeris/typeface-beleren-bold"; // Magic font
import VanillaTilt from 'vanilla-tilt'; // Import VanillaTilt for tilt effect
import "@style/CardViewComponent.css"; // Import local styles

import configuration from "@config/configuration";
import Card from "@model/card";
import Image from "next/image"; // Use Next.js Image component for optimized images
import { useEffect, useRef, useState } from "react";

function fontByGame(game: string): string {
    switch (game) {
        case "Magic The Gathering":
            return "font-beleren-bold";
        case "Mitos y Leyendas":
            return "font-eagle-lake";
        case "Digimon":
            return "font-jersey";
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
            VanillaTilt.init(tiltRef.current, {
                max: 25, // Máxima inclinación
                speed: 400, // Velocidad de animación
                glare: true, // Habilitar efecto de brillo
                "max-glare": 0.5, // Máximo brillo
                gyroscope: false, // Habilitar giroscopio para touch
            });

            // Listener para convertir touch en mousemove
            const handleTouchMove = (e: TouchEvent) => {
                if (tiltRef.current) {
                    const touch = e.touches[0];
                    const mouseEvent = new MouseEvent("mousemove", {
                        bubbles: true,
                        cancelable: true,
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                    });
                    tiltRef.current.dispatchEvent(mouseEvent);
                }
            };

            // Agregar y limpiar eventos de touch
            tiltRef.current.addEventListener("touchmove", handleTouchMove);
            return () => {
                tiltRef.current?.removeEventListener("touchmove", handleTouchMove);

                // Validar si tiltRef.current es una instancia de VanillaTilt
                if (tiltRef.current && "vanillaTilt" in tiltRef.current) {
                    (tiltRef.current as unknown as VanillaTilt)?.destroy(); // Destruir instancia de VanillaTilt
                }
            };
        }
    }, [card]);

    if (!card) {
        return <div className="container mt-5">Card not found</div>;
    }

    return (
        <div className="container">
            <div className="row">
                {/* Columna izquierda: Imagen de la carta */}
                <div className="col-md-5">
                    <div
                        ref={tiltRef} // Asignar el ref al contenedor
                        className="card-element"
                        id={"card-" + card.id}
                        key={"card-" + card.id}>
                        <Image
                            src={card.imageUrl}
                            alt={card.name}
                            priority={true}
                            width={450}
                            height={600}
                            style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

                {/* Columna derecha: Detalles de la carta */}
                <div className="col-md-5 mt-3 card-details">
                    <h1 className={"mt-2 mb-3 " + fontByGame(card.game)}>{card.name}</h1>
                    <p><strong>Card name:</strong> {card.name}</p>
                    <p><strong>Card number:</strong> {card.number}</p>
                    <p><strong>Rarity:</strong> {card.attributes.rarity}</p>
                    <p className="text-capitalize"><strong>{card.attributes.element}:</strong> {card.attributes.manaCost} {card.attributes.color}</p>
                    <p><strong>Attack:</strong> {card.stats.attack}</p>
                    <p><strong>Defense:</strong> {card.stats.defense}</p>
                    <p><strong>Health:</strong> {card.stats.health}</p>
                    <p><strong>Type:</strong> {card.type}</p>
                    <p><strong>Expansion:</strong> {card.set.name}</p>
                    <p className="card-text"><strong>Card text:</strong> {card.description}</p>
                    <p><strong>Game:</strong> {card.game}</p>
                    <p><strong>Artist:</strong> {card.artist}</p>
                    <p><strong>Count:</strong> {card.count}</p>
                </div>
            </div>
        </div>
    );
}