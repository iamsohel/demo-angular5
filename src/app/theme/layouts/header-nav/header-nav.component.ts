import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';

declare let mLayout: any;

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

  @Input() user: any;

  constructor() {
    console.log(this.user);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    mLayout.initHeader();

  }

}
