import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SideNav from "../side-nav/SideNav";
import { AuthDataContext } from "../../../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

const MockAuthProviderMemoryRouter = ({ children }) => {
  const authData = { userData: { username: "test" } };
  return (
    <MemoryRouter>
      <AuthDataContext.Provider value={authData}>
        {children}
      </AuthDataContext.Provider>
    </MemoryRouter>
  );
};

describe("SideNav", () => {
  it("Renders without crashing", () => {
    render(
      <MockAuthProviderMemoryRouter>
        <SideNav />
      </MockAuthProviderMemoryRouter>
    );
  });

  it("Correctly sets the username on the NavLink to profile", () => {
    render(
      <MockAuthProviderMemoryRouter>
        <SideNav />
      </MockAuthProviderMemoryRouter>
    );
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("Renders all the nav items", () => {
    render(
      <MockAuthProviderMemoryRouter>
        <SideNav />
      </MockAuthProviderMemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("When search is clicked the nav bar must become smaller and overlay to appear", () => {
    render(
      <MockAuthProviderMemoryRouter>
        <SideNav />
      </MockAuthProviderMemoryRouter>
    );

    const searchNavItem = screen.getByText("Search");
    const sideNav = screen.getByTestId("sideNavAside");
    expect(sideNav).toBeInTheDocument();
    expect(searchNavItem).toBeInTheDocument();

    fireEvent.click(searchNavItem);
    expect(sideNav).toHaveClass("smallNav");
    expect(screen.getByTestId("searchOverlay")).toBeInTheDocument();
  });

  it("When more button is clicked it must show the dropdown with the more options", () => {
    render(
      <MockAuthProviderMemoryRouter>
        <SideNav />
      </MockAuthProviderMemoryRouter>
    );

    const moreNavItem = screen.getByText("More");
    expect(moreNavItem).toBeInTheDocument();

    fireEvent.click(moreNavItem);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

  });
});
