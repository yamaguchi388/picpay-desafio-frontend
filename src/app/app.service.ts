import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
 
export class AppService {

    private apiUrl = 'http://localhost:3000/'

    constructor(private http: HttpClient) { }

    getAccountByEmailAndPassword(email: string, password: string): Promise<any[]> {
        return new Promise ((resolve, reject) => {
            this.http.get<any>(this.apiUrl + 'account?email=' + email + '&password=' + password).subscribe(
                success => {
                    resolve(success);
                },
                error => {
                    reject(error);
                }
            )
          })
    }
}