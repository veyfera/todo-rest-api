export enum Status {
    Draft,
    Open,
    Inprogress,
    Complete,
    Cancelled
}

export enum Priority {
    Low,
    Normal,
    Critical
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    ts: number;
}
