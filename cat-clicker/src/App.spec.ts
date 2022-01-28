import { render } from "@testing-library/vue";
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
          id: "1",
          name: " foo",
        },
      ],
    });
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  it("should render a progress tag when waiting for the API", () => {
    const { getAllByRole } = render(App);

    expect(getAllByRole("progressbar")).toHaveLength(1);
  });

  it("should a button with the retrieved breed", async () => {
    const { getByRole } = render(App);

    await flushPromises();

    expect(getByRole("button", { name: "foo" })).toBeInTheDocument();
  });
});
