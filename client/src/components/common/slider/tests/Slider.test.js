import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Slider from "../Slider";

describe("Test slider", () => {
  it("Renders without crashing", () => {
    render(<Slider checked={false} onClickFun={jest.fn()} />);
  });
  it("When checked is true", () => {
    render(<Slider checked={true} onClickFun={jest.fn()} />);
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("checked");
  });
  it("When checked is false", () => {
    render(<Slider checked={false} onClickFun={jest.fn()} />);
    const slider = screen.getByTestId("slider");
    expect(slider).not.toHaveClass("checked");
  });

//   TODO: check the slider when clicked
});
