export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId?: number;
}

export function fetchTodos(): Promise<Todo[]> {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Не удалось загрузить задачи. Статус: ${response.status}`);
            }
            return response.json() as Promise<Todo[]>;
        });
}

