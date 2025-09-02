import { Player } from "./player";
import { Tower } from "./tower";

export class Classification {
    constructor(
        public id: number,
        public player: Player,
        public tower: Tower,
        public position: number
    ) {}
}