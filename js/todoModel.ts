/// <reference path="./interfaces.d.ts" />

namespace app.models
{
	export class TodoModel implements ITodoModel
	{
		public todos: Array<ITodo>;
		public onChanges: Array<Function>;

		constructor(public key: string)
		{
			this.todos = app.misc.Utils.store(key);
			this.onChanges = [];
		}

		public subscribe(onChange): void
		{
			this.onChanges.push(onChange);
		}

		public inform(): void
		{
			app.misc.Utils.store(this.key, this.todos);
			this.onChanges.forEach((onChange: Function) =>
			                       {
				                       onChange();
			                       });
		}

		public addTodo(title: string)
		{
			this.todos = this.todos.concat({
				                               id:        app.misc.Utils.uuid(),
				                               title:     title,
				                               completed: false
			                               });

			this.inform();
		}

		public toggleAll(checked: boolean): void
		{
			this.todos = this.todos.map((todo: ITodo) =>
			                                   {
				                                   return app.misc.Utils.extend({}, todo, {completed: checked});
			                                   });

			this.inform();
		}

		public toggle(todoToToggle: ITodo): void
		{
			this.todos = this.todos.map((todo: ITodo) =>
			                            {
				                            return todo !== todoToToggle ? todo : app.misc.Utils.extend({}, todo, {completed: !todo.completed});
			                            });

			this.inform();
		}

		public destroy(todo: ITodo): void
		{
			this.todos = this.todos.filter((candidate: ITodo) =>
			                               {
				                               return candidate !== todo;
			                               });

			this.inform();
		}

		public save(todoToSave: ITodo, text: string): void
		{
			this.todos = this.todos.map((todo: ITodo) =>
			                            {
				                            return todo !== todoToSave ? todo : app.misc.Utils.extend({}, todo, {title: text});
			                            });

			this.inform();
		}

		public clearCompleted(): void
		{
			this.todos = this.todos.filter((todo: ITodo) =>
			                               {
				                               return !todo.completed;
			                               });

			this.inform();
		}
	}
}