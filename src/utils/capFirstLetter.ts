export function capitalizeFirstLetter(string: string) {
  if (!string) throw new Error("String is required");
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}
