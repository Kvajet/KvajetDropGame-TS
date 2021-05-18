import './../css/style.css'
import { CGame } from './CGame'

window.onload = () => {
    try {
        const game = new CGame();
        game.Play();
    } catch( e ) {
        console.log( e );
    }
}
