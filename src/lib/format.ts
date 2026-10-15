const euroFmt = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const euroWhole = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numFmt = new Intl.NumberFormat("nl-NL", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

const num2 = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function euro(value: number, whole = false): string {
  if (!Number.isFinite(value)) return "—";
  return (whole ? euroWhole : euroFmt).format(value);
}

export function num(value: number, digits: 0 | 1 | 2 = 1): string {
  if (!Number.isFinite(value)) return "—";
  if (digits === 0) return new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 }).format(value);
  if (digits === 2) {
    return new Intl.NumberFormat("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return numFmt.format(value);
}

export function pct(value: number): string {
  return `${num2.format(value)}%`;
}
