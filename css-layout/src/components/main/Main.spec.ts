import { render } from "@testing-library/vue";
import Main from "@/components/main/Main.vue";
import axios from "axios";
import { flushPromises } from "@vue/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Main", () => {
  it("should render as many images as retrieved", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          url: "https://example.org",
        },
        {
          url: "https://example.org",
        },
      ],
    });

    const { getAllByRole } = render(Main);

    await flushPromises();

    expect(getAllByRole("img")).toHaveLength(2);
  });
});
