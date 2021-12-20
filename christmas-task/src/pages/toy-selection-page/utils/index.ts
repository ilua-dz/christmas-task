import { IToyDescription } from '../../../libs/data';

export const sortToySet = (
  toySet: IToyDescription[],
  sortingFeature: string,
  direction: string
): IToyDescription[] => {
  const result = [...toySet];
  switch (sortingFeature) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'year':
      result.sort((a, b) => +a.year - +b.year);
      break;
    default:
      break;
  }

  if (direction === 'reverse') result.reverse();
  return result;
};

export const filterToySet = (
  toySet: IToyDescription[],
  filter: string
): IToyDescription[] => {
  let result = [...toySet];
  switch (filter) {
    case 'ball':
      result = result.filter((toy) => toy.shape === 'шар');
      break;
    case 'bell':
      result = result.filter((toy) => toy.shape === 'колокольчик');
      break;
  }
  return result;
};
