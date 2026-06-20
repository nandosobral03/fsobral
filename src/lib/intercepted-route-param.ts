export function normalizeInterceptedRouteParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value.at(-1) : value;

  return (raw ?? "").replace(/^(?:\(\.\)|\(\.\.\)|\(\.\.\.\))+/, "");
}
