export function dayToString(original: "day1" | "day2") {
  switch (original) {
    case "day1":
      return "1日目"
    case "day2":
      return "2日目"
  }
}
