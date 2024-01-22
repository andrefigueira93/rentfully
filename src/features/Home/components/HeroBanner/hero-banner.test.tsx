import { render, screen } from "@testing-library/react";
import HeroBanner from "./index";

describe("HeroBanner Component", () => {
  const mockProps = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    image: "test-image.jpg",
  };

  test("renders correctly with provided props", () => {
    render(<HeroBanner {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    const subtitleElement = screen.getByText(mockProps.subtitle);
    const imageElement = screen.getByRole("banner");

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(imageElement).toHaveStyle({
      backgroundImage: `url(${mockProps.image})`,
    });
  });

  // Add more tests as needed
});
