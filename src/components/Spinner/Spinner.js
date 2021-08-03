import { useState } from 'react';
import { css } from '@emotion/react';
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
  display: block;
  border-color: red;
  width: 15px;
  height: 150px;
  color: black;
  margin: 2px auto;
`;

function Spinner() {
  let [loading] = useState(true);
  let [color] = useState('#000');

  return (
    <div className="sweet-loading">
      <FadeLoader color={color} loading={loading} css={override} />
    </div>
  );
}

export default Spinner;
