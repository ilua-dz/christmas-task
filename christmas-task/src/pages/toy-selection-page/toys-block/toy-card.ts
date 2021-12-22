import Component from '../../../core/templates/component';
import data from '../../../libs/data';
import { IToyDescription } from '../../../libs/data';

const toyProperties = [
  { name: 'name', title: '' },
  { name: 'count', title: 'Количество' },
  { name: 'year', title: 'Год покупки' },
  { name: 'shape', title: 'Форма' },
  { name: 'color', title: 'Цвет' },
  { name: 'size', title: 'Размер' },
  { name: 'favorite', title: 'Любимая' },
];

class ToyCard extends Component {
  toyDescriptionObject: IToyDescription;

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderCard(toyNumber: number) {
    const realNumber = data.findIndex(
      (toy) => toy['num'] === String(toyNumber)
    );
    this.toyDescriptionObject = data[realNumber];

    const cardTitle = document.createElement('h3');
    cardTitle.className = 'toy-card-title';
    cardTitle.textContent = this.toyDescriptionObject.name;

    const toyDescriptionHTML = document.createElement('div');
    toyDescriptionHTML.className = 'toy-description';
    toyProperties.forEach(
      (property: { name: string; title: string }, propNumber) => {
        if (property.name === 'favorite') {
          if (this.toyDescriptionObject[property.name]) {
            this.container.setAttribute('data-favorite', '1');
          }
        } else {
          this.container.setAttribute(
            `data-${property.name}`,
            `${this.toyDescriptionObject[property.name]}`.toLocaleLowerCase()
          );
        }

        const propertyHTML = document.createElement('p');

        let propertyValue = this.toyDescriptionObject[property.name];
        if (typeof propertyValue === 'boolean') {
          propertyValue = propertyValue ? 'Да' : 'Нет';
        }

        const propertyValueHTML = document.createElement('span');
        propertyValueHTML.className = 'toy-property-value';
        propertyValueHTML.textContent = propertyValue;

        propertyHTML.textContent = `${property.title}: `;
        propertyHTML.append(propertyValueHTML);

        if (propNumber > 0) toyDescriptionHTML.append(propertyHTML);
      }
    );

    const toyImage = document.createElement('img');
    toyImage.className = 'toy-image';
    toyImage.src = `./assets/toys/${toyNumber}.webp`;
    toyImage.alt = cardTitle.textContent;

    this.container.append(cardTitle, toyDescriptionHTML, toyImage);
  }
}

export default ToyCard;
