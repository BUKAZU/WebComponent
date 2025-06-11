import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  isBefore,
  parse
} from 'date-fns';
import { FormatIntl } from '../../../_lib/date_helper';
import DayClasses from './DayClasses';
import { HouseType } from '../../../types';
import store from '../../../store';

interface CellProps {
  availabilities: any[];
  month: Date;
  discounts: any[];
  house: HouseType;
  parentElement?: HTMLElement;
}

export class RenderCells {
  private props: CellProps;
  private element: HTMLElement;
  private days: HTMLElement[] = [];

  constructor(props: CellProps) {
    this.props = props;
    this.element = props.parentElement || document.createElement('div');
    this.element.className = 'body';
  }

  private createDayElement(day: Date, dayData: any, prevBooked: any, className: string): HTMLElement {
    const dayElement = document.createElement('div');
    dayElement.className = className;
    dayElement.setAttribute('role', 'button');
    dayElement.tabIndex = 0;

    const dayNumber = document.createElement('span');
    dayNumber.textContent = FormatIntl(day, 'd');
    dayElement.appendChild(dayNumber);

    dayElement.addEventListener('click', () => {
      if (isBefore(parse(dayData.date, 'yyyy-MM-dd', new Date()), new Date())) {
        return;
      }
      store.dispatch('selectDate', { ...dayData });
    });

    return dayElement;
  }

  render(): HTMLElement[] {
    const { month, availabilities, discounts, house } = this.props;
    const bookingState = store.state.bookingState;
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    this.days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dateStr = FormatIntl(day, 'yyyy-MM-dd');
        const yesterdayStr = FormatIntl(subDays(day, 1), 'yyyy-MM-dd');
        const dayData = availabilities.find((x: any) => x.date === dateStr) || { date: dateStr };
        const prevBooked = availabilities.find((x: any) => x.date === yesterdayStr);

        const className = DayClasses({
          day,
          monthStart,
          discounts,
          buDate: dayData,
          prevBooked,
          house,
          dates: bookingState
        });

        const dayElement = this.createDayElement(day, dayData, prevBooked, className);
        this.days.push(dayElement);
        
        day = addDays(day, 1);
      }
    }

    
    return this.days;
  }

  // Method to update the component with new props
  update(props: Partial<CellProps>): HTMLElement[] {
    this.props = { ...this.props, ...props };
    return this.render();
  }
}

export default RenderCells;
