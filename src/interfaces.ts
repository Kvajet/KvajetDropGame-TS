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

export interface Score {
    x: number;
    y: number;
    width: number;
    height: number;
    currentString: string;
    currentNumber: number;
    color: string;
}
