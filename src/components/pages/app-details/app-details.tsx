import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';
import { Utils } from '../../../utils';
import { DetailsData } from '../../../types/tmdb';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.scss',
  shadow: false,
})
export class AppDetails {
  @Prop() elementId?: string;
  @Prop() mediaType?: string;

  @Watch('elementId')
  @Watch('mediaType')
  handleRouteParameterChange() {
    if (this.elementId && this.mediaType) {
      void FetchService.getDetails(this.mediaType, this.elementId);
    }
  }

  getDetailsInfo(type: string, detailsData: DetailsData) {
    if (type === 'movie') {
      return (
        <section>
          <h2 class="ui medium header">Spieldauer:</h2>
          {detailsData.runtime ? (
            <p class="small">
              <span>{detailsData.runtime} Minuten</span>
            </p>
          ) : (
            <p class="small">keine Information vorhanden</p>
          )}
        </section>
      );
    }

    if (type === 'tv') {
      return (
        <section>
          <h2 class="ui medium header">Staffel-Informationen:</h2>
          <div class="ui grid">
            <div class="four wide column cast">
              <strong class="header">Status</strong>
              <br />
              <small class="meta">{detailsData.status}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Staffeln</strong>
              <br />
              <small class="ui green tiny label meta">{detailsData.number_of_seasons}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Episoden</strong>
              <br />
              <small class="ui orange tiny label meta">{detailsData.number_of_episodes}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Spieldauer</strong>
              {detailsData.episode_run_time ? (
                <p>
                  <small class="meta">{detailsData.episode_run_time[0]} Minuten pro Episode</small>
                </p>
              ) : (
                <p>
                  <small>keine Information vorhanden</small>
                </p>
              )}
            </div>
          </div>
        </section>
      );
    }

    return null;
  }

  connectedCallback() {
    void FetchService.getDetails(this.mediaType, this.elementId);
  }

  render() {
    const detailsData = AppState.detailsData;

    if (detailsData === null) {
      return (
        <Host>
          <main class="ui text container details-view">
            <h1>Eintrag nicht gefunden</h1>
            <p>Die angeforderte Film- oder Serien-ID existiert nicht.</p>
            <a class="ui button" href="/#/">Zur Startseite</a>
          </main>
        </Host>
      );
    }

    if (detailsData) {
      return (
        <Host>
          <div class="ui inverted vertical center aligned masthead segment">
            <div class="masthead-image">
              <img
                src={detailsData.backdrop_path !== null ? `http://image.tmdb.org/t/p/original/${detailsData.backdrop_path}` : 'assets/not-available.png'}
                alt=""
              />
            </div>
            <div class="ui text container">
              <h1 class="ui inverted header">
                {detailsData.title ? detailsData.title : detailsData.name}
                {detailsData.poster_path ? (
                  <div class="poster">
                    <img src={`http://image.tmdb.org/t/p/w342/${detailsData.poster_path}`} alt="" />
                  </div>
                ) : null}
              </h1>
              <ul class="ui inverted">
                {detailsData.production_companies
                  ? detailsData.production_companies.map((company, index) => (
                      <li class="item" key={index}>
                        {company.name}
                      </li>
                    ))
                  : null}
                {detailsData.networks
                  ? detailsData.networks.map((company, index) => (
                      <li class="item" key={index}>
                        {company.name}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          <main class="ui text container details-view">
            <div class="ui top left attached">
              <span class={`ui label ${this.mediaType === 'tv' ? 'teal' : 'blue'}`}>{this.mediaType}</span>
              <span class="ui label">
                <i class="yellow star icon"></i>
                {detailsData.vote_average}
              </span>
            </div>

            <div class="ui celled horizontal list genres">
              {detailsData.genres
                ? detailsData.genres.map((genre, index) => (
                    <div class="item" key={index}>
                      {genre.name}
                    </div>
                  ))
                : null}
            </div>

            <div class="segment">
              <h2 class="ui medium header">Handlung:</h2>
              {detailsData.overview ? <p class="overview">{detailsData.overview}</p> : <small>keine Information vorhanden</small>}

              <h2 class="ui medium header">Homepage:</h2>
              <p>
                {detailsData.homepage ? (
                  <a class="home-link" href={detailsData.homepage} target="_blank" rel="noopener noreferrer">
                    {detailsData.homepage.replace('https://', '')}
                  </a>
                ) : (
                  <small>keine Information vorhanden</small>
                )}
              </p>

              <h2 class="ui medium header">Erschienen:</h2>
              {detailsData.release_date ? Utils.dateToLocale(detailsData.release_date) : null}
              {detailsData.first_air_date ? Utils.dateToLocale(detailsData.first_air_date) : null}

              <h2 class="ui medium header">Produktion:</h2>
              {detailsData.production_companies?.length ? (
                <ul>
                  {detailsData.production_companies.map((company, index) => (
                    <li key={index}>{company.name}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  <small>keine Information vorhanden</small>
                </p>
              )}

              <div class="hidden spacer"></div>
              {this.getDetailsInfo(this.mediaType, detailsData)}
              <div class="hidden spacer"></div>

              <div class="event">
                <div class="content">
                  <div class="summary">
                    <h2 class="ui medium dividing header">Cast</h2>

                    <div class={`ui grid${detailsData.cast && detailsData.cast.length > 12 ? ' scroller' : ''}`}>
                      {detailsData.cast?.map((element, index) => (
                        <div class="four wide column cast" key={index}>
                          <strong class="header">{element.character}</strong>
                          <br />
                          <small class="meta">{element.name},&nbsp;</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div class="hidden spacer"></div>
              <div class="event">
                <div class="content">
                  <div class="summary">
                    <h2 class="ui medium dividing header">Crew</h2>

                    <div class={`ui grid${detailsData.cast && detailsData.cast.length > 12 ? ' scroller' : ''}`}>
                      {detailsData.crew?.map((element, index) => (
                        <div class="four wide column crew" key={index}>
                          <strong class="header">{element.job}</strong>
                          <br />
                          <small class="meta">{element.original_name},&nbsp;</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Host>
      );
    }

    return (
      <main class="ui text container details-view">
        <div class="content">
          <div class="ui active centered inline loader"></div>
        </div>
      </main>
    );
  }
}
