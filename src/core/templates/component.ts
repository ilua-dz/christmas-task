abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className + ' border-rounded';
  }

  render() {
    return this.container;
  }
}
export default Component;
