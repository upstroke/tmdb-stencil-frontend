class Utilities {
  constructor() {}

  dateToLocale(dateString: string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const newDate = new Date(dateString)
    return newDate.toLocaleDateString('de-DE', options)
  }

  dateYearOnly(dateString: string) {
    const newDate = new Date(dateString)
    return newDate.getFullYear()
  }

}

export const Utils = new Utilities();
