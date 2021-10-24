export class WindowUtils {
  static scrollToElement(selector: string) {
    const element = document.querySelector(selector);
    setTimeout(
      () => {
        element?.scrollIntoView(false);
      }, 10
    )
  }
}
