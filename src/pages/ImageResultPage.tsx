import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { Page } from '../styles';
import { getUploadedImage } from '../utils/api';

export const ImageResultPage = () => {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');
  const { params } = useRouteMatch<{ key: string }>();

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const { data } = await getUploadedImage(params.key);
        console.log(data);
        setSource(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <Page
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex
    >
      <img src={source} alt="img" width={800} />
    </Page>
  );
};
