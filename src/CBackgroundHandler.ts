export class CBackgroundHandler {

    private m_gradient: CanvasGradient;
    private m_gradientLeves: number[] = [ 0 , 0.25 , 0.3 , 0.4 , 1 ];

    constructor( private m_context: CanvasRenderingContext2D ) {
        this.m_gradient = m_context.createLinearGradient( m_context.canvas.width / 2 , 0 , m_context.canvas.width / 2 , m_context.canvas.height );
        this.HigherLevel();
    }

    Render() {
        this.m_context.globalCompositeOperation = "destination-over";
        this.m_context.fillStyle = this.m_gradient;
        this.m_context.fillRect( 0 , 0 , this.m_context.canvas.width , this.m_context.canvas.height );
        this.m_context.fillStyle = "#000000";
        this.m_context.globalCompositeOperation = "source-over";
    }

    HigherLevel( newGradient: boolean = false ) {
        this.m_gradient = this.m_context.createLinearGradient( this.m_context.canvas.width / 2 , 0 , this.m_context.canvas.width / 2 , this.m_context.canvas.height );
        
        if( newGradient )
            this.m_gradientLeves = this.m_gradientLeves.map( level => level + 0.05 <= 1 ? level + 0.05: level );
        
        this.m_gradient.addColorStop( this.m_gradientLeves[ 0 ] , "black" );
        this.m_gradient.addColorStop( this.m_gradientLeves[ 1 ] , "white" );
        this.m_gradient.addColorStop( this.m_gradientLeves[ 2 ] , "#b4f2fc" );
        this.m_gradient.addColorStop( this.m_gradientLeves[ 3 ] , "#44b7fc" );
        this.m_gradient.addColorStop( this.m_gradientLeves[ 4 ] , "darkgreen" );
    }
}