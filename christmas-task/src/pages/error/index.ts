import Page from '../../core/templates/page';

class ErrorPage extends Page {
  constructor(id: string) {
    super(id);
  }
  render() {
    const title = this.createTitle(Page.titlesObject.errorPage);
    title.className = 'error-message button border-rounded';
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
