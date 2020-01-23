import { ElementData } from './elementData';
import { Line } from '../line/line.component';
export class App
{
    components: CustomComponent[] = new Array();
    name: string = 'My App'
    framework: Framework = Framework.paper
    pages: Page[] = new Array();
    level: number = 1;
}

export class Page
{
    name: string;
    description: string;
    elementData: ElementData[] = new Array();
    pages: Page[] = new Array();
    lines: Line[] = new Array();
    resolutionW = 1240;
    resolutionH = 874;

    constructor(name: string = 'new Page')
    {
        this.name = name;
    }
}

export class CustomComponent
{
    name: string = '';
    html: string = '';
}

export enum Framework
{
    Bulma = 'Bulma',
    Bootstrap = 'Bootstrap',
    paper = 'paper'
}