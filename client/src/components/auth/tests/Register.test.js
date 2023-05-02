import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AuthDataContext, AuthProvider } from "../../../contexts/AuthContext";
import Register from "../Register";
import { MemoryRouter } from "react-router-dom";

describe('Register component', () => {
    const userData = {email: ""};
    const userConfirmEmail = jest.fn();
    const userLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the register form when step is 1', () => {
        render(
            <AuthDataContext.Provider value={{ userData, userConfirmEmail, userLogin }}>
                <MemoryRouter>
                    <Register step={1} />
                </MemoryRouter>
            </AuthDataContext.Provider>
        );

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText('Full name')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('renders the confirmation code when step is 2', () => {
        const userData = {
            email: "test@test.com"
        };
        render(
            <AuthDataContext.Provider value={{userData, userConfirmEmail, userLogin}}>
                <MemoryRouter>
                    <Register  />
                </MemoryRouter>
            </AuthDataContext.Provider>
        );

        expect(screen.getByPlaceholderText("Confirmation code")).toBeInTheDocument();
        expect(screen.getByText('Enter the confirmation code we sent to test@test.com.')).toBeInTheDocument();
    })
});