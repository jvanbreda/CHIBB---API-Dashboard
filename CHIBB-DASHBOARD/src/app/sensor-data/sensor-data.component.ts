import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.css']
})
export class SensorDataComponent implements OnInit, OnDestroy {
  private sid: string;
  private subscription: any;
  private options: Object;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(params => {
      this.sid = params['sid'] + "";
    })

    this.makeGraph();
  }

  makeGraph() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
