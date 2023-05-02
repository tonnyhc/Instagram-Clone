import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import RegisterForm from "../RegisterForm";
import { AuthDataContext } from "../../../contexts/AuthContext";

const MockAuthProvider = ({ children }) => {
  const userLogin = jest.fn();
  const authData = { user: null, userLogin };
  return (
    <AuthDataContext.Provider value={authData}>
      {children}
    </AuthDataContext.Provider>
  );
};

describe("RegisterForm", () => {
  const mockSetRegisterData = jest.fn();
  const mockChangeStep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(
      <MockAuthProvider>
        <RegisterForm
          registerData={{
            email: "",
            full_name: "",
            password: "",
            username: "",
          }}
          setRegisterData={mockSetRegisterData}
          changeStep={mockChangeStep}
        />
      </MockAuthProvider>
    );
  });

  it("shows validation errors when fields are invalid", async () => {
    render(
      <MockAuthProvider>
        <RegisterForm
          registerData={{
            email: "",
            username: "",
            full_name: "",
            password: "",
          }}
          setRegisterData={mockSetRegisterData}
          changeStep={mockChangeStep}
        />
      </MockAuthProvider>
    );

    const submitButton = screen.getByRole("button", {name: "Next"});
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    // TODO: Fix the test when u have fixed the error messages on the RegistrationForm, rightnow they come from the server,
    // TODO: make validations from the client before sending the request
  });
});
