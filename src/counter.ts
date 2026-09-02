export function setupCounter(
  element: HTMLButtonElement,
  callback: () => void
) {
  element.addEventListener("click", () => {
    callback();
  });
}

