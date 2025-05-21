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
        case "Pokemon":
            return "";
        case "Digimon":
            return "font-jersey";
        case "Mitos y Leyendas":
            return "font-eagle-lake";
        default:
            return "font-default";
    }
}

function fontAttackByGame(game: string): string {
    switch (game) {
        case "Magic The Gathering":
            return "font-crimson-text";
        case "Pokemon":
            return "";
        case "Digimon":
            return "font-jersey";
        case "Mitos y Leyendas":
            return "font-eagle-lake";
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
                const response = await fetch(`${configuration.server.url}/${configuration.server.paths.cards}/${id}`, { cache: 'default' });
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
                            src={card.imageUrl.includes('//') ? card.imageUrl : `/images/${card.game.toLowerCase()}/${card.imageUrl}`}
                            alt={card.name}
                            priority={true}
                            width={450}
                            height={600}
                            style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
                {/* Columna derecha: Detalles de la carta */}
                <div className="col-md-6 card-details mt-1-mw">
                    <h1 className={"mt-2 mb-3 " + fontByGame(card.game)}>{card.name}</h1>
                    <p><strong>Card name:</strong> {card.name}</p>
                    {
                        (() => {
                            switch (card.game) {
                                case "Magic The Gathering":
                                    return (
                                        <>
                                            <p><strong>Mana Cost:</strong> {card.attributes.manaCost} {card.attributes.color}</p>
                                            <p><strong>Mana Value:</strong> {card.attributes.manaCost + 1}</p>
                                            <p><strong>P/T:</strong> {card.stats.attack}/{card.stats.defense}</p>
                                        </>
                                    );
                                case "Pokemon":
                                    return (
                                        <>
                                            <p><strong>HP:</strong> {card.stats.health}</p>
                                            <p><strong>Weakness:</strong> {card.stats.weaknessType} x {card.stats.weakness}</p>
                                            <p><strong>Resistance:</strong> {card.stats.resistance == 0 ? <></> : (<>{card.stats.resistanceType} - {card.stats.resistance}</>)}</p>
                                            <p><strong>Retreat: </strong> {card.stats.retreatCost}</p>
                                        </>
                                    );
                                case "Mitos y Leyendas":
                                    return <p><strong>Special Rule:</strong> Myth-specific rule</p>;
                                case "Digimon":
                                    return <p><strong>Special Rule:</strong> Digimon-specific rule</p>;
                                default:
                                    return null;
                            }
                        })()
                    }
                    <p><strong>Types:</strong> {card.type}</p>
                    <p className="card-text"><strong>Description:</strong> {card.description}</p>
                    <p><strong>Expansion:</strong> {card.set.name}</p>
                    <p><strong>Rarity:</strong> {card.attributes.rarity}</p>
                    <p><strong>Card number:</strong> {card.number}</p>
                    <p><strong>Artist:</strong> {card.artist}</p>
                    <p><strong>Count:</strong> {card.count}</p>
                </div>
                {/* Columna derecha: Habilidades y efectos de la carta */}
                <div className="col-md-11 mt-3 card-details">
                    <h1 className={"mt-2 mb-3 " + fontByGame(card.game)}>Card Abilities</h1>
                    {
                        <ol className="list-group">
                            {
                                card.abilities.map((ability, index) => (
                                    <li key={index} className="list-group-item card-list d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto text-white">
                                            <div className="fw-bold text-white">{ability.name} {ability.damage}{ability.damageMultiplier}</div>
                                            <p className={fontAttackByGame(card.game)}>{ability.description}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ol>
                    }

                    <h1 className={"mt-3 mb-3 " + fontByGame(card.game)}>Card Effects</h1>
                    {
                        <ol className="list-group mb-3">
                            {
                                card.effects.map((effect, index) => (
                                    <li key={index} className="list-group-item card-list d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto text-white">
                                            <div className="fw-bold text-white">{effect.name}</div>
                                            <p className={fontAttackByGame(card.game)}>{effect.description}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ol>
                    }
                </div>
            </div>
        </div>
    );
}