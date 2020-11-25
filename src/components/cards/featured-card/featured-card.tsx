import { Component, h, Prop, Host, Method } from '@stencil/core';
import { RouterHistory, injectHistory } from '@stencil/router';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';
import { Utils } from '../../../utils';


@Component({
  tag: 'featured-card',
  styleUrl: 'featured-card.scss',
  shadow: false,
})
export class FeaturedCard {

  @Prop() history: RouterHistory
  @Prop() elementId: any
  @Prop() mediaType: any

  @Method()
    async goTo(e, route, data) {
      e.preventDefault();
      this.history.push(route, {data})
    }

  connectedCallback(){
    FetchService.getDetails(this.mediaType, this.elementId);
  }

  componentWillLoad(){
    // console.log('AppState.featuredData: ', AppState.detailsData)
  }

  render() {
    if(AppState.detailsData){
      return (
        <Host>
          <div class="image" title="Weitere Informationen" onClick={(e)=>{this.goTo(e,`/details:${this.elementId}`,{id: this.elementId, media_type: this.mediaType})}}>
            <img src={`http://image.tmdb.org/t/p/w780/${AppState.detailsData.backdrop_path}`} alt="" />
            <div class={`ui top right attached label${this.mediaType==='movie' ? ' blue' : ' teal'}`}>{this.mediaType}</div>
          </div>
          <div class="content">
            <h4 class="ui sub header">
              GENRE:&nbsp;
              {AppState.detailsData['genres'].map((genre, index) =>
                <span key={index}>{genre.name}{index+1 < AppState.detailsData.genres.length? ' / ' : ''}</span>
              )}
            </h4>
            <div class="ui feed">
              <div class="event">
                <div class="content">
                  <h2>{AppState.detailsData.original_title ? AppState.detailsData.original_title : AppState.detailsData.original_name}</h2>
                  <span class="releaseDate">
                <strong>Erschienen: </strong>{AppState.detailsData.release_date ? Utils.dateToLocale(AppState.detailsData.release_date) : Utils.dateToLocale(AppState.detailsData.first_air_date)}
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
                <h3 class="ui dividing header">Webseite:</h3>
                <p><a class="link" href={AppState.detailsData.homepage} target="_blank" rel="noopener noreferrer">{AppState.detailsData.homepage.replace('https://','')}</a></p>
              </div>
            </div>

          </div>

          <button class="ui bottom attached button" onClick={(e)=>{this.goTo(e,`/details:${this.elementId}`,{id: this.elementId, media_type: this.mediaType})}}>
            <i class="add icon"></i>
            Weitere Informationen
          </button>
        </Host>
      )
    }

    return (
      <div class="ui teaser card">
        <div class="content">
          <div class="ui active text loader">Loading</div>
        </div>
      </div>
    )
  }
}

injectHistory(FeaturedCard);
