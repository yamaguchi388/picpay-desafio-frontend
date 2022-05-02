export class StringUtil {

    static formatValue(value: number) {
        return "R$ " + value.toFixed(2).replace('.', ',')
    }
}