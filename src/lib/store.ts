import { writable, type Writable } from 'svelte/store';

export const pageNo: Writable<number> = writable(0);

export interface LocalData {
    time: number;
    isSubmit: boolean;
    yet: boolean;
}

export const localdata: Writable<LocalData> = writable({ time: 0, isSubmit: false, yet: false });