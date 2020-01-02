import { ResizeOptions, DragOptions } from 'ngx-interactjs';

export class ElementData
{
    guid: string;
    html: string;
    xPos: number;
    yPos: number;
    xPosEnd: number;
    yPosEnd: number;
    width: number;
    height: number;

    resizeOptions = new ResizeOptions();
    dragOptions = new DragOptions();
}