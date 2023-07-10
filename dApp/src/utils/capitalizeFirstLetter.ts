export function capitalizeFirstLetter(str?: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}
