import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    readonly COACH_URL = '/coaches';

    constructor(private httpClient: HttpClient) { }

    retrieveCoaches() {
        return this.httpClient.get(this.COACH_URL).toPromise();
    }
}
