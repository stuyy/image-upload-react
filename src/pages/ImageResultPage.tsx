import { useEffect, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import { BarLoader } from 'react-spinners';
import { Spinner } from '../components/Spinner';
import {
  Flex,
  InputContainer,
  InputLabel,
  Page,
  PasswordField,
} from '../styles';
import { getImageReference, getProtectedImage } from '../utils/api';
import { SPACES_URL } from '../utils/constants';

export const ImageResultPage = () => {
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');
  const [isProtected, setIsProtected] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { params } = useRouteMatch<{ key: string }>();

  useEffect(() => {
    const showImageResult = JSON.parse(
      localStorage.getItem('showImageResult') || 'false'
    );
    const imagePassword = localStorage.getItem('imagePassword');
    localStorage.clear();
    if (showImageResult && imagePassword) {
      bypassImageProtection(imagePassword);
    } else callApi();
  }, []);

  const bypassImageProtection = async (password: string) => {
    try {
      setLoading(true);
      const { data } = await getProtectedImage(params.key, password);
      const blob = new Blob([data]);
      console.log(URL.createObjectURL(blob));
      setSource(URL.createObjectURL(blob));
      setBypass(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const callApi = async () => {
    try {
      setLoading(true);
      const { data: imageRef } = await getImageReference(params.key);
      imageRef.isProtected
        ? setIsProtected(true)
        : setSource(`${SPACES_URL}/${imageRef.imageId}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await getProtectedImage(params.key, password);
      const blob = new Blob([data]);
      console.log(URL.createObjectURL(blob));
      setSource(URL.createObjectURL(blob));
      setValidated(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const imageComponent = (
    <Page
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex
    >
      <img src={source} alt="img" width={800} />
    </Page>
  );

  if (loading) return <Spinner children={<BarLoader color="#fff" />} />;
  if (bypass) return imageComponent;
  if (isProtected && !validated) {
    return (
      <Page
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex
      >
        <form onSubmit={submitPassword}>
          <InputContainer>
            <Flex>
              <InputLabel htmlFor="img-password" children="Password" />
            </Flex>
            <PasswordField
              id="img-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
        </form>
      </Page>
    );
  } else return imageComponent;
};
