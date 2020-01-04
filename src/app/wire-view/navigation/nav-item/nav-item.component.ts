import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit
{

  @Input()
  items: any[];

  show: boolean;

  constructor() { }

  ngOnInit()
  {
  }

  scrollTo(itemName)
  {
    const e = document.getElementById(itemName);
    if (!!e && e.scrollIntoView)
    {
      e.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
      });
    }
  }

  preventClick(event: Event)
  {
    event.preventDefault();
    event.stopPropagation();
  }
}
