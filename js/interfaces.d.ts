interface ITodo
{
	id: string;
	title: string;
	completed: boolean;
}

interface ITodoItemProps
{
	key: string;
	todo: ITodo;
	editing?: boolean;
	onSave(val: any): void;
	onDestroy(): void;
	onEdit(): void;
	onCancel(event: React.SyntheticEvent): void;
	onToggle(): void;
}

interface ITodoItemState
{
	editText: string;
}

interface ITodoFooterProps
{
	completedCount: number;
	onClearCompleted: any;
	nowShowing: string;
	count: number;
}

interface ITodoModel
{
	key: any;
	todos: Array<ITodo>;
	onChanges: Array<any>;
	subscribe(onChange): void;
	inform(): void;
	addTodo(title: string): void;
	toggleAll(checked): void;
	toggle(todoToToggle): void;
	destroy(todo): void;
	save(todoToSave, text): void;
	clearCompleted(): void;
}

interface IAppProps
{
	model: ITodoModel;
}

interface IAppState
{
	editing?: string;
	nowShowing?: string;
}