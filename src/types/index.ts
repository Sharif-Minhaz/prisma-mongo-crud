export interface ITodo {
	id: string;
	title: string;
	isComplete: boolean;
	createdAt: Date;
	author: IUser;
}

export interface IAddTodo {
	title: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
}
