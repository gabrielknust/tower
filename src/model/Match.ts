import { Player } from "./Player";

export class Match {
    constructor(
        public id: number,
        public date_match: Date,
        public challenger: Player,
        public holder: Player,
        public winner: Player | null = null,
        public looser: Player | null = null,
        public observation: string | null = null,
        public status: string = 'A confirmar'
    ) {}
}