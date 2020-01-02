import { Injectable } from '@angular/core';
import { ElementData } from '../+models/elementData';

@Injectable({
  providedIn: 'root'
})
export class CollisionService
{
  public isCollision: boolean;
  public collisionType: number;

  constructor() { }

  /**
   * Its 2 AM im tired TODO rubbish
   * @param part  
   * @param other 
   */
  public checkCollision(part: ElementData, other: ElementData)
  {
    const target = document.getElementById('line');

    if (other.xPos.toFixed(0) == part.xPos.toFixed(0) && this.collisionType != 0)
    {
      //const movedEle = document.getElementById(part.guid);
      //const otherEle = document.getElementById(other.guid);

      this.collisionType = 0;

      this.xMoveLine(target, other.xPos + 10, part.yPos, other.yPosEnd);
      return;
    }

    if (other.xPosEnd.toFixed(0) == part.xPosEnd.toFixed(0) && this.collisionType != 1)
    {
      this.collisionType = 1;
      this.xMoveLine(target, other.xPosEnd + 10, part.yPos, other.yPosEnd);
      return;
    }

    if (other.xPos.toFixed(0) == part.xPosEnd.toFixed(0) && this.collisionType != 2)
    {
      this.collisionType = 2;
      this.xMoveLine(target, part.xPosEnd + 10, part.yPos, other.yPosEnd);
      return;
    }


    if (other.xPosEnd.toFixed(0) == part.xPos.toFixed(0) && this.collisionType != 3)
    {
      this.collisionType = 3;
      this.xMoveLine(target, part.xPos + 10, part.yPosEnd, other.yPosEnd);
      return;
    }

    // < > POS
    if (other.yPos.toFixed(0) == part.yPos.toFixed(0) && this.collisionType != 4)
    {
      this.collisionType = 4;
      this.yMoveLine(target, part.yPos + 10, part.xPosEnd, other.xPosEnd);
      return;
    }

    if (other.yPos.toFixed(0) == part.yPosEnd.toFixed(0) && this.collisionType != 6)
    {
      this.collisionType = 6;
      this.yMoveLine(target, part.yPosEnd + 10, part.xPosEnd, other.xPosEnd);
      return;
    }

    if (other.yPosEnd.toFixed(0) == part.yPos.toFixed(0) && this.collisionType != 7)
    {
      this.collisionType = 7;
      this.yMoveLine(target, part.yPos + 10, part.xPosEnd, other.xPosEnd);
      return;
    }

    if (other.yPosEnd == part.yPosEnd && this.collisionType != 5)
    {
      this.collisionType = 5;
      this.yMoveLine(target, part.yPosEnd + 10, part.xPosEnd, other.xPosEnd);
      return;
    }
  }

  xMoveLine(target: HTMLElement, x: number, y1: number, y2: number)
  {
    this.isCollision = true;
    /*
        target.setAttribute('x1', x + '');
        target.setAttribute('y1', y1 + '');
        target.setAttribute('x2', x + '');
        target.setAttribute('y2', y2 + '');
    */

    setTimeout(() =>
    {
      this.isCollision = false;
      /*
      target.setAttribute('x1', 0 + '');
      target.setAttribute('y1', 0 + '');
      target.setAttribute('x2', 0 + '');
      target.setAttribute('y2', 0 + '');
      */
    }, 500);
  }

  yMoveLine(target: HTMLElement, y: number, x1: number, x2: number)
  {
    this.isCollision = true;

    /*
    target.setAttribute('x1', x1 + '');
    target.setAttribute('y1', y + '');
    target.setAttribute('x2', x2 + '');
    target.setAttribute('y2', y + '');
    */
    setTimeout(() =>
    {
      this.isCollision = false;
      /*
      target.setAttribute('x1', 0 + '');
      target.setAttribute('y1', 0 + '');
      target.setAttribute('x2', 0 + '');
      target.setAttribute('y2', 0 + '');
      */
    }, 500);
  }
}
