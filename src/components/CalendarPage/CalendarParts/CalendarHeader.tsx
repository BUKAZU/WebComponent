import React from 'react';
import ArrowRight from '../../icons/ArrowRight.svg';
import ArrowLeft from '../../icons/ArrowLeft.svg';
import Reload from '../../icons/Reload.svg';

interface Props {
  onGoPrev: Function;
  onReset: Function;
  onGoNext: Function;
}

function CalendarHeader({ onGoPrev, onReset, onGoNext }: Props): JSX.Element {
  return (
    <div className="calendars-header">
      <div
        className="col bu-prev"
        style={{ textAlign: 'center' }}
        onClick={onGoPrev}
        tabIndex={0}
        role="button"
      >
        <div className="icon">
          {' '}
          <ArrowLeft />
        </div>
      </div>
      <div
        className="col bu-reset"
        onClick={onReset}
        style={{ textAlign: 'center' }}
        tabIndex={0}
        role="button"
      >
        <div className="icon">
          <Reload />
        </div>
      </div>
      <div
        className="col bu-next"
        onClick={onGoNext}
        style={{ textAlign: 'center' }}
        tabIndex={0}
        role="button"
      >
        <div className="icon">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
