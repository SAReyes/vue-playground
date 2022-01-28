import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import axios from "axios";
import { flushPromises } from "@vue/test-utils";
import CatClickCounter from "@/components/cat-click-counter/CatClickCounter.vue";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CatClickCounter", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          url: "https://example.org",
          breeds: [{ name: " foo" }],
        },
      ],
    });
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  it("should emit a load event", async () => {
    const { emitted } = render(CatClickCounter);

    await flushPromises();

    expect(emitted().load).toHaveLength(1);
  });

  it("should render an image", async () => {
    const { getAllByRole } = render(CatClickCounter);

    await flushPromises();

    expect(getAllByRole("img")).toHaveLength(1);
  });

  it("should render the initial counter state", async () => {
    const { getByText } = render(CatClickCounter);

    await flushPromises();

    expect(getByText("Clicks: 0")).toBeInTheDocument();
  });

  it("should increase the counter when clicking the image", async () => {
    const { getByRole, getByText } = render(CatClickCounter);

    await flushPromises();
    await fireEvent.click(getByRole("button"));

    expect(getByText("Clicks: 1")).toBeInTheDocument();
  });
});
