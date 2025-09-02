import { Player } from "./player";

export class Match {
    constructor(
        public id: number,
        public date_match: Date,
        public challenger: Player,
        public holder: Player,
        public winner: Player,
        public looser: Player,
        public observation: string | null,
        public status: string
    ) {}
}