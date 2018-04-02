import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-users-search',
  templateUrl: './user-search.component.html',
  styles: []
})
export class UsersSearchComponent implements OnInit, AfterViewInit {
  @Input() control: FormControl;
  @Output() OnSelected = new EventEmitter<any>();
  @Input() allowClear: boolean;
  @Input() dataUrl: string;
  @Input() headers: any;

  constructor() {
  }

  ngOnInit() {
    if (!this.allowClear) {
      this.allowClear = false;
    }
    if (!this.dataUrl) {
      this.dataUrl = 'https://api.github.com/search/repositories';
    }
  }

  ngAfterViewInit() {
    $('#select-user').select2({
      placeholder: 'Search for users',
      allowClear: this.allowClear,
      ajax: {
        url: this.dataUrl,
        dataType: 'json',
        delay: 250,
        headers: this.headers,
        data: function(params) {
          return {
            search: params.term, // search term
            page: params.page
          };
        },
        processResults: function(data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;
          console.log(data, params);
          return {
            results: data.result.data,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      escapeMarkup: function(markup) {
        return markup;
      }, // let our custom formatter work
      minimumInputLength: 1,
      templateResult: this.formatRepo, // omitted for brevity, see the source of this page
      templateSelection: this.formatRepoSelection // omitted for brevity, see the source of this page
    }).on('select2:select select2:unselect', function(e) {
      // Do something
      this.selected($('#select-user').val());
    }.bind(this));
  }

  selected(data) {
    this.OnSelected.emit(data);
    this.control.setValue(data);
  }

  formatRepo(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'><i class="fa fa-user"></i> <span>' + repo.first_name + ' ' + repo.last_name +
      '</span></div>';
    if (repo.email) {
      markup += '<small class=\'text-muted\'>' + repo.email + '</small>';
    }
    markup += '<div class=\'select2-result-repository__statistics\'>' + '</div>' + '</div></div>';
    return markup;
  }

  formatRepoSelection(repo) {
    return repo.first_name || repo.text;
  }
}
