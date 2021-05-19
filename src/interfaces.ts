export interface CanvasData {
    width: number;
    height: number;
}

export interface V2 {
    x: number;
    y: number;
}

export interface Block {
    x: number;
    y: number;
    image: HTMLImageElement;
}

export interface HTMLStats {
    x: HTMLElement;
    y: HTMLElement;
}

export interface LadingArea extends Block {
    width: number;
    height: number;
    render(): void;
    hit(): void;
}

export interface Text {
    x: number;
    y: number;
    width: number;
    height: number;
    currentString: string;
    color: string;
}

export interface Score extends Text {
    currentNumber: number;
}

export enum MenuStates {
    MENU = 0,
    CREDITS,
    GAME,
    NONE
}

export interface MenuOption extends Text {
    state: MenuStates
}