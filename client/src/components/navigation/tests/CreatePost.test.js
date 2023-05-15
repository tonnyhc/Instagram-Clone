import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"

import CreatePost from "../create-post/CreatePost"

describe("CreatePost modal", () => {
    it('Renders without crashing', () => {
        const closeModal = jest.fn();
        render(<CreatePost closeModal={closeModal}/>);
    });
    it('Correct UI', () => {
        const closeModal = jest.fn();
        render(<CreatePost closeModal={closeModal}/>);

        expect(screen.getByText('Create new post')).toBeInTheDocument();
        expect(screen.getByText('Drag photos and videos here')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Select from computer'})).toBeInTheDocument();
    });
    it("Clicking select from computer to click the input file button", () => {
        const closeModal = jest.fn();
        render(<CreatePost closeModal={closeModal}/>);

        const filesBtn = screen.getByRole('button', {name: "Select from computer"})
        expect(filesBtn).toBeInTheDocument();

        const filesInput = screen.getByTestId('file-input');
        expect(filesInput).toBeInTheDocument();

        fireEvent.click(filesBtn);
        // TODO: complete the test
    });
});
