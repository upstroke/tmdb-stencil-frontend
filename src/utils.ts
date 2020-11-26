class Utilities {
  constructor() {}

  dateToLocale(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const newDate = new Date(dateString)
    return newDate.toLocaleDateString('de-DE', options)
  }

  dateYearOnly(dateString) {
    const newDate = new Date(dateString)
    return newDate.getFullYear()
  }

}

export const Utils = new Utilities();
