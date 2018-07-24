import { v4 as uuid } from 'uuid';

export interface IConnection {
    _id: string;
    _rev: string;
    nextId: string;
    title: string;
    notes: string;
}

export class Connection {
    private id: string;
    private rev: string;

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

    fromJson(connection: IConnection): void {
        this.id = connection._id;
        this.rev = connection._rev;
        this.nextId = connection.nextId;
        this.title = connection.title;
        this.notes = connection.notes;
    }

    toJson(): IConnection {
        return {
            _id: this.id,
            _rev: this.rev,
            nextId: this.nextId,
            title: this.title,
            notes: this.notes
        };
    }
}