import Ability from "./ability";
import Attribute from "./attribute";
import Effect from "./effect";
import Set from "./set";
import Stat from "./stat";

export default interface Card {
    id: string;
    name: string;
    imageUrl: string;
    number: number;
    game: string;
    type: string;
    description: string;
    attributes: Attribute;
    stats: Stat;
    abilities: Ability[];
    effects: Effect[];
    set: Set;
    artist: string;
    count: number;
}