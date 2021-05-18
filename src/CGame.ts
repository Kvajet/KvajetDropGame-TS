import { V2 , CanvasData } from './interfaces'
import { CLandingArea } from './CLandingArea'
import { CBlockHandler } from './CBlockHandler'
import { CBackgroundHandler } from './CBackgroundHandler';

export class CGame {

    private m_canvas: HTMLCanvasElement;
    private m_context: CanvasRenderingContext2D;
    private m_velocity: V2 = { x: 0.5 * 3 , y: 0.5 * 3 };
    // private m_lastTime: number = 0;
    private m_landingArea: CLandingArea;
    private m_blockHandler: CBlockHandler;
    private m_backgroundHandler: CBackgroundHandler;
    private m_cData: CanvasData = { width : 0, height: 0 }

    constructor() {
        const lfCanvas = document.getElementById( "game-window" );
        if( ! lfCanvas )
            throw new Error( "Not able to initialize canvas." );
    
        this.m_canvas = lfCanvas as HTMLCanvasElement;
        this.m_context = this.m_canvas.getContext( "2d" ) as CanvasRenderingContext2D;
        
        if( this.m_context == null )
            throw new Error( "Not able to initialize canvas." );

        this.InitCanvasData();

        this.m_blockHandler = new CBlockHandler( this.m_context );
        this.m_landingArea = new CLandingArea( this.m_context , this.m_blockHandler.m_currentBlock , this.m_blockHandler.m_scalecoef );
        this.m_backgroundHandler = new CBackgroundHandler( this.m_context );

        this.m_context.imageSmoothingEnabled = false;

        this.m_canvas.addEventListener( 'click' , this.ClickHandler );
    }

    private InitCanvasData = () => {
        this.m_cData.width = this.m_canvas.width;
        this.m_cData.height = this.m_canvas.height;
    }

    private ClickHandler = ( ev: MouseEvent ) => {
        if( this.m_landingArea.Hit() ) {
            this.m_blockHandler.NewBlock();
            this.m_velocity.y *= -1;

            this.m_velocity.x *= 1.1;
            this.m_velocity.y *= 1.1;

            this.m_backgroundHandler.HigherLevel( true );
        }
    }

    private UpdatePosition() {
        if(    this.m_blockHandler.m_currentBlock.x > ( this.m_canvas.width - this.m_blockHandler.m_currentBlock.image.width * this.m_blockHandler.m_scalecoef )
            || this.m_blockHandler.m_currentBlock.x < 0 ) {
            this.m_velocity.x *= -1;
            this.m_velocity.y *= -1;
        }

        this.m_blockHandler.m_currentBlock.x += this.m_velocity.x;
        this.m_blockHandler.m_currentBlock.y += this.m_velocity.y;
    }

    private Render( time: number ) {
        this.m_context.clearRect( 0 , 0 , this.m_canvas.width , this.m_canvas.height );

        this.m_blockHandler.Render();
        this.m_landingArea.Render();
        this.m_backgroundHandler.Render();
    }

    private Loop = ( time: number ) => {
        this.Update(time);
        this.Render(time);
        requestAnimationFrame( this.Loop );
    }

    private Update( time: number ) {

        this.UpdatePosition();
        // this.m_lastTime = time;
    }

    Play() {
        requestAnimationFrame( this.Loop );
    }
}