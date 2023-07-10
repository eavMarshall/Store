import {useSyncExternalStore} from 'react';

export default class Store {
    #currentState;
    #listeners;

    constructor(initialState) {
        this.currentState = initialState;
        this.listeners = new Set();
    }

    setState = (newState) => {
        this.currentState = {...this.currentState, ...newState};
        this.listeners.forEach((listener) => listener(this.currentState));
    };

    subscribe = (listener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    useStore = () => {
        return (selector = (state) => state) =>
            useSyncExternalStore(this.subscribe, () => selector(this.currentState));
    };

    getState = () => {
        return this.currentState;
    };
}
