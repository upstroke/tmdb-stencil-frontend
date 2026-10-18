class Utilities {
  dateToLocale(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(dateString).toLocaleDateString('de-DE', options);
  }

  dateYearOnly(dateString: string) {
    return new Date(dateString).getFullYear();
  }
}

export const Utils = new Utilities();
