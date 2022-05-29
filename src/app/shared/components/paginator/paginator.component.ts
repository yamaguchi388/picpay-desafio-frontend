import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() length: number;
  @Input() pageSizeOptions: Array<number> = [5, 10, 15, 25, 50];
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() showFirstLastButtons: boolean = true;
  @Output() pageChanger = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
  }

  handlePageEvent(event: PageEvent) {
    this.pageChanger.emit(event);
  }
}
