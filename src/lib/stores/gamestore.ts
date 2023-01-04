import { writable } from 'svelte/store';

export function createGameStateStore() {
	const { subscribe, set, update } = writable<GameState>({
        state: 'setup',
        gamestate: 'night',
        nightCount: 0,
        roles: []
    });

	return {
		subscribe,
        setDay: () => update(currentState => ({...currentState, gamestate: 'day'})),
        setNight: () => update(currentState => ({...currentState, gamestate: 'night', nightCount: currentState.nightCount + 1})),
		reset: () => set({
            state: 'setup',
            gamestate: 'night',
            nightCount: 0,
            roles: []
        })
	};
}

export const gameStore = createGameStateStore();


export type GameState = {
    state : 'setup' | 'game' | 'finished';
    gamestate: 'day' | 'night';
    nightCount: number;
    roles: Role[];
}

type Role = 'villager'| 'armor' | 'visionary' | 'witch' | 'werwolf' | 'villagehoe' | 'hunter';