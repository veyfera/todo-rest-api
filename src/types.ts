enum Status {
    Draft,
    Open,
    Inprogress
    Complete
    Rejected
}

enum Priority {
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
}
