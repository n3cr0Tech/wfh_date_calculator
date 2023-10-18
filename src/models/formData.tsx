export type FormData = {
    startDate: Date,
    ptoDates: {
        startDates: Date[],
        endDates: Date[]
    },
    attendanceRequired: number, //ex: 60 would mean "60 percent is required"
    weeksInWorkCycle: number //ex: 12 means there are 12 weeks in a work cycle    
}