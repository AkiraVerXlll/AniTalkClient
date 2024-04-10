import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable()
export class AppConfigService {
    constructor(private http: HttpClient) {
        this.loadAppConfig();
    }

    private appConfig: any;

    loadAppConfig() {
        return this.http.get('../assets/application.json')
            .pipe(map(data => {
                this.appConfig = data;
            }));
    }

    get apiBaseUrl() {

        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.Api.BaseUrl;
    }
}