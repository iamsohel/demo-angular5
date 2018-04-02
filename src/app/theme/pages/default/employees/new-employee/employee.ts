export interface Address {
  id?: number;
  user_id?: number;
  address_type: string;
  address_line: string;
  city: string;
  zip_code: string;
  state: string;
  country: string;
}

export interface Employee {
  id?: number;
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  job_title: string;
  phone: string;
  home_phone: string;
  mobile: string;
  website: string;
  fax: string;
  facebook: string;
  google: string;
  linkedin: string;
  twitter: string;
  address: Address[];
  visibility?: boolean;
  active?: string;
}

export class Employees {
  employee: Employee;

  constructor() {
  }

  init(): Employee {
    this.employee = {
      first_name: '',
      last_name: '',
      email: '',
      company_name: '',
      job_title: '',
      phone: '',
      home_phone: '',
      mobile: '',
      website: '',
      fax: '',
      facebook: '',
      google: '',
      linkedin: '',
      twitter: '',
      address: [{
        address_type: 'Mailing Address',
        address_line: '',
        city: '',
        zip_code: '',
        state: '',
        country: '',
      }],
      visibility: true,
    };
    return this.employee;
  }

  getEmptyAddress(): Address {
    const addrs = {
      address_type: '',
      address_line: '',
      city: '',
      zip_code: '',
      state: '',
      country: '',
    };
    return addrs;
  }

}
