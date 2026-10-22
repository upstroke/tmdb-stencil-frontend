# app-root



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [app-link](.)
- [typeahead-search](typeahead-search)
- [app-outlet](.)
- [main-footer](main-footer)

### Graph
```mermaid
graph TD;
  app-root --> app-link
  app-root --> typeahead-search
  app-root --> app-outlet
  app-root --> main-footer
  app-outlet --> app-main
  app-outlet --> app-movies
  app-outlet --> app-tvshows
  app-outlet --> app-details
  app-main --> featured-card
  app-main --> default-card
  app-movies --> featured-card
  app-movies --> default-card
  app-tvshows --> featured-card
  app-tvshows --> default-card
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
