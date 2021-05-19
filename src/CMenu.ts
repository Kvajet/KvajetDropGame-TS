import { MenuOption , MenuStates } from './interfaces'

export class CMenu {
    private m_texts: MenuOption[] = [
        { 
            x: 0 , 
            y: 60 , 
            width: 0 , 
            height: 0 , 
            currentString: "Just play!" , 
            color: "#FF0000",
            state: MenuStates.GAME
        },
        { 
            x: 0 , 
            y: 100 , 
            width: 0 , 
            height: 0 , 
            currentString: "Credits" , 
            color: "#00A000",
            state: MenuStates.CREDITS
        }
    ];

    private m_credits: MenuOption[] = [
        {
            x: 0 , 
            y: 20 , 
            width: 0 , 
            height: 0 , 
            currentString: "Hello there, this is my        " , 
            color: "#000000",
            state: MenuStates.NONE
        },
        {
            x: 0 , 
            y: 50 , 
            width: 0 , 
            height: 0 , 
            currentString: "game coded on stream        " , 
            color: "#000000",
            state: MenuStates.NONE
        },
        {
            x: 0 , 
            y: 110 , 
            width: 0 , 
            height: 0 , 
            currentString: "credits:" , 
            color: "#0000FF",
            state: MenuStates.NONE
        },
        {
            x: 0 , 
            y: 140 , 
            width: 0 , 
            height: 0 , 
            currentString: "Kvajet silen_z kociqq        " , 
            color: "#000000",
            state: MenuStates.NONE
        },
        {
            x: 0 , 
            y: 170 , 
            width: 0 , 
            height: 0 , 
            currentString: "security urdont okski        " , 
            color: "#000000",
            state: MenuStates.NONE
        },
        {
            x: 0 , 
            y: 400 , 
            width: 0 , 
            height: 0 , 
            currentString: "  BACK :)" , 
            color: "#000000",
            state: MenuStates.MENU
        }
    ]

    private m_state: MenuStates = MenuStates.MENU;

    constructor( private m_context: CanvasRenderingContext2D ) {
        this.InitTexts( this.m_texts );
        this.InitTexts( this.m_credits );
    }

    Render() {
        switch( this.m_state ) {
            case MenuStates.MENU:
                this.RenderMenuOptions();
                break;
            case MenuStates.CREDITS:
                this.RenderCredits()
                break;
            default:
                break;
        }
    }

    Click( ev: MouseEvent ) {
        const state = this.DetectTextCollision( ev );
        console.log( state );
        console.log( `m_state: ${ this.m_state }` );
        switch( state ) {
            case MenuStates.MENU:
                this.m_state = MenuStates.MENU;
                break;
            case MenuStates.CREDITS:
                this.m_state = MenuStates.CREDITS;
                break;
            case MenuStates.GAME:
                if( this.m_state == MenuStates.MENU )
                    return true;
                break;
            default:
                break;
        }
        return false;
    }

    private DetectTextCollision( ev: MouseEvent ) {
        const x = ev.offsetX;
        const y = ev.offsetY;

        for( const text of [ ...this.m_texts , ...this.m_credits ] ) {
            const res = x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y;
            if( res ) {
                return text.state;
            }
        }
        return MenuStates.NONE;
    }

    private InitTexts( texts: MenuOption[] ) {
        for( const text of texts ) {
            text.width = this.m_context.measureText( text.currentString ).width;
            text.x = ( this.m_context.canvas.width - text.width ) / 2 - 15;
            text.height = 24 + 5;
        }
    }

    private RenderMenuOptions() {
        for( const text of this.m_texts ) {
            this.RenderText( text );
        }
    }

    private RenderCredits() {
        for( const text of this.m_credits ) {
            this.RenderText( text );
        }
    }

    private RenderText( text: MenuOption ) {
        this.m_context.fillStyle = text.color;
        this.m_context.fillText( 
            text.currentString , 
            text.x ,
            text.y
        )
        this.m_context.fillStyle = "#000000";
    }
}