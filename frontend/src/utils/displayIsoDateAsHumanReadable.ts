export function displayIsoDateAsHumanReadable(isoDate: string) {
  const date = new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return date;
}
