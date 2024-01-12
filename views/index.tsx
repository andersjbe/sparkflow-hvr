// views/index.tsx
import { useEffect, useState } from "react";
import Todo from "../models/Todo";
import { api } from "../utils/frontend";

export function IndexPage() {
	const [todoList, setTodoList] = useState<Todo[]>([]);

	useEffect(() => {
		(async () => {
			const res = await api.todo.list.$get();
			const result = await res.json();

			if (result.success) {
				setTodoList(result.data);
			} else {
				setTodoList([]);
			}
		})();
	}, []);

	return (
		<>
			<ul>
				{todoList.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</>
	);
}
