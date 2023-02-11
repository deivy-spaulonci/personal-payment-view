export default class DefaultService {
    root = 'http://localhost:8083/api/v1/';

    get(url) {
        return fetch(this.root+url).then(res => res.json());
    }
}