export type CreateTaskBody = {
    title: string;
    description: string;
    completed: boolean;
    user_id: string;
}