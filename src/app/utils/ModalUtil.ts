import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";

import { ModalConfirmComponent } from "../modals/modal-confirm/modal-confirm.component";

export class ModalUtil {

	static openConfirmModal(modalService: BsModalService, message: string, confirmButton: string = 'SIM', declineButton: string = 'NÃO'): Promise<any> {
		let bsModalRef: BsModalRef;

		const initialState: ModalOptions = {
			initialState: {
				message: message,
				confirmButton: confirmButton,
				declineButton: declineButton,
			},
			backdrop: "static"
		};

		bsModalRef = modalService.show(ModalConfirmComponent, initialState);

		return new Promise((resolve, reject) => {
			bsModalRef.content.onClose.subscribe(
				result => { resolve(result) }
			)
		});
	}

}