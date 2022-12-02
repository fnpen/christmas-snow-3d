import { Texture } from 'three/src/textures/Texture';

export const getTexture = async () => {
  const img = new Image();
  const texture = new Texture();

  await new Promise<number>((resolve) => {
    img.onload = function () {
      texture.image = img;
      texture.needsUpdate = true;
      resolve(1);
    };

    img.setAttribute(
      'src',
      `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABJVJREFUWEe9V+1O60gMtSefJVnaB+BHfxTxAOX94AHpE1DpIvECpSTc5suzOrPjaJoGBKu7O5I1bSg5x8ce28P0w/X4+GgeHh6i/X5vNpsNv7y80Hq9trvdTrbb7cDM8pNX8nd+bK01RJQSUUJEsTc80/+3RATg3ltHRO13yHxJwFqLv+dElNV1nRVFAQKwqGmaKMuykMBARDCAwxoYM5+ICARn16cErLUAWnhzJDy4qhBNFAA4FAgJAPw3jJnx/GLNErDWAuzK26Jt20WapniW9n2fxnEc930fxXHMfQ9M5+GAx5Ae1rZtk6apAyeij/1+/3F7ewtVztYFAQ9eEJEaiEABVQG5gDyAAsgDLMRfFQABAMF72AcR1WrMfEbijICXvSQiNZBQJZSEJuMcAZd8E3AlUBFRtdvtqvv7+zEcIwGfcH8RkdqUBPIhzAWoECqg8VfvnfTecwdORO9qzOwScyTw+vq6uLm5uQaBruuukyQBAZAJQ7EQEZBwYTDGGBF37N0RNMao9yP4MAx1FEXvXddVSZIc67p+L4riyMz4zT8E/DkH+JKIHIlgnyqhKmge4BUaf/V+zvOj9x77GxGBhCiBvK7rZRzHyyzLQCA0FxIRKY0xVyJyZYzJRCSFAkESavIBHBZKDlBnTdMcsywDgTfUCCUAEHg/tZBIqISqgERUBdR7ZLzGfAT2XjtgNWZ+Z1/bl6fTaZXn+bLv+xWUUDIisjTGXIuICw0zl8x8Za3NmRlhQAh7eGOt/bDWOs+NMQp+BkpEB0/A7eyP3soDYg8/g4h+n6qB44lkxIL8KvvU6zNAT2B8BgKocKumaVZZlq0CBRwZEVkZY5a6W2uXzHxtrYUaCAUWCg6OmCYYvA6B8fnQ9/2btfaQJIn7DgMBvEQ9/2pXNUKVoAqWAo8vDmQOn1185l+/fuXr9XrVtu0qTVNVQD13OwhChQlRPbKOgLUWWT0CiMibMeYgIgfswzAcoig6dF3nFKjr+lAUhVPAhWDm5eGzMBfCWvGjEMypwk9PT8nd3d2qLEsHMskBF3skKE5CUB9wJF0SWmuJmS+SUESOxphpLuj3Q1VVb2VZOgVQTEIPNevDmqDgqBcKDu/dMfRzgHY+LUDfO4b+HH9ZiFADjDGuEIlIYYyZLUQicjLGuEIkIlVQC8LTcV6IPAG8UD2eLcWB55DeDSeTbvitUhwe1bAUIwyuGbVte52m6bebEbqhMWYQEXTDxqvwaTM6nU7HPM/Pm5FXAf0+7ISz7djPBDoVTeeBi3bs5wEUKeTG2BHP2rFPJCTkxUAyDEMRRRFknx1IvAI6kus0fBqG4XcURR9939dxHFdt21Zpmn4+kHgVMPH+pyMZlAgn5Iuh9Pn5OdtsNuNQ2nXdVZIk/89Q6kOB9no2lnv5NfPDqXh6MRnHcj8Zj2M5uuV0Ih5HMgUOd1TI7Xa7qOt6EUURen+WZZnejOKu66IkSbjr3IBrkyQZLyZN03TW2ibP8393MQmUGK9mk5sRJqG5m9HF1QytWifgOUf/2OW0qiopy/LPXk7nGPveoZeS6e34x9fzvwHJ1s9TzK7F8QAAAABJRU5ErkJggg==`,
    );
  });

  return texture;
};
