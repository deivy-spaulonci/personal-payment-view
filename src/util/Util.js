export default class Util {
    formatCurrencyBR(value){
        return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',minimumFractionDigits: 2,}).format(value);
    }
    formatDateBr(value){
        const date = new Date(value);
        date.setDate(date.getDate()+1)
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    formatData(value){
        if(value) {
            let arr = value.toString().split("/");
            return arr[2] + '-' + arr[1] + '-' + arr[0]
        }
        return '';
    }
    capt(str){
        var capitalized = []
        str.split(' ').forEach(word => {
            capitalized.push(
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
            )
        })
        return capitalized.join(' ');
    }
}