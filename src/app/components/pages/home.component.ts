import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    coaches: [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.retrieveCoaches().then((data: []) => {
            this.coaches = data;
        });
    }
}
