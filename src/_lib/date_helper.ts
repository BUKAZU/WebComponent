
import { format, parse } from 'date-fns';
import { es, nl, de, fr, it, enGB } from 'date-fns/locale';

const locales: any = {
    en: enGB,
    nl,
    de,
    fr,
    it,
    es,
};

function FormatIntl(date: number, formatStr: string) : String {    
    return format(date, formatStr, {
        locale: locales[window.__localeId__], // or global.__localeId__
    });
};

function Parse_EN_US(date_string: string) {
    return parse(date_string, 'yyyy-MM-dd', new Date());
}

const MONTH_FORMAT:string = 'MMMM yyyy';
const LONG_DATE_FORMAT:string = 'EEEE dd MMMM yyyy'

export { FormatIntl, Parse_EN_US, MONTH_FORMAT, LONG_DATE_FORMAT };