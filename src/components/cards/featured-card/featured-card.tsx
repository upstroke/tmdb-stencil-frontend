import { Component, h, Host, Method, Prop } from '@stencil/core';
import { navigate } from '../../../lib/router/router';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';
import { Utils } from '../../../utils';

@Component({
  tag: 'featured-card',
  styleUrl: 'featured-card.scss',
  shadow: false,
})
export class FeaturedCard {
  @Prop() elementId: string;
  @Prop() mediaType: string;

  @Method()
  async goTo(event: MouseEvent, route: string) {
    event.preventDefault();
    navigate(route);
  }

  connectedCallback() {
    FetchService.getDetails(this.mediaType, this.elementId);
  }

  render() {
    const detailsRoute = `/details/${this.mediaType}/${this.elementId}`;

    if (AppState.detailsData) {
      return (
        <Host>
          <div
            class="image"
            title="Weitere Informationen"
            onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
          >
            <img src={`http://image.tmdb.org/t/p/w780/${AppState.detailsData.backdrop_path}`} alt="" />
            <div class={`ui top right attached label${this.mediaType === 'movie' ? ' blue' : ' teal'}`}>
              {this.mediaType}
            </div>
          </div>
          <div class="content">
            <h4 class="ui sub header">
              GENRE:&nbsp;
              {AppState.detailsData['genres'].map((genre, index) => (
                <span key={index}>
                  {genre.name}
                  {index + 1 < AppState.detailsData.genres.length ? ' / ' : ''}
                </span>
              ))}
            </h4>
            <div class="ui feed">
              <div class="event">
                <div class="content">
                  <h2>
                    {AppState.detailsData.original_title ? AppState.detailsData.original_title : AppState.detailsData.original_name}
                  </h2>
                  <span class="releaseDate">
                    <strong>Erschienen: </strong>
                    {AppState.detailsData.release_date
                      ? Utils.dateToLocale(AppState.detailsData.release_date)
                      : Utils.dateToLocale(AppState.detailsData.first_air_date)}
                  </span>
                </div>
              </div>
              <div class="event">
                <div class="content">
                  <div class="description">
                    {AppState.detailsData.overview ? <p>{AppState.detailsData.overview}</p> : <p>keine Informationen vorhanden</p>}
                  </div>
                </div>
              </div>
            </div>

            <div class="spacer">
              <div class="content">
                <h3 class="ui header">Webseite:</h3>
                <p>
                  <a class="link" href={AppState.detailsData.homepage} target="_blank" rel="noopener noreferrer">
                    {AppState.detailsData.homepage.replace('https://', '')}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <button class="ui bottom attached button" onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}>
            <i class="add icon"></i>
            Weitere Informationen
          </button>
        </Host>
      );
    }

    return (
      <div class="ui segment is-loading">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>
    );
  }
}
