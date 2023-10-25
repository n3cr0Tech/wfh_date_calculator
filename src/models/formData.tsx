import { PTODateRange } from "./ptoDateRange"

export type FormData = {
    startDate: Date,
    ptoDates: PTODateRange[],
    attendanceRequired: number, //ex: 60 would mean "60 percent is required"
    weeksInWorkCycle: number //ex: 12 means there are 12 weeks in a work cycle    
}