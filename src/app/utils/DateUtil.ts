export class DateUtil {

    static stringDateToLocaleString(date: string, options: any) {
        const locale = 'pt-br';   
        return new Date(date).toLocaleDateString(locale, options)
    }

    static stringDateToDatetimeLocal(date: string) {
        return date.substring(0, date.length - 4);
    }
}