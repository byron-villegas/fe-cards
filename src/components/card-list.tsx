"use client"

import "@style/CardListComponent.css"; // Import local styles

import Card from "@model/card";
import Image from "next/image"; // Use Next.js Image component for optimized images
import Link from 'next/link';
import { useState } from "react";

export default function CardListComponent({ cards }: { cards: Card[] }) {

    const types = [...new Set(cards.map((card: Card) => card.type))];

    const releasedYears = [...new Set(cards.map((card: Card) => card.set.releaseYear))];

    const expansions = [...new Set(cards.map((card: Card) => card.set.name))];

    const [filteredType, setFilteredType] = useState<string>("reset");
    const [filteredYear, setFilteredYear] = useState<string>("reset");
    const [filteredExpansion, setFilteredExpansion] = useState<string>("reset");

    let orderedCards = cards;

    if (filteredType == "reset" && filteredYear == "reset" && filteredExpansion == "reset") {
        orderedCards = cards;
    }

    if (filteredType != "reset") {
        orderedCards = orderedCards.filter((card: Card) => card.type == filteredType);
    }

    if (filteredYear != "reset") {
        orderedCards = orderedCards.filter((card: Card) => card.set.releaseYear.toString() == filteredYear);
    }

    if (filteredExpansion != "reset") {
        orderedCards = orderedCards.filter((card: Card) => card.set.name == filteredExpansion);
    }

    return (
        <div className="container-fluid">
            <div className="row row-cols-1 mb-3">
                <div className="col-md-4">
                    <label>
                        <h2 className="text-center">Filtrar Por Tipo</h2>
                    </label>
                    <select id="filterType" aria-label="Filtrar Por Tipo" className="form-select" value={filteredType} onChange={e => setFilteredType(e.target.value)}>
                        <option value="reset">Reset</option>
                        {
                            types.sort((x, y) => x.localeCompare(y)).map((type: string) => {
                                return (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="col">
                    <label>
                        <h2 className="text-center">Filtrar Por Año de Lanzamiento</h2>
                    </label>
                    <select id="filterReleaseYear" aria-label="Filtrar Por Año de Lanzamiento" className="form-select" value={filteredYear} onChange={e => setFilteredYear(e.target.value)}>
                        <option value="reset">Reset</option>
                        {
                            releasedYears.sort((x, y) => x - y).map((year: number) => {
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <label>
                        <h2 className="text-center">Filtrar Por Expansion</h2>
                    </label>
                    <select id="filterExpansion" aria-label="Filtrar Por Expansion" className="form-select" value={filteredExpansion} onChange={e => setFilteredExpansion(e.target.value)}>
                        <option value="reset">Reset</option>
                        {
                            expansions.sort((x, y) => x.localeCompare(y)).map((expansion: string) => {
                                return (
                                    <option key={expansion} value={expansion}>
                                        {expansion}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-lg-5 justify-content-center">
                {orderedCards.map((card: Card) => (
                    <div className="col mb-3" id={`card-${card.id}`} key={`card-${card.id}`}>
                        <div className="card">
                            <Link href={`/card/${card.id}`}>
                                <div>
                                    <Image src={card.imageUrl.includes('//') ? card.imageUrl : `/images/${card.game.toLowerCase()}/${card.imageUrl}`} width={300} height={400} alt={card.name} title={card.name} className="card-element" />
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}