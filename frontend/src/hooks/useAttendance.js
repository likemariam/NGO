import { useState } from 'react';
import { attendanceService } from '../services/attendanceService';

export function useAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkIn = async (data) => {
    setLoading(true);
    try {
      const res = await attendanceService.checkIn(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Check-in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async (data) => {
    setLoading(true);
    try {
      const res = await attendanceService.checkOut(data);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Check-out failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { checkIn, checkOut, loading, error };
}
