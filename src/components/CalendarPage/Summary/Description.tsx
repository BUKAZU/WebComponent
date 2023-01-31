import React from 'react';
import Icon from '../../icons/info.svg';
import Modal from '../../Modal';

interface Props {
  description: string | React.ReactNode;
}

function Description({ description }: Props): JSX.Element {
  let val = <span />;
  if (description) {
    val = (
      <span
        style={{
          padding: '0 0 0 8px'
        }}
      >
        <Modal buttonText={<Icon />}>
          <p>{description}</p>
        </Modal>
      </span>
    );
  }
  return val;
}

export default Description;
