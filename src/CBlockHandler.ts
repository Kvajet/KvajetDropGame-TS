import { Block } from './interfaces'

export class CBlockHandler {
    private m_hook: HTMLImageElement;
    private m_imagesSrc: string[] = [
        "base.png",
        "random-0.png",
        "random-1.png",
        "random-2.png",
        "random-3.png",
        "random-4.png",
        "random-5.png",
    ];
    private m_path: string = "./images/";
    private m_images: HTMLImageElement[];
    private m_builtBlocks: HTMLImageElement[] = [];
    m_currentBlock: Block;
    m_scalecoef: number = 2;
    private m_direction: boolean = true;
    
    constructor( private m_context: CanvasRenderingContext2D ) {
        this.m_images = [];
        for( const imageSrc of this.m_imagesSrc ) {
            let tmpImage = new Image();
            tmpImage.src = `${ this.m_path }${ imageSrc }`;
            this.m_images.push( tmpImage );
        }
        this.m_currentBlock = {
            x: 0,
            y: 0,
            image: this.m_images[ this.GenIndex() ]
        }

        this.m_hook = new Image();
        this.m_hook.src = "./images/hook.png";

        this.m_builtBlocks.push( this.m_images[ 0 ] );
    }

    private GenIndex() {
        return 1 + Math.floor( Math.random() * 100 ) % ( this.m_images.length - 1 );
    }

    NewBlock() {
        if( this.m_builtBlocks.length == 8 )
            this.m_builtBlocks.shift();

        this.m_builtBlocks.push( this.m_currentBlock.image );

        const index = this.GenIndex();
        this.m_currentBlock.image = this.m_images[ index ];

        if( this.m_direction )
            this.m_currentBlock.x = this.m_context.canvas.width - this.m_currentBlock.image.width * this.m_scalecoef;
        else
            this.m_currentBlock.x = 0;
        this.m_direction = ! this.m_direction;
        this.m_currentBlock.y = 0;
    }

    Render() {
        this.m_context.drawImage( this.m_currentBlock.image , this.m_currentBlock.x , this.m_currentBlock.y , this.m_currentBlock.image.width * this.m_scalecoef , this.m_currentBlock.image.height * this.m_scalecoef );
        this.RenderTower();
        this.RenderHook();
    }

    private RenderTower() {
        let height = this.m_context.canvas.width;

        this.m_context.globalCompositeOperation = "destination-over";
        for( const block of this.m_builtBlocks.slice().reverse() ) {
            this.m_context.drawImage( block , ( this.m_context.canvas.width - block.width * this.m_scalecoef ) / 2 , height , block.width * this.m_scalecoef , block.height * this.m_scalecoef );
            height += ( this.m_currentBlock.image.height * this.m_scalecoef ) / 1.9;
        }
        this.m_context.globalCompositeOperation = "source-over";
    }

    private RenderHook() {
        this.m_context.drawImage( this.m_hook , this.m_currentBlock.x + this.m_hook.width / 2 + 5, -1 * this.m_hook.height * this.m_scalecoef + this.m_currentBlock.y + this.m_currentBlock.image.height / 1.3, this.m_hook.width * this.m_scalecoef , this.m_hook.height * this.m_scalecoef );
    }
}
