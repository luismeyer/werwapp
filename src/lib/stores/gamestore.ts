import { writable } from 'svelte/store';

export function createGame() {
	const { subscribe, set, update } = writable<GameState>({
        state: 'setup',
        gamestate: 'night',
        nightCount: 0,
        roles: []
    });

	return {
		subscribe,
        toggleGameState: () => update(currentState => ({...currentState, gamestate: currentState.gamestate === 'day' ? 'night' : 'day'})),
		reset: () => set({
            state: 'setup',
            gamestate: 'night',
            nightCount: 0,
            roles: []
        })
	};
}


export type GameState = {
    state : 'setup' | 'game' | 'finished';
    gamestate: 'day' | 'night';
    nightCount: number;
    roles: Role[];
}

type Role = 'villager'| 'armor' | 'visionary' | 'witch' | 'werwolf' | 'villagehoe' | 'hunter';