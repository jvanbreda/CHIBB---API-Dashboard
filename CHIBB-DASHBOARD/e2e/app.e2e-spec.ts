import { CHIBBDASHBOARDPage } from './app.po';

describe('chibb-dashboard App', function() {
  let page: CHIBBDASHBOARDPage;

  beforeEach(() => {
    page = new CHIBBDASHBOARDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
