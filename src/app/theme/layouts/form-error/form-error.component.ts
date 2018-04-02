import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-message',
  template: `
        <ng-content></ng-content>`,
  styles: []
})
export class FormErrorMessageComponent implements OnInit {
  @Input() message: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(el.nativeElement, 'form-control-feedback');
  }

  ngOnInit() {
    this.hide();
  }

  hide() {
    this.el.nativeElement.style.display = 'none';
  }

  show() {
    this.el.nativeElement.style.display = 'block';
  }
}

@Component({
  selector: 'app-form-errors',
  template: `
        <ng-content></ng-content>
    `,
  styles: []
})
export class FormErrorComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input() messages: FormControl;
  @ContentChildren(FormErrorMessageComponent) children: QueryList<FormErrorMessageComponent>;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    this.messages.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        console.log(this.messages);
        this.hideAll();
        if (!this.messages.disabled && (this.messages.dirty || this.messages.touched)) {
          this.show(Object.keys(this.messages.errors)[0]);
        }
      } else {
        this.hideAll();
      }
    });
  }

  hideAll() {
    this.children.forEach((item, index) => {
      item.hide();
    });
  }

  show(status) {
    const content = this.children.find((item) => {
      return item.message === status;
    });
    if (content) {
      content.show();
    }
  }
}


