import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
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
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { params } = useRouteMatch<{ key: string }>();

  useEffect(() => {
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
    callApi();
  }, []);

  const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(password);
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

  return loading ? (
    <Spinner children={<BarLoader color="#fff" />} />
  ) : (
    <Page
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex
    >
      {isProtected && !validated ? (
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
      ) : (
        <img src={source} alt="img" width={800} />
      )}
    </Page>
  );
};
