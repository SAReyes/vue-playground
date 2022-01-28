import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import axios from "axios";
import { flushPromises } from "@vue/test-utils";
import CatClickCounter from "@/components/cat-click-counter/CatClickCounter.vue";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CatClickCounter component", () => {
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

  it("should render a click message when the breed id is empty", async () => {
    const { getByText } = render(CatClickCounter, {
      props: {
        breedId: "",
      },
    });

    expect(getByText("Click a cat!")).toBeInTheDocument();
  });

  it("should render a progressbar when updating the breed id", async () => {
    const { getAllByRole, rerender } = render(CatClickCounter, {
      props: {
        breedId: "",
      },
    });

    await rerender({ breedId: "foo" });

    expect(getAllByRole("progressbar")).toHaveLength(1);
  });

  it("should render a image when updating the breed id and awaiting the promise", async () => {
    const { getAllByRole, rerender } = render(CatClickCounter, {
      props: {
        breedId: "",
      },
    });

    await flushPromises();

    await rerender({ breedId: "foo" });

    await flushPromises();

    expect(getAllByRole("img")).toHaveLength(1);
  });

  it("should render the initial counter state", async () => {
    const { getByText, rerender } = render(CatClickCounter, {
      props: {
        breedId: "",
      },
    });

    await rerender({ breedId: "foo" });

    await flushPromises();

    expect(getByText("Clicks: 0")).toBeInTheDocument();
  });

  it("should increase the counter when clicking the image", async () => {
    const { getByRole, getByText, rerender } = render(CatClickCounter, {
      props: {
        breedId: "",
      },
    });

    await rerender({ breedId: "foo" });

    await flushPromises();
    await fireEvent.click(getByRole("button"));

    expect(getByText("Clicks: 1")).toBeInTheDocument();
  });
});
