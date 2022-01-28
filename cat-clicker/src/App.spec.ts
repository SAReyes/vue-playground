import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import App from "@/App.vue";

describe("App", () => {
  it("should render an image", () => {
    const { getAllByRole } = render(App);

    expect(getAllByRole("img")).toHaveLength(1);
  });

  it("should render the initial counter state", () => {
    const { getByText } = render(App);

    expect(getByText("Clicks: 0")).toBeInTheDocument();
  });

  it("should increase the counter when clicking the image", async () => {
    const { getByRole, getByText } = render(App);

    await fireEvent.click(getByRole("button"));

    expect(getByText("Clicks: 1")).toBeInTheDocument();
  });
});
