import { ComponentType } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {

  @Input() component!: ComponentType<unknown>;
  @Input() config!: MatDialogConfig;
  
  result: any;

  constructor(
      private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  openDialog() {
      this.matDialog.open(this.component, this.config)
      .afterClosed().subscribe(value => {
        this.result = value;
          console.log(`Dialog sent: ${JSON.stringify(value)}`);
      }); 
  }
}
