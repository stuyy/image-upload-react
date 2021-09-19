import { ImageUpload } from '../components/ImageUpload';
import { Page } from '../styles';

export const ImageUploadPage = () => {
  return (
    <Page
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex
    >
      <ImageUpload />
    </Page>
  );
};
