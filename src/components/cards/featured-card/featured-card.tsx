import { Component, h, Host, Method, Prop } from '@stencil/core';
import { navigate } from '../../../lib/router/router';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';
import { Utils } from '../../../utils';

const hasValue = (value?: string | number | null): boolean =>
  value !== undefined && value !== null && value !== 0 && value !== '0' && value !== '';

@Component({
  tag: 'featured-card',
  styleUrl: 'featured-card.scss',
  shadow: false,
})
export class FeaturedCard {
  @Prop() elementId?: string;
  @Prop() mediaType?: string;

  @Method()
  async goTo(event: MouseEvent, route: string) {
    event.preventDefault();
    navigate(route);
  }

  connectedCallback() {
    void FetchService.getDetails(this.mediaType, this.elementId);
  }

  render() {
    const detailsRoute = `/details/${this.mediaType}/${this.elementId}`;

    if (AppState.detailsData) {
      const detailsData = AppState.detailsData;
      const title = hasValue(detailsData.original_title)
        ? detailsData.original_title
        : hasValue(detailsData.original_name)
          ? detailsData.original_name
          : 'keine Information vorhanden';

      return (
        <Host>
          <div
            class="image"
            title="Weitere Informationen"
            onClick={(event: MouseEvent) => this.goTo(event, detailsRoute)}
          >
            <img src={`http://image.tmdb.org/t/p/w780/${detailsData.backdrop_path}`} alt="" />
            <div class={`ui top right attached label${this.mediaType === 'movie' ? ' blue' : ' teal'}`}>
              {this.mediaType}
            </div>
          </div>
          <div class="content">
            <h4 class="ui sub header">
              GENRE:&nbsp;
              {detailsData.genres?.map((genre, index) => (
                <span key={index}>
                  {genre.name}
                  {index + 1 < (detailsData.genres?.length ?? 0) ? ' / ' : ''}
                </span>
              )) ?? 'keine Information vorhanden'}
            </h4>
            <div class="ui feed">
              <div class="event">
                <div class="content">
                  <h2>{title}</h2>
                  <span class="releaseDate">
                    <strong>Erschienen: </strong>
                    {hasValue(detailsData.release_date)
                      ? Utils.dateToLocale(detailsData.release_date)
                      : hasValue(detailsData.first_air_date)
                        ? Utils.dateToLocale(detailsData.first_air_date)
                        : 'keine Information vorhanden'}
                  </span>
                </div>
              </div>
              <div class="event">
                <div class="content">
                  <div class="description">
                    {hasValue(detailsData.overview) ? <p>{detailsData.overview}</p> : <p>keine Informationen vorhanden</p>}
                  </div>
                </div>
              </div>
            </div>

            <div class="spacer">
              <div class="content">
                <h3 class="ui header">Webseite:</h3>
                <p>
                  {hasValue(detailsData.homepage) ? (
                    <a class="link" href={detailsData.homepage} target="_blank" rel="noopener noreferrer">
                      {detailsData.homepage.replace('https://', '')}
                    </a>
                  ) : (
                    'keine Information vorhanden'
                  )}
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
