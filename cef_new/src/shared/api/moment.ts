import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '#/shared/store'; // Adjust the import according to your Redux store setup

// Utility functions
export const TimeFormat = (time: moment.MomentInput = undefined, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return moment(time).tz('Europe/Kyiv').format(format);
};

export const TimeFormatStartOf = (time: moment.MomentInput = undefined, unitOfTime: moment.unitOfTime.StartOf = 'hour'): string => {
  return moment(time).tz('Europe/Kyiv').startOf(unitOfTime).fromNow();
};

export const TimeFormatEndOf = (
  time: moment.MomentInput = undefined,
  unitOfTime: moment.unitOfTime.StartOf = 'day',
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string => {
  return moment(time).tz('Europe/Kyiv').endOf(unitOfTime).format(format);
};

// Custom hook for readable time
export const useTimeFormatStartOfReadable = (time: moment.MomentInput = undefined, unitOfTime: moment.unitOfTime.StartOf = 'hour'): string => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(moment(time).tz('Europe/Kyiv').startOf(unitOfTime).fromNow());
    }, 1000);

    return () => clearInterval(interval);
  }, [time, unitOfTime]);

  return formattedTime;
};

export const GetTime = (time: moment.MomentInput = undefined): moment.Moment => {
  const serverDateTime = useSelector((state: RootState) => state.server.serverDateTime); // Adjust according to your Redux state structure
  return moment(!time ? serverDateTime : time).tz('Europe/Kyiv');
};

// Custom hook for elapsed time
export const useElapsedTime = (): { elapsed: number | null, elapsedUp: number | null } => {
  const [updateTime, setUpdateTime] = useState<moment.Moment | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [elapsedUp, setElapsedUp] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = GetTime();
      if (updateTime) {
        setElapsed(updateTime.diff(currentTime));
        setElapsedUp(currentTime.diff(updateTime));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [updateTime]);

  return { elapsed, elapsedUp };
};

// Example usage in a component