import { Component, h, Prop, Host } from '@stencil/core';
import { RouterHistory, injectHistory } from '@stencil/router';
import { Utils } from '../../../utils';

@Component({
  tag: 'default-card',
  styleUrl: 'default-card.scss',
  shadow: false,
})

export class DefaultCard {
  @Prop() item: any
  @Prop() history: RouterHistory

  goTo(e, route, data) {
    e.preventDefault();
    this.history.push(route, {data})
  }

  render() {
    return (
      <Host>
        <div class="image">
          <a href="/" title="Weitere Informationen" onClick={(e)=>{this.goTo(e,`/details:${this.item.id}`,{id: this.item.id, media_type: this.item.media_type})}}>
          <img src={this.item.backdrop_path !==null ? `http://image.tmdb.org/t/p/w342/${this.item.backdrop_path}` : 'assets/not-available.png'} alt="" />
            <div class={`ui top right attached label ${this.item.media_type === 'movie' ? 'blue':'teal'}`}>{this.item.media_type}</div>
          </a>
        </div>

        <div class="content">
          <div class="header" title={this.item.title ? this.item.title : this.item.name}>{this.item.title ? this.item.title : this.item.name}</div>
          <div class="meta">
            <span class="date">{this.item.release_date ? Utils.dateToLocale(this.item.release_date) : Utils.dateToLocale(this.item.first_air_date)}</span>
          </div>
        </div>

        <div class="extra content">
          <span>Rating:&nbsp;</span>
          <i class="yellow star icon"></i>
          <small class="ui label">{this.item.vote_average}</small>
        </div>

        <div class="ui bottom attached button" onClick={(e)=>{this.goTo(e,`/details:${this.item.id}`,{id: this.item.id, media_type: this.item.media_type})}}>
            <i class="add icon"></i>
            Weitere Informationen
        </div>

      </Host>
    )
  }
}

injectHistory(DefaultCard);
