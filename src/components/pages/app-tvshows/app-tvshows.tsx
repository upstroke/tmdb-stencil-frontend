import { Component, h} from '@stencil/core';
import { AppState } from '../../../store';
import { FetchService } from '../../../fetchService';

@Component({
  tag: 'app-tvshows',
  styleUrl: 'app-tvshows.scss',
  shadow: false,
})

export class AppTVshows {
  showMore(amount) {
    FetchService.showMore('tvShows', amount)
  }

  componentWillLoad(){
    FetchService.getAll('tv')
  }


  render() {
    if(AppState.tvShows){
      return (
        <main class="ui container">
          <h2 class="ui dividing header">Top Rated TV Shows</h2>
          <div class="spacer">
            <p>Discover movies by different types of data like average rating, number of votes, genres and
              certifications.</p>
          </div>
          <div class="ui four doubling cards">
            {AppState.tvShows.results.slice(0,AppState.tvShowsAmountToShow).map((item, index) =>
              <default-card class="card" key={index} item={item} />
            )}
          </div>
          {AppState.tvShows.results.length > AppState.tvShowsAmountToShow
            ? <button class="fluid ui button" onClick={()=>this.showMore(4)}>Weitere Filme</button>
            : null
          }
        </main>
      )
    }

    return (
      <main class="ui container">
        <h2 class="ui dividing header">Discover Top Rated Productions</h2>
        <div class="spacer">
          <p>Discover TV shows by different types of data like average rating, number of votes, genres and
            certifications.</p>
        </div>
        <div class="ui four doubling cards">
          {[1, 2, 3, 4].map(index => {
            return (
              <div class="card" key={index.toString()}>
                <div class="content">
                  <div class="ui active inverted dimmer">
                    <div class="ui text loader">Loading</div>
                  </div>
                  <img class="ui wireframe image" src="assets/not-available.png" alt="" />
                </div>
              </div>
            )
          })
          }
        </div>
      </main>
    )
  }
}
