import { fireEvent, render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Breeds from "@/components/breeds/Breeds.vue";

describe("Breeds component", () => {
  it("should render one button per breed", () => {
    const { getByRole } = render(Breeds, {
      props: {
        breeds: ["foo", "bar", "baz"],
      },
    });

    expect(getByRole("button", { name: "foo" })).toBeInTheDocument();
    expect(getByRole("button", { name: "bar" })).toBeInTheDocument();
    expect(getByRole("button", { name: "baz" })).toBeInTheDocument();
  });

  it("should emit a click", async () => {
    const { getByRole, emitted } = render(Breeds, {
      props: {
        breeds: ["foo"],
      },
    });

    await fireEvent.click(getByRole("button"));

    expect(emitted().click).toBeTruthy();
    expect(emitted().click).toHaveLength(1);
    expect(emitted().click[0]).toEqual(["foo"]);
  });
});
