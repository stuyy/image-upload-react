import { Checkbox, Flex, ImageOptionsContainer } from '../styles';

export const ImageOptions = () => {
  return (
    <ImageOptionsContainer>
      <Flex alignItems="center">
        <Checkbox id="nsfw-check" type="checkbox" />
        <label
          htmlFor="nsfw-check"
          style={{ fontWeight: 'bold', marginLeft: '8px' }}
        >
          NSFW
        </label>
      </Flex>
      <Flex alignItems="center" style={{ marginLeft: '20px' }}>
        <Checkbox id="nsfw-check" type="checkbox" />
        <label
          htmlFor="spoiler-check"
          style={{ fontWeight: 'bold', marginLeft: '8px' }}
        >
          Spoiler
        </label>
      </Flex>
      <Flex alignItems="center" style={{ marginLeft: '20px' }}>
        <Checkbox id="nsfw-check" type="checkbox" />
        <label
          htmlFor="protected-check"
          style={{ fontWeight: 'bold', marginLeft: '8px' }}
        >
          Private
        </label>
      </Flex>
    </ImageOptionsContainer>
  );
};
