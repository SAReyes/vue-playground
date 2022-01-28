import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Cat from "@/components/Cat.vue";

describe("Cat component", () => {
  it("should render an image with its proper alt", () => {
    const { getByAltText } = render(Cat, {
      props: {
        cat: {
          name: "foo",
          src: "https://example.org",
        },
      },
    });

    expect(getByAltText("foo")).toHaveAttribute("src", "https://example.org");
  });
});