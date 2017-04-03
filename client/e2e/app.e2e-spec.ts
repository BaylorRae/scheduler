import { SchedulerPage } from './app.po';

describe('scheduler App', function() {
  let page: SchedulerPage;

  beforeEach(() => {
    page = new SchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
