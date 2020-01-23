import { Directive, ElementRef, Input } from '@angular/core';
import { ResizeOptions } from './models/ResizeOptions';
declare var interact: any;

@Directive({
  selector: '[interact]'
})
export class InteractDirective
{
  private element;
  private interactObj: any;

  @Input()
  resizeable: ResizeOptions;

  @Input()
  draggable: DragOptions;

  @Input()
  targetChild: boolean;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void
  {
    this.element = this.elementRef.nativeElement;

    if (this.targetChild)
    {
      this.element = this.element.firstElementChild;
    }

    this.interactObj = interact(this.element);

    if (this.draggable)
    {
      this.interactObj.draggable(this.draggable);
    }

    if (this.resizeable)
    {
      this.interactObj.resizable(this.resizeable).on('resizemove', this.resizeable.resizemove).on('resizeend', this.resizeable.resizeend);
    }
  }

  public enableDrag(enable: boolean)
  {
    this.interactObj.draggable(enable);
  }

  public enableResize(enable: boolean)
  {
    this.interactObj.resizable(enable);
  }
}

export class DragOptions
{
  // enable inertial throwing
  inertia = true;
  // keep the element within the area of it's parent
  modifiers = [
    interact.modifiers.snap({
      targets: [
        interact.createSnapGrid({ x: 15, y: 15 })
      ],
      range: Infinity,
      relativePoints: [{ x: 0, y: 0 }]
    })
  ];
  // enable autoScroll
  autoScroll = true;
  // call this function on every dragmove event
  onmove = (event) =>
  {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  };
  // call this function on every dragend event
  onend = (event) => { };
}