import { urlPattern } from '../constants/constants';

// eslint-disable-next-line import/prefer-default-export
export const isAvatarLink = (url: string) => urlPattern.test(url);
