import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { getCurrentPath, navigate, subscribeToPath } from '../lib/router/router';

@Component({
  tag: 'app-link',
  shadow: false,
})
export class AppLink {
  @Prop() href!: string;
  @Prop() exact: boolean = false;

  @State() currentPath: string = getCurrentPath();

  private unsubscribe: (() => void) | undefined;

  connectedCallback() {
    this.unsubscribe = subscribeToPath((path) => {
      this.currentPath = path;
    });
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  @Watch('href')
  handleHrefChange() {
    this.currentPath = getCurrentPath();
  }

  private isActive(): boolean {
    if (this.exact) {
      return this.currentPath === this.href;
    }

    return this.currentPath === this.href || this.currentPath.startsWith(`${this.href}/`);
  }

  private handleClick(event: MouseEvent) {
    event.preventDefault();
    navigate(this.href);
  }

  render() {
    const active = this.isActive();

    return (
      <Host>
        <a
          href={`#${this.href}`}
          class={{ item: true, active }}
          aria-current={active ? 'page' : undefined}
          onClick={(event: MouseEvent) => this.handleClick(event)}
        >
          <slot />
        </a>
      </Host>
    );
  }
}
