import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Button from "@/components/button/Button.vue";

describe("Button", () => {
  it("should render the slot content", () => {
    const { getByRole } = render(Button, {
      slots: {
        default: "foo",
      },
    });

    expect(getByRole("button", { name: "foo" })).toBeInTheDocument();
  });
});
