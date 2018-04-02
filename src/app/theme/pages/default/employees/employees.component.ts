import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AuthService } from '../../../../_services/auth.service';
import { AppConfig } from '../../../../_config/app';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  config: AppConfig;

  constructor(private _script: ScriptLoaderService, private authS: AuthService, private router: Router) {
    this.config = new AppConfig();
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initTable();

  }

  initTable() {
    const options: any = {
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            // sample GET method
            method: 'GET',
            url: this.config.apiEndPoint + 'employees/all?token=' + this.authS.getToken(),
            headers: { Authorization: 'Bearer ' + this.authS.getToken() },
            map: function(raw) {
              // sample data mapping
              let dataSet = raw;
              console.log(raw);
              if (typeof raw.result !== 'undefined') {
                dataSet = raw.result.data;
              }
              return dataSet;
            },
          },
        },
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: false,
      },

      // layout definition
      layout: {
        scroll: false,
        footer: false
      },

      // column sorting
      sortable: true,

      pagination: true,

      toolbar: {
        // toolbar items
        items: {
          // pagination
          pagination: {
            // page size select
            pageSizeSelect: [10, 20, 30, 50, 100],
          },
        },
      },

      search: {
        input: $('#name'),
      },

      // columns definition
      columns: [
        {
          field: 'id',
          title: 'User Id',
          sortable: true, // disable sort for this column
          textAlign: 'center',
          width: '40px',
          selector: { class: 'm-checkbox--solid m-checkbox--brand' },
        },
        {
          field: 'image',
          title: 'Image',
          sortable: false, // disable sort for this column
          width: '60px',
          template: function(row) {
            if (row.image !== '' && row.image != null) {
              return '<img class="img-fluid img-avatar img-thumbnail" style="max-width:40px" src="' + row.image + '">';
            } else {
              return '<img class="img-fluid img-avatar img-thumbnail"' +
                ' style="max-width:40px" src="/assets/app/media/img/users/user1.jpg">';
            }
          }
        }, {
          field: 'first_name',
          title: 'Name',
          // sortable: 'asc', // default sort
          filterable: true, // disable or enable filtering
          // basic templating support for column rendering,
          template: '{{first_name}} {{last_name}}',
        }, {
          field: 'email',
          title: 'Email',
          // template: function (row) {
          //     // callback function support for column rendering
          //     return row.ShipCountry + ' - ' + row.ShipCity;
          // },
        }, {
          field: 'company',
          title: 'Company',
        }, {
          field: 'phone',
          title: 'Phone',
        }, {
          field: 'created',
          title: 'Created',
          template: function(row) {
            // callback function support for column rendering
            const d = new Date(row.created);
            return d.toDateString();
          },
        }, {
          field: 'Actions',
          title: 'Actions',
          sortable: false,
          textAlign: 'center',
          overflow: 'visible',
          template: function(row, index, dtTable) {
            const dropup = (dtTable.getPageSize() - index) <= 4 ? 'dropup' : '';
            return '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a data-id="' + row.id + '" data-link="details/' + row.id + '"' +
              ' href="employees/details/' + row.id + '" class="dropdown-item employee_details"\ \
						    	><i class="la la-eye"></i> View Details</a>\
						    	<a data-link="details/' + row.id + '/update" class="dropdown-item employee_details " href="#">\
						    	<i class="la la-edit"></i> Update</a>\
						    	<a data-id="' + row.id + '" class="dropdown-item employee_details" href="#">\
						    	<i class="la la-trash"></i> Delete</a>\
                                <a data-link="details/' + row.id + '/update/avatar" class="dropdown-item employee_details" href="#">\
                                <i class="la la-image"></i> Update Image</a>\
                                <a data-link="details/' + row.id + '/update/password" class="dropdown-item employee_details" href="#">\
                                <i class="la la-lock"></i> Update Password</a>\
                                <a data-id="' + row.id + '" class="dropdown-item employee_details" href="#">\
                                <i class="la la-send-o"></i> Resend Password</a>\
                                <a data-id="' + row.id + '" class="dropdown-item employee_details" href="#">\
                                <i class="la la-envelope"></i> Send Mail</a>\
						  	</div>\
						</div>\
					';
          },
        }],
    };
    options.extensions = {
      checkbox: {},
    };
    const datatable = $('#employee_data').mDatatable(options);

    $('#email').on('keyup', function() {
      datatable.search($(this).val().toLowerCase(), 'email');
    });

    $('#company').on('keyup', function() {
      datatable.search($(this).val().toLowerCase(), 'company');
    });

    // $('#m_form_status, #m_form_type').selectpicker();
    datatable.on('m-datatable--on-click-checkbox m-datatable--on-layout-updated', function(e) {
      // datatable.checkbox() access to extension methods
      const ids = datatable.checkbox().getSelectedId();
      const count = ids.length;
      $('#m_datatable_selected_number1').html(count);
      if (count > 0) {
        $('#m_datatable_group_action_form1').collapse('show');
      } else {
        $('#m_datatable_group_action_form1').collapse('hide');
      }
    });
    datatable.on('m-datatable--on-layout-updated', () => {
      const details = $('.employee_details');
      for (let i = 0; i < details.length; i++) {
        $(details[i]).click(e => {
          e.preventDefault();
          const link = $(details[i]).data('link');
          this.navigate(link);
        });
      }
    });
  }

  navigate(link) {
    this.router.navigate(['/employees/' + link]).then();
  }

}
