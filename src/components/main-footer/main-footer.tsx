import { Component, h } from '@stencil/core';

@Component({
  tag: 'main-footer',
  styleUrl: 'main-footer.scss',
  shadow: false,
})
export class MainFooter {

  render() {
    return (
      <footer class="ui bottom fixed inverted menu">
        <div class="ui inverted segment">
          <div class="ui inverted secondary text menu">
            <a class="item">Conditions of Use</a>
            <a class="item">Privacy Policy</a>
            <a class="item" href="https://www.imdb.com/" target="_blank">Content: © by IMDb.com, Inc.</a>
          </div>
        </div>
      </footer>
    );
  }
}
