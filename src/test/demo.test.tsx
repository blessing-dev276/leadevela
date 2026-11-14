import { render, screen, fireEvent, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EnquiryDemo } from "@/components/demo/EnquiryDemo";
import { MissedCallDemo } from "@/components/demo/MissedCallDemo";

describe("Live demo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("plays the inquiry sequence through to the end", () => {
    render(<EnquiryDemo />);

    fireEvent.change(screen.getByPlaceholderText("e.g. Aurelia Journeys"), { target: { value: "Glow Studio" } });
    fireEvent.click(screen.getByRole("button", { name: /send this inquiry/i }));

    // The customer's message lands first.
    act(() => void vi.advanceTimersByTime(200));
    expect(screen.getByText(/are you free this week/i)).toBeInTheDocument();

    // Then the automated reply, in the business's name.
    act(() => void vi.advanceTimersByTime(2000));
    expect(screen.getByText(/thanks for getting in touch with Glow Studio/i)).toBeInTheDocument();

    // And the booking link.
    act(() => void vi.advanceTimersByTime(3000));
    expect(screen.getByText(/pick a time that suits you/i)).toBeInTheDocument();
  });

  it("retypes the missed-call reply when the industry changes", () => {
    render(<MissedCallDemo />);

    act(() => void vi.advanceTimersByTime(800));
    expect(screen.getByText(/asking about a trip/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Home services" }));
    act(() => void vi.advanceTimersByTime(800));
    expect(screen.getByText(/after a quote/i)).toBeInTheDocument();
  });
});
