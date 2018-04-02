import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-bs-switch',
  template: `
        <span class="m-bootstrap-switch m-bootstrap-switch--pill m-bootstrap-switch--air">
          <input [attr.data-switch]="data" type="checkbox" id="switch" #switch [attr.data-on-color]="onColor" [attr.data-on-text]="onText"
                 [attr.data-off-text]="offText">
      </span>
    `,
  styles: []
})
export class BsSwitchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() onColor = 'info';
  @Input() data = true;
  @Input() onText = 'On';
  @Input() offText = 'Off';
  @Input() size = 'small';
  @Input() isChecked = false;
  @ViewChild('switch') switch: ElementRef;
  @Output('onChange') onChange = new EventEmitter<boolean>();
  subscript: any;
  value: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.switch.nativeElement.checked = this.isChecked;
    $(this.switch.nativeElement).bootstrapSwitch();
    this.subscript = this.checkObserver().subscribe(val => {
      if (val !== this.value) {
        this.value = val;
        this.onChange.emit(val);
      }
    });
  }

  checkObserver(): Observable<boolean> {
    return new Observable<boolean>(observe => {
      setInterval(_ => {
        observe.next(this.switch.nativeElement.checked);
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.subscript.unsubscribe();
  }


}
