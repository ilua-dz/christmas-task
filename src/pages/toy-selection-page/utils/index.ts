import { toyDescriptionType } from '../../../libs/data';

type sortToySetFunc<T> = (
  toySet: T[],
  sortingFeature: string,
  direction: string
) => T[];

export const sortToySet: sortToySetFunc<toyDescriptionType> = (
  toySet,
  sortingFeature,
  direction
) => {
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
