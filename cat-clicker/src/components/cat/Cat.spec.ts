import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Cat from "@/components/cat/Cat.vue";

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

  it("should emit clicks", async () => {
    const { getByRole, emitted } = render(Cat, {
      props: {
        cat: {
          name: "foo",
          src: "https://example.org",
        },
      },
    });

    await fireEvent.click(getByRole("button"));

    expect(emitted().click).toHaveLength(1);
  });
});
