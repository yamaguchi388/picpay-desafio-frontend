import { Component, Input, OnInit } from '@angular/core';

type ImgSize = 'small' | 'large';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {

  @Input() name: string;
  @Input() size: ImgSize = 'small';

  constructor() { }

  ngOnInit(): void {
  }

}
