import { V2 , Block , Score } from './interfaces'

export class CLandingArea {
    private m_x: number = 0;
    private m_y: number = 0;
    private m_width: number = 100;
    private m_height: number = 100;
    private m_lastHit: V2 = { x: 0, y: 0 }; // debug feature only
    private m_score: Score = { x: 0 , y: 25 , width: 0 , height: 0 , currentNumber: -1 , currentString: "" , color: "#FFFFFF" };

    constructor( private m_context: CanvasRenderingContext2D , private m_currentBlock: Block , private m_scalecoef: number ) {
        this.m_x = ( m_context.canvas.width - this.m_width ) / 2;
        this.m_y = ( m_context.canvas.width - this.m_width ) / 2;
        
        this.m_context.font = "24px gamefont";
        this.ScoreUP();
    }

    Render() {
        this.RenderHitArea();
        this.RenderScore();
        // this.RenderHitbox();
    }

    Hit() {
        this.m_lastHit.x = this.m_currentBlock.x + ( this.m_currentBlock.image.width * this.m_scalecoef ) / 2;
        this.m_lastHit.y = this.m_currentBlock.y + ( this.m_currentBlock.image.height * this.m_scalecoef ) / 2;
        const hit = this.m_lastHit.x >= this.m_x && this.m_lastHit.x <= this.m_x + this.m_width && this.m_lastHit.y >= this.m_y && this.m_lastHit.y <= this.m_y + this.m_height;

        if( hit ) {
            this.SmallerArea();
            this.ScoreUP();
        }

        return hit;
    }

    private SmallerArea() {
        if( this.m_width > 70 && this.m_height > 70 )
        {
            this.m_width -= 2;
            this.m_height -= 2;
            this.m_x += 1;
            this.m_y += 1;
        }
    }

    private ScoreUP() {
        this.m_score.currentNumber++;
        this.m_score.currentString = `Score: ${ this.m_score.currentNumber }`;
        this.m_score.x = ( this.m_context.canvas.width - this.m_context.measureText( this.m_score.currentString ).width ) / 2;
    }

    private RenderScore() {
        this.m_context.imageSmoothingEnabled = true;
        this.m_context.fillStyle = this.m_score.color;
        this.m_context.fillText( this.m_score.currentString , this.m_score.x , this.m_score.y );
        this.m_context.fillStyle = "#000000";
        this.m_context.imageSmoothingEnabled = false;
    }

    private RenderHitArea() {
        this.m_context.globalCompositeOperation = "destination-over";
        this.m_context.imageSmoothingEnabled = true;
        this.m_context.beginPath();
        this.m_context.setLineDash( [ 6 ] );
        this.m_context.lineWidth = 2;
        this.m_context.strokeStyle = "#FFD700";
        this.m_context.rect( this.m_x , this.m_y , this.m_width , this.m_height );
        this.m_context.closePath();
        this.m_context.stroke();
        this.m_context.imageSmoothingEnabled = false;
        this.m_context.globalCompositeOperation = "source-over";
    }

    // private RenderHitbox() {
    //     this.m_context.fillStyle = "#00FF00";
    //     this.m_context.fillRect( this.m_lastHit.x - 5 , this.m_lastHit.y - 5 , 10 , 10 );
    //     this.m_context.fillStyle = "#000000";
    // }
}
