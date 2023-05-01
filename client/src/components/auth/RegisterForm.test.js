import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  test("renders without crashing", () => {
    render(<RegisterForm />);
  });

  test("email input element exists and is initially empty", () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
  });

  test("full name input element exists and is initially empty", () => {
    render(<RegisterForm />);
    const fullNameInput = screen.getByLabelText(/full name/i);
    expect(fullNameInput).toBeInTheDocument();
    expect(fullNameInput).toHaveValue("");
  });

  test("username input element exists and is initially empty", () => {
    render(<RegisterForm />);
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveValue("");
  });

  test("password input element exists and is initially empty", () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");
  });

  test("next button exists", () => {
    render(<RegisterForm />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });

  test("clicking next button calls onSubmit function", () => {
    const mockOnSubmit = jest.fn();
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("onSubmit function calls register function with the correct data", async () => {
    const mockRegister = jest.fn();
    const mockData = {
      email: "test@example.com",
      full_name: "John Doe",
      username: "johndoe",
      password: "password123",
    };
    render(<RegisterForm register={mockRegister} registerData={mockData} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockRegister).toHaveBeenCalledWith(mockData);
  });

  test("setFormErrors function is called with the correct errors when the register function throws an error", async () => {
    const mockRegister = jest.fn().mockRejectedValue({
      email: "Invalid email address.",
      username: "Username already exists.",
    });
    const setFormErrorsMock = jest.fn();
    const mockData = {
      email: "test@example.com",
      full_name: "John Doe",
      username: "johndoe",
      password: "password123",
    };
    render(
      <RegisterForm
        register={mockRegister}
        registerData={mockData}
        setFormErrors={setFormErrorsMock}
      />
    );
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(setFormErrorsMock).toHaveBeenCalledWith({
      email: "Invalid email address.",
      username: "Username already exists.",
    });
  });

  test("form errors are displayed correctly", async () => {
    const mockRegister = jest.fn().mockRejectedValue({
      email: "Invalid email address.",
      username: "Username already exists.",
    });

    const mockData = {
      email: "test@example.com",
      full_name: "John Doe",
      username: "johndoe",
      password: "",
    };
  });
});
