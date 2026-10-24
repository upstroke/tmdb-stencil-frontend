import { Component, h, Host, Prop } from '@stencil/core';
import { navigate } from '../../../lib/router/router';
import { Utils } from '../../../utils';
import { TrendingResult } from '../../../types/tmdb';

@Component({
  tag: 'default-card',
  styleUrl: 'default-card.scss',
  shadow: false,
})
export class DefaultCard {
  @Prop() item!: TrendingResult;

  private goTo(event: MouseEvent, route: string) {
    event.preventDefault();
    navigate(route);
  }

  render() {
    const detailsRoute = `/details/${this.item.media_type}/${this.item.id}`;

    return (
      <Host>
        <div class="image">
          <a
            href={`#${detailsRoute}`}
            title="Weitere Informationen"
            onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
          >
            <img
              src={this.item.backdrop_path ? `http://image.tmdb.org/t/p/w342/${this.item.backdrop_path}` : 'assets/not-available.png'}
              alt=""
            />
            <div class={`ui top right attached label ${this.item.media_type === 'movie' ? 'blue' : 'teal'}`}>
              {this.item.media_type}
            </div>
          </a>
        </div>

        <div class="content">
          <div class="header" title={this.item.title ? this.item.title : this.item.name}>
            {this.item.title ? this.item.title : this.item.name}
          </div>
          <div class="meta">
            <span class="date">
              {this.item.release_date ? Utils.dateToLocale(this.item.release_date) : Utils.dateToLocale(this.item.first_air_date)}
            </span>
          </div>
        </div>

        <div class="extra content">
          <span>Rating:&nbsp;</span>
          <i class="yellow star icon"></i>
          <small class="ui label">{this.item.vote_average}</small>
        </div>

        <div class="ui bottom attached button" onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}>
          <i class="add icon"></i>
          Weitere Informationen
        </div>
      </Host>
    );
  }
}
