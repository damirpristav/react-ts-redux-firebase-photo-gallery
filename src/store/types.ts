export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';

export const GET_ENRTY = 'GET_ENRTY';
export const ADD_ENTRY = 'ADD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';

export interface User {
  firstName: string;
  email: string;
  id: string;
  userName: string;
  createdAt: any;
  userRoles: any;
  profileImg: any;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
  userName: string;
  profileImg: any;
}

export interface SignInData {
  email: string;
  password: string;
}

// Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction;

// Entry actions
export interface UserEntry {
  projectName: string,
  ManagerName: string,


  workDate: any,
  workedHours: any,
  trackedHours: any,
  supportHours: any,

  dailyInOutEntry: [{
    inTime: any,
    breakInTime: any,
    breakOutTime: any,
    teaBreakInTime: any,
    teaBreakOutTime: any,
    outTime: any,
  }]

  description: any,

  createdAt: any;
  userEmail: string;
  userId?: string;
  userName: string;

}

export interface EntryState {
  UserEntry: UserEntry[];
  entryLoaded: boolean;
}

interface AddEntryAction {
  type: typeof ADD_ENTRY;
  payload: UserEntry;
}

interface GetEntryAction {
  type: typeof GET_ENRTY;
  payload: UserEntry[];
}

interface DeleteEntryAction {
  type: typeof DELETE_ENTRY;
  payload: UserEntry;
}

export type EntryAction = AddEntryAction | GetEntryAction | DeleteEntryAction;
