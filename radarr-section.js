// sections/radarr-section.js
import { BaseSection } from './base-section.js';

export class RadarrSection extends BaseSection {
  constructor() {
    super('radarr', 'Emby Neueste Serien');
  }

  updateInfo(cardInstance, item) {
    // First handle backgrounds using base class logic
    super.updateInfo(cardInstance, item);
    
    if (!item) return;

    // Check for empty state and clear the info if the item has a default title
    if (item.title_default) {
      cardInstance.info.innerHTML = '';
      return;
    }

    // Daten aus der Entität aufbereiten
    const releaseYear = item.release || 'Unbekannt';
    const runtime = item.runtime ? `${Math.round(item.runtime)} min` : '';
    const genres = item.genres || '';
    const rating = item.rating || '';
    const studio = item.studio || '';
    const summary = item.summary || 'Keine Beschreibung verfügbar.';

    // HTML-Inhalt für die Infobox
    cardInstance.info.innerHTML = `
      <div class="title">${item.title}${releaseYear ? ` (${releaseYear})` : ''}</div>
      <div class="details">${genres}${genres && studio ? ` | ${studio}` : studio}</div>
      <div class="metadata">
        ${runtime ? `⏱️ ${runtime}` : ''} 
        ${rating ? ` | ⭐ ${rating}` : ''} 
      </div>
      <div class="summary">${summary}</div>
    `;
  }


    generateMediaItem(item, index, selectedType, selectedIndex) {
    // Handle empty state
    if (item.title_default) {
      return `
        <div class="empty-section-content">
          <div class="empty-message">No recently added media</div>
        </div>
      `;
    }

    // Use original media item layout
    return `
      <div class="media-item ${selectedType === this.key && index === selectedIndex ? 'selected' : ''}"
           data-type="${this.key}"
           data-index="${index}">
        <img src="${item.poster}" alt="${item.title}">
        <div class="media-item-title">${item.title}</div>
      </div>
    `;
  }
}
 
