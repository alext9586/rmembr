import { v4 as uuid } from 'uuid';

export interface IConnection {
    _id: string;
    nextId: string;
    title: string;
    notes: string;
}

export class Connection {
    private id: string;

    get _id(): string {
        return this.id;
    }

    constructor(
        id: string = uuid(),
        public nextId: string = "",
        public title: string = "",
        public notes: string = ""
    ) {
        this.id = id;
    }

    toJson(): IConnection {
        return {
            _id: this.id,
            nextId: this.nextId,
            title: this.title,
            notes: this.notes
        };
    }
}