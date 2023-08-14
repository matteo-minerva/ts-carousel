export function rgbToHex(rgb: string): string {
  const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!parts) {
    return "";
  }
  return (
    "#" +
    parts
      .slice(1)
      .map((part) => parseInt(part).toString(16).padStart(2, "0"))
      .join("")
  );
}
