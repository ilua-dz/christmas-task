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
    case 'date':
      result.sort((a, b) => +a.year - +b.year);
      break;
    default:
      break;
  }

  if (direction === 'reverse') result.reverse();
  return result;
};
