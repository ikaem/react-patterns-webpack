import React, { useReducer } from 'react';

type Note = {
	id: number;
	note: string;
};

type Action = {
	type: string;
	payload?: any;
};

// probably better to be an ENUM
type ActionTypes = {
	ADD: 'ADD';
	UPDATE: 'UPDATE';
	DELETE: 'DELETE';
};

const actionTypes: ActionTypes = {
	ADD: 'ADD',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
};

const initialNotes: Note[] = [
	{
		id: 1,
		note: 'Note 1',
	},
	{
		id: 2,
		note: 'Note 2',
	},
];
const reducer = (state: Note[], action: Action) => {
	switch (action.type) {
		case actionTypes.ADD: {
			return [...state, action.payload];
		}
		case actionTypes.DELETE: {
			return state.filter(n => n.id !== action.payload);
		}
		case actionTypes.UPDATE: {
			// this is cool

			return state.map(n => {
				n.id === action.payload.id ? action.payload : n;
			});
		}
		default: {
			return state;
		}
	}
};

export const ReducedComponent: React.FC = () => {
	const [state, dispatchState] = useReducer<(state: Note[], action: Action) => Note[]>(
		reducer,
		initialNotes,
	);

	const handleSubmitNewNote = () => {
		const newNote: Note = {
			id: Date.now(),
			note: 'This is new note',
		};

		const what = (): Action => ({ type: actionTypes.ADD, payload: newNote });

		dispatchState(what());
	};
	return (
		<div>
			{state.map(s => (
				<div key={s.id}>{s.note}</div>
			))}

			<button onClick={handleSubmitNewNote}>Add new</button>
		</div>
	);
};
