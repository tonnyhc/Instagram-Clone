import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Profile from "../Profile";
import { AuthDataContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/ProfileContext";

const MockContextProviderMemoryRouter = ({ children }) => {
  const authContext = { userData: { username: "test" } };
  const userContext = {
    authUserData: {
      profile_picture: "test.jpeg",
      username: "test",
    },
  };
  return (
    <MemoryRouter>
      <AuthDataContext.Provider value={authContext}>
        <UserContext.Provider value={userContext}>
          {children}
        </UserContext.Provider>
      </AuthDataContext.Provider>
    </MemoryRouter>
  );
};

describe("Profile component tests", () => {
  beforeEach(() => {
    render(
      <MockContextProviderMemoryRouter>
        <Profile />
      </MockContextProviderMemoryRouter>
    );
  });

  it("The profile picture is rendered", () => {
    const profilePic = screen.getByAltText("User profile picture");
    const imageUrl = profilePic.src;
    expect(profilePic).toBeInTheDocument();
    expect(imageUrl).toContain("test.jpg");
  });

  it("The username is correct", () => {
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("The full name is correct", () => {
    expect(screen.getByText("Test Profile")).toBeInTheDocument();
  });
  it("The bio is correct", () => {
    expect(screen.getByText("Test bio")).toBeInTheDocument();
  });
  it('The link to edit profile is there', () => {
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });
  // it('Clicking ')

//   TODO: Fix the test
//   it("Navigates to profile edit page when link is clicked", () => {
//     const editProfileLink = screen.getByText('Edit profile');
//     fireEvent.click(editProfileLink);
//     const pathName = window.location.pathname;
//     console.log(pathName)

//     expect(pathName).toBe('/accounts/edit/');
//   });

//   TODO: Test the followers and posts when have that functionality
});
