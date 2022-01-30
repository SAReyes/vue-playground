import { render } from "@testing-library/vue";
import Cat from "@/components/cat/Cat.vue";
import "@testing-library/jest-dom";

describe("Cat", () => {
  it("should render an image", () => {
    const { getByRole } = render(Cat, {
      props: {
        cat: {
          image: "https://example.org",
          description: "foo",
        },
      },
    });

    expect(getByRole("img")).toHaveAttribute("src", "https://example.org");
  });

  it("should render the description", () => {
    const { getByText } = render(Cat, {
      props: {
        cat: {
          image: "https://example.org",
          description: "foo",
        },
      },
    });

    expect(getByText("foo")).toBeInTheDocument();
  });

  it("should render a button", () => {
    const { getByRole } = render(Cat, {
      props: {
        cat: {
          image: "https://example.org",
          description: "foo",
        },
      },
    });

    expect(getByRole("button", { name: "go" })).toBeInTheDocument();
  });
});
