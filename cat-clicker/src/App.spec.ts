import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "@/App.vue";
import { flushPromises } from "@vue/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App", () => {
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

  it("renders progress when waiting for the API", () => {
    const { getAllByRole } = render(App);

    expect(getAllByRole("progressbar")).toHaveLength(1);
  });

  it("should render an image", async () => {
    const { getAllByRole } = render(App);

    await flushPromises();

    expect(getAllByRole("img")).toHaveLength(1);
  });

  it("should render the initial counter state", async () => {
    const { getByText } = render(App);

    await flushPromises();

    expect(getByText("Clicks: 0")).toBeInTheDocument();
  });

  it("should increase the counter when clicking the image", async () => {
    const { getByRole, getByText } = render(App);

    await flushPromises();
    await fireEvent.click(getByRole("button"));

    expect(getByText("Clicks: 1")).toBeInTheDocument();
  });
});
