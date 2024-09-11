import firebase from "firebase/compat/app";
export interface Appointment {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    notes:string;
  }


  export interface AppointmentData {
    id: string;
    title: string;
    startDate: firebase.firestore.Timestamp;
    endDate: firebase.firestore.Timestamp;
    notes: string;
  }

  export interface SchedulerChanges {
    deleted?: string | number;
    added?: any;
    changed?: any;
  }