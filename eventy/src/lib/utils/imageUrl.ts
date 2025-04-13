export const buildImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) {
    return '/placeholder.jpg';
  }

  const isExternalImage =
    imagePath.startsWith('http') || imagePath.startsWith('/');
  if (isExternalImage) {
    return imagePath;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const baseUrl = apiBaseUrl?.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;

  const imagePathWithoutLeadingSlash = imagePath.startsWith('/')
    ? imagePath.substring(1)
    : imagePath;

  return `${baseUrl}${imagePathWithoutLeadingSlash}`;
};
