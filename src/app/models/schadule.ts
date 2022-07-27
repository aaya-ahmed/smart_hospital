export interface schadules{
    id:number,
    doctors:doctors_schadule[]
}
export interface doctors_schadule{
  doctorId:number,
  doctorName:string,
  scheduleObjects:list_schadule[]
}
export interface list_schadule{
  dayOfWork:number,
  startTime:string,
  endTime:string,
  timePerPatient:string,
  scheduleId:number
}
export interface newDocSchadule{
    doctorId:number,
    dayOfWork:number,
    startTime:string,
    endTime:string,
    timePerPatient:string
}
export interface allSlot{
    doctorId:number,
    doctorName:string,
    workSchedules:Slot[]
  }
  export interface Slot {
    dayOfWork: number
    slots: Slotinfo[]
  }
  
  export interface Slotinfo {
    slot_Id: string
    slotTime: string
    slotNumber: string
  }
  
