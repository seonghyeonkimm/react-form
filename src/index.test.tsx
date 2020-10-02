import { render, screen } from "@testing-library/react";
import React from "react";

import Main from "./index";

describe("Main", () => {
  test("return props properly", () => {
    const name = "demian";
    render(<Main name={name} />);

    expect(screen.queryByText(new RegExp(name))).toBeInTheDocument();
  });
});
