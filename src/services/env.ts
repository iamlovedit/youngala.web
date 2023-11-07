class GlobalConfig {
    baseUrl!: string;
    constructor() {
        if (process.env.NODE_ENV == 'development') {
            this.baseUrl = 'https://uat.youngala.com'
        }
        else if (process.env.NODE_ENV == 'production') {
            this.baseUrl = 'https://openapi.youngala.com'
        }
    }
}

const globalConfig = new GlobalConfig()
export {
    globalConfig
}