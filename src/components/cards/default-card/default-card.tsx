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
    const item = this.item;
    const detailsRoute = `/details/${item.media_type}/${item.id}`;
    const title = item.media_type === 'movie' ? item.title : item.name;
    const releaseDate = item.media_type === 'movie' ? item.release_date : item.first_air_date;

    return (
      <Host>
        <div class="image">
          <a
            href={`#${detailsRoute}`}
            title="Weitere Informationen"
            onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
          >
            <img
              src={item.backdrop_path ? `http://image.tmdb.org/t/p/w342/${item.backdrop_path}` : 'assets/not-available.png'}
              alt=""
            />
            <div class={`ui top right attached label ${item.media_type === 'movie' ? 'blue' : 'teal'}`}>
              {item.media_type}
            </div>
          </a>
        </div>

        <div class="content">
          <div class="header" title={title}>
            {title}
          </div>
          <div class="meta">
            <span class="date">
              {releaseDate ? Utils.dateToLocale(releaseDate) : ''}
            </span>
          </div>
        </div>

        <div class="extra content">
          <span>Rating:&nbsp;</span>
          <i class="yellow star icon"></i>
          <small class="ui label">{item.vote_average}</small>
        </div>

        <div class="ui bottom attached button" onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}>
          <i class="add icon"></i>
          Weitere Informationen
        </div>
      </Host>
    );
  }
}
