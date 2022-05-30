import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ToastService } from "angular-toastify";

import { IFilters, ISearchFilters } from "src/app/interfaces/IFilters";
import { IPayment } from "src/app/interfaces/IPayment";
import { PaymentsService } from "src/app/services/payments/payments.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  payments: IPayment[];
  selectedPayment: IPayment;
  filters: IFilters = {
    page: 1,
    limit: 5,
    sortField: "username",
    sortOrder: "asc",
  };
  loading: boolean;
  deleteModalState: boolean;
  includeModalState: boolean;
  editModalState: boolean;
  pages: number = 0;

  constructor(
    private toastService: ToastService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  ngAfterViewInit(): void {}

  /**
   * @function
   * Subscribe to payments services and save
   * the response in payments class member.
   * @error
   * exbit a toaster error.
   */
  getPayments(): void {
    this.loading = true;

    this.paymentsService.getPayments(this.filters).subscribe(
      (payments) => {
        const totalCount: string = payments.headers.get("X-Total-Count");
        this.pages = Math.ceil(Number(totalCount) / this.filters.limit);

        this.payments = [...payments.body];
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.toastService.error("Usuário não autorizado!");
        } else {
          this.toastService.error("Ocorreu um erro ao buscar pagamentos!");
        }

        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  /**
   * @function
   * Capture change page size event
   * and research payments.
   * @param pageSize
   */
  onChangePageSize(pageSize: number) {
    this.filters.limit = pageSize;

    this.getPayments();
  }

  /**
   * @function
   * Capture change page event
   * and research payments.
   * @param pageSize
   */
  onChangePage(page: number) {
    this.filters.page = page;

    this.getPayments();
  }

  /**
   * @function
   * Capture change sort field/ order
   * and research payments.
   * @param pageSize
   */
  onSort(sortOptions: { sortField: string; sortOrder: "asc" | "desc" }) {
    this.filters.sortField = sortOptions.sortField;
    this.filters.sortOrder = sortOptions.sortOrder;

    this.getPayments();
  }

  /**
   * @function
   * clear input filters for payment search.
   */
  clearFilters() {
    delete this.filters["name"];
    delete this.filters["username"];
    delete this.filters["title"];
    delete this.filters["value"];
    delete this.filters["date"];
    delete this.filters["isPayed"];
  }

  /**
   * @function
   * Capture input filters
   * and search for payments.
   * @param searchFilters
   */
  searchByString(searchFilters: ISearchFilters) {
    this.clearFilters();

    this.filters[searchFilters.searchField] = searchFilters.searchString;
    this.filters.page = 1;

    this.getPayments();
  }

  onDelete(event: boolean) {
    if (event) this.getPayments();

    this.selectedPayment = undefined;
    this.deleteModalState = false;
  }

  openDeleteModal(event: IPayment) {
    this.selectedPayment = { ...event };
    this.deleteModalState = true;
  }

  openIncludeDialog() {
    this.includeModalState = true;
  }

  onCloseIncludeDialog(event: boolean) {
    if (event) this.getPayments();

    this.includeModalState = false;
  }

  openEditModal(event: IPayment) {
    this.selectedPayment = { ...event };
    this.editModalState = true;
  }

  onEdit(event: any) {
    if (event) this.getPayments();

    this.selectedPayment = undefined;
    this.editModalState = false;
  }
}
