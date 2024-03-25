export type PeriodType = {
    startDate: string,
    endDate: string
}

export const isSamePeriod = (p1?: PeriodType | null, p2?: PeriodType | null) => {
    if (!p1 || !p2) return false;
    return p1.startDate === p2.startDate && p1.endDate === p2.endDate
}