export interface IFormModalProps {
  modalState: { id: number | null; isOpen: boolean };
  onClose: () => void;
}
