export default class Util {
    formatCurrencyBR(value){
        return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',minimumFractionDigits: 2,}).format(value);
    }
    formatDateBr(value){
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
}