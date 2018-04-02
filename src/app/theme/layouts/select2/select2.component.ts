import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'select-2',
  templateUrl: './select2.component.html',
  styles: []
})
export class Select2Component implements OnInit, AfterViewInit {
  @Input() control: FormControl;
  @Output() OnSelected = new EventEmitter<any>();
  @Input() selectConfig: any;
  @Input() displayKey: string;
  @Input() returnKey: string;
  @Input() options: any[];

  constructor() {
  }

  ngOnInit() {
    if (this.selectConfig.data) {
      this.setData();
    }
  }

  ngAfterViewInit() {

    $('#select2').select2(this.selectConfig)
      .on('select2:select select2:unselect', function(e) {
        // Do something
        const value = $('#select2').val();
        if (value.length) {
          this.selected(value);
        }
      }.bind(this));
    this.control.valueChanges.subscribe((val) => {
      if (val === null) {
        $('#select2').val([]).trigger('change');
      } else {
        $('#select2').val(val).trigger('change');
      }
    });
  }

  selected(data) {
    this.control.setValue(data);
    this.OnSelected.emit(data);
  }

  setData() {
    const value = this.options.filter((val, index) => {
      if (val.name === this.selectConfig.data.name) {
        this.options[index].selected = true;
        return true;
      }
      return false;
    });
    if (value) {
      console.log(value);
    }
  }
}
