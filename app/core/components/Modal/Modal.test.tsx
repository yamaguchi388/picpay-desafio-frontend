import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from ".";

describe("<Modal />", () => {
  it("should corretly render", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        Modal test
      </Modal>
    );

    const modal = screen.getByRole("presentation");

    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();
  });

  it("should corretly render with open false", () => {
    const handleClose = jest.fn();
    render(
      <Modal open={false} onClose={handleClose}>
        Modal test
      </Modal>
    );

    const modal = screen.getByRole("presentation", { hidden: true });

    expect(modal).toBeInTheDocument();
    expect(modal).not.toBeVisible();
  });
});
