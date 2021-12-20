import Component from '../../../core/templates/component';
import data from '../../../libs/data';
import { IToyDescription } from '../../../libs/data';

const toyProperties = [
  //   { name: 'name', title: '' },
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
    toyProperties.forEach((property: { name: string; title: string }) => {
      if (property.name === 'favorite') {
        if (this.toyDescriptionObject[property.name]) {
          this.container.setAttribute('data-favorite', '1');
        }
      } else {
        this.container.setAttribute(
          `data-${property.name}`,
          `${this.toyDescriptionObject[property.name]}`
        );
      }

      const propertyHTML = document.createElement('p');

      let propertyValue = this.toyDescriptionObject[property.name];
      if (typeof propertyValue === 'boolean') {
        propertyValue = propertyValue ? 'Да' : 'Нет';
      }

      propertyHTML.textContent = `${property.title}: ${propertyValue}`;
      toyDescriptionHTML.append(propertyHTML);
    });

    const toyImage = document.createElement('img');
    toyImage.className = 'toy-image';
    toyImage.src = `./assets/toys/${toyNumber}.webp`;
    toyImage.alt = cardTitle.textContent;

    this.container.append(cardTitle, toyDescriptionHTML, toyImage);
  }
}

export default ToyCard;
