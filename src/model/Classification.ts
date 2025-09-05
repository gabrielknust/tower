import { Player } from "./Player";
import { Tower } from "./Tower";

export class Classification {
    constructor(
        public id: number,
        public player_id: Player,
        public tower_id: Tower,
        public position: number
    ) {}
}