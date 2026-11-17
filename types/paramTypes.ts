export interface TeamVoteParam {
  teamID: number;
  quantity: number;
}

export interface PagingParam {
  pageNum: number;
  pageSize: number;
}

export interface AccountVerificationParam {
  fullName: string;
  phone: string;
  idCardNum: string;
  email: string;
  locationID: number;
  locationName: string;
  districtID: number;
  districtName: string;
  wardID: number;
  wardName: string;
  addressDetail: string;
  spinLogID: number;
}

export interface IDepartment {
  department_id: number;
  department_name: string;
  description: string | null;
}

export interface IFeedback {
  account_feedback_id: number;
  content: string;
  created_date: string;
  department_name: string;
  full_name: string;
  modified_date: string;
  status: number;
  title: string;
  user_name: string;
}
