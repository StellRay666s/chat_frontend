import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService} from "../../services/alert.service";
import {NgClass} from "@angular/common";
import {filter, interval, Subject, takeUntil, timeout, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit, OnDestroy {
  constructor(private alertService: AlertService) {
  }

  destroy$ = new Subject<boolean>()

  message = ''

  alerts: Alert[] = []

  ngOnInit() {
    this.alertService.visible.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.alerts.push({isShow: val.isShow, message: val.message, timeClose: val.timeClose})
    })
    interval(3000).pipe(takeUntil(this.destroy$)).subscribe(()=>{
      this.alerts.splice(-1,1)
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }


}
