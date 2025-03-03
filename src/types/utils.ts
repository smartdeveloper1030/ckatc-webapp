
  export interface student_contact {
    alternate_phone: string;
    first_name: string;
    last_name: string;
    primary_phone: string;
  }   
  
  export interface student_criterion {
      consecutive_days: number;
      created_at: string;
      id: number;
      independent_first_trial: boolean;
      min_therapists: number;
      min_trials_per_day: number;
      only_first_tiral?: boolean;
      percentage: number;
      student_id: number;
  }
  
  export interface Student {
    alternate_contact: student_contact;
    baseline_criterion: student_criterion[];
    bcba: string;
    created_at: string;
    diagnosis: string | null;
    dob: string;
    entry_date: string;
    first_name: string;
    gender: string;
    gender_identity: string;
    id: number;
    last_name: string;
    lead_therapist: string;
    mastered_criterion: student_criterion[];
    primary_contact: student_contact;
    site: string | null;
    student_code: string;
    time_zone: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'therapist' | 'admin' | 'parent';
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }
  
  export interface StudentsResponse {
    success: boolean;
    students: Student[];
    message?: string;
  } 
  
  


  export interface UserInfo {
    avatar_url: string | null;
    created_at: string;
    first_name: string;
    id: string;
    last_name: string;
    mobile_phone: string;
    office_phone: string;
    role: number[];
    user_status: boolean;
    username: string;
  }

  
export interface student_contact {
  alternate_phone: string;
  first_name: string;
  last_name: string;
  primary_phone: string;
}   

export interface student_criterion {
    consecutive_days: number;
    created_at: string;
    id: number;
    independent_first_trial: boolean;
    min_therapists: number;
    min_trials_per_day: number;
    only_first_tiral?: boolean;
    percentage: number;
    student_id: number;
}

export interface Student {
  alternate_contact: student_contact;
  baseline_criterion: student_criterion[];
  bcba: string;
  created_at: string;
  diagnosis: string | null;
  dob: string;
  entry_date: string;
  first_name: string;
  gender: string;
  gender_identity: string;
  id: number;
  last_name: string;
  lead_therapist: string;
  mastered_criterion: student_criterion[];
  primary_contact: student_contact;
  site: string | null;
  student_code: string;
  target_counts: number;
  time_zone: string;
}

export interface TargetInfo {
  analyse_steps: string | null;
  created_at: string;
  description: string;
  desired_daily_tirals: number;
  id: number;
  instructions: string | null;
  interval_schedule: string | null;
  mastery_type: string;
  max_threshold: number | null;
  program_id: number;
  prompt_schedule: string;
  sd: string;
  target_name: string;
  target_status: string;
  target_type: string;
  timer: string | null;
  weight: number | null;
  y_axis_name: string | null;
}

export interface ProgramInfo {
  created_at: string;
  description: string | null;
  id: number;
  instructions: string | null;
  program_name: boolean;
  skill_id: number;
  targets: TargetInfo[];
  title: string;
  weight: number | null;
}

export interface RecordDTTParams {
  student_id: number;
  target_id: number;
  dtt_value: number;
  start_at?: string;
  end_at?: string;
}

