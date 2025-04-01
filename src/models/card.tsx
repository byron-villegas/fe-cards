import Cost from "./cost";

export default interface Card {
    id: string;
    name: string;
    number: number;
    cost: Cost;
    strength: number;
    health: number;
    damageAndHealthType: string;
    rarity: string;
    image: string;
    saga: string;
    type: string;
    expansion: string;
    text: string;
    aditionalText: string;
    artist: string;
    count: number;
}