export class DateUtil {

    static stringDateToLocaleString(date: string, options: any) {
        const locale = 'pt-br';   
        return new Date(date).toLocaleDateString(locale, options)
    }
}