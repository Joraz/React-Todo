/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./interfaces.d.ts" />

namespace app.components
{
	export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState>
	{
		constructor(props: ITodoItemProps)
		{
			super(props);
			this.state = {editText: this.props.todo.title};
		}

		public handleSubmit(event: React.SyntheticEvent): void
		{
			let val = this.state.editText.trim();

			if (val)
			{
				this.props.onSave(val);
				this.setState({editText: val});
			}
			else
			{
				this.props.onDestroy();
			}
		}

		public handleEdit(): void
		{
			this.props.onEdit();
			this.setState({editText: this.props.todo.title});
		}

		public handleKeyDown(event: React.KeyboardEvent): void
		{
			if (event.which === app.constants.ESCAPE_KEY)
			{
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			}
			else if (event.which === app.constants.ENTER_KEY)
			{
				this.handleSubmit(event);
			}
		}

		public handleChange(event: any)
		{
			this.setState({editText: event.target.value});
		}

		public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState): boolean
		{
			return (
				nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText
			);
		}

		public componentDidUpdate(prevProps: ITodoItemProps)
		{
			if (!prevProps.editing && this.props.editing)
			{
				let node: HTMLInputElement = React.findDOMNode<HTMLInputElement>(this.refs["editField"]);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		}

		public render(): JSX.Element
		{
			return (
				<li className={React.addons.classSet({completed: this.props.todo.completed, editing: this.props.editing})}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={this.props.todo.completed}
							onChange={this.props.onToggle}
						/>
						<label onDoubleClick={ e => this.handleEdit() }>
							{this.props.todo.title}
						</label>
						<button className="destroy" onClick={this.props.onDestroy}/>
					</div>
					<input
						ref="editField"
						className="edit"
						value={this.state.editText}
						onBlur={ e => this.handleSubmit(e) }
						onChange={ e => this.handleChange(e) }
						onKeyDown={ e => this.handleKeyDown(e) }
					/>
				</li>
			);
		}
	}
}