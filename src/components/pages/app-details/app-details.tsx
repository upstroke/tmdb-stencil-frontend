import { Component, h, Prop, Host } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';
import { Utils } from '../../../utils';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.scss',
  shadow: false,
})

export class AppDetails {

  @Prop() history: RouterHistory
  @Prop() elementID: any
  @Prop() media_type: any

  getDetailsInfo(type) {
    if(type==="movie"){
      return (
        <section>
          <h2 class="ui medium header">Spieldauer:</h2>
          {AppState.detailsData.runtime
          ? <p class="small"><span>{AppState.detailsData.runtime} Minuten</span></p>
          : <p class="small">keine Information vorhanden</p>
          }
        </section>
      )
    }
    if(type==="tv"){
      return (
        <section>
          <h2 class="ui medium header">Staffel-Informationen:</h2>
          <div class="ui grid">
            <div class="four wide column cast">
              <strong class="header">Status</strong><br/>
              <small class="meta">{AppState.detailsData.status}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Staffeln</strong><br/>
              <small class="ui green tiny label meta">{AppState.detailsData.number_of_seasons}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Episoden</strong><br/>
              <small class="ui orange tiny label meta">{AppState.detailsData.number_of_episodes}</small>
            </div>
            <div class="four wide column cast">
              <strong class="header">Spieldauer</strong><br/>
              {AppState.detailsData.episode_run_time
              ? <p><small class="meta">{AppState.detailsData.episode_run_time[0]} Minuten pro Episode</small></p>
              : <p><small>keine Information vorhanden</small></p>
              }
            </div>
          </div>
        </section>
      )
    }
  }

  connectedCallback(){
    this.elementID = this.history.location.state.data.id;
    this.media_type = this.history.location.state.data.media_type;
    FetchService.getDetails(this.media_type, this.elementID);
  }

  render() {
    if(AppState.detailsData){
      return (
        <Host>
          <div class="ui inverted vertical center aligned masthead segment">
            <div class="masthead-image">
              <img src={AppState.detailsData.backdrop_path !==null ? `http://image.tmdb.org/t/p/original/${AppState.detailsData.backdrop_path}` : 'assets/not-available.png'} alt="" />
            </div>
            <div class="ui text container">
              <h1 class="ui inverted header">
                {AppState.detailsData.title  ? AppState.detailsData.title : AppState.detailsData.name}
                {AppState.detailsData.poster_path
                  ? <div class="poster">
                    <img src={`http://image.tmdb.org/t/p/w342/${AppState.detailsData.poster_path}`} alt="" />
                  </div>
                  : null
                }
              </h1>
              <ul class="ui inverted">
                {AppState.detailsData.production_companies ? AppState.detailsData.production_companies.map((company, index) => <li class="item" key={index}>{company.name}</li>) : null}
                {AppState.detailsData.networks ? AppState.detailsData.networks.map((company, index) => <li class="item" key={index}>{company.name}</li>) : null}
              </ul>
            </div>
          </div>

          <main class="ui text container details-view">

            <div class="ui top left attached">
              <span class={`ui label ${this.media_type === 'tv' ? 'teal':'blue'}`}>{this.media_type}</span>
              <span class="ui label"><i class="yellow star icon"></i>{AppState.detailsData.vote_average}</span>
            </div>

            <div class="ui celled horizontal list genres">
              {AppState.detailsData.genres ? AppState.detailsData.genres.map((genre, index) => <div class="item" key={index}>{genre.name}</div>) : null}
            </div>

            <div class="segment">
              <h2 class="ui medium header">Handlung:</h2>
              {AppState.detailsData.overview
                ? <p class="overview">{AppState.detailsData.overview}</p>
                : <small>keine Information vorhanden</small>
              }

              <h2 class="ui medium header">Homepage:</h2>
              <p>{AppState.detailsData.homepage
                ? <a class="home-link" href={AppState.detailsData.homepage} target="_blank" rel="noopener noreferrer">{AppState.detailsData.homepage.replace('https://','')}</a>
                : <small>keine Information vorhanden</small>
              }
              </p>

              <h2 class="ui medium header">Erschienen:</h2>
              {AppState.detailsData.release_date ? Utils.dateToLocale(AppState.detailsData.release_date) : null}
              {AppState.detailsData.first_air_date ? Utils.dateToLocale(AppState.detailsData.first_air_date ) : null}
              {!AppState.detailsData.release_date || !AppState.detailsData.first_air_date ? null : <p><small>keine Information vorhanden</small></p>}

              <h2 class="ui medium header">Produktion:</h2>
              {AppState.detailsData['production_companies'].length
                ? <ul>{AppState.detailsData['production_companies'].map((company, index) => <li key={index}>{company.name}</li>)}</ul>
                : <p><small>keine Information vorhanden</small></p>
              }

              <div class="hidden spacer"></div>
              {this.getDetailsInfo(this.media_type)}
              <div class="hidden spacer"></div>

              <div class="hidden spacer"></div>
              <div class="event">
                <div class="content">
                  <div class="summary">
                    <h2 class="ui medium dividing header">Cast</h2>

                    <div class={`ui grid${AppState.detailsData.cast.length > 12 ? ' scroller' : ''}`}>
                      {AppState.detailsData.cast.map((element,index) =>
                        <div class="four wide column cast" key={index}>
                          <strong class="header">{element.character}</strong><br />
                          <small class="meta">{element.name},&nbsp;</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="hidden spacer"></div>
              <div class="event">
                <div class="content">
                  <div class="summary">
                    <h2 class="ui medium dividing header">Crew</h2>

                    <div class={`ui grid${AppState.detailsData.cast.length > 12 ? ' scroller' : ''}`}>
                      {AppState.detailsData.crew.map((element,index) =>
                        <div class="four wide column crew" key={index}>
                          <strong class="header">{element.job}</strong><br />
                          <small class="meta">{element.original_name},&nbsp;</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </Host>
      )
    }

    return (
      <main class="ui text container details-view">
        <div class="content">
          <div class="ui active centered inline loader"></div>
        </div>
      </main>
    )
  }
}
