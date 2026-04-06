export interface ITask {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}