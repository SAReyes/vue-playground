import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Counter from "@/components/counter/Counter.vue";

describe("Counter component", () => {
  it("should render the clicks number", () => {
    const { getByText } = render(Counter, {
      props: {
        counter: 17,
      },
    });

    expect(getByText("Clicks: 17")).toBeInTheDocument();
  });
});
