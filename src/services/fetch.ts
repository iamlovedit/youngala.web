import { globalConfig } from './env.ts';

export class HttpRequest {
    readonly requestConfig: any = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
    }
    readonly baseUrl: string;
    constructor(controller: string, baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = `${baseUrl}/${controller}`
        }
        else {
            this.baseUrl = `${globalConfig.baseUrl}/${controller}`
        }
    }

    async getAsync<T>(route: string = '', data: any = {}): Promise<T> {
        let url = this.baseUrl + route;
        let dataStr: string = '';
        const keys: string[] = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (data[key]) {
                dataStr += key + '=' + data[key] + '&';
            }
            else {
                dataStr += key + '=&';
            }
        }
        if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr
        }
        return await fetch(url, this.requestConfig)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status.toString())
                }
                return response.json() as Promise<T>
            }).catch(error => {
                throw new Error(error);
            })
    }
}