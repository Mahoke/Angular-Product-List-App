import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material';


import { AlertService } from '../_services';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.scss'],
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
            this.snackBar.open(message.text, 'ok', {
              duration: 5000,
            });
          }

            this.message = message;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

