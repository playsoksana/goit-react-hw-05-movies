import { useState } from 'react';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
  display: block;
  border-color: red;

  color: black;
  margin: 30px auto;
`;

function Spinner() {
  let [loading] = useState(true);
  let [color] = useState('#000');

  return (
    <div className="sweet-loading">
      <FadeLoader
        color={color}
        loading={loading}
        css={override}
        height={65}
        width={10}
        radius={40}
        margin={30}
      />
    </div>
  );
}

export default Spinner;
