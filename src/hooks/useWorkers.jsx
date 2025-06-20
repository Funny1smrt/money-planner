// src/hooks/useWorkers.js
import { useState } from 'react';

const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [workerInput, setWorkerInput] = useState('');
  const [cashInput, setCashInput] = useState('');
  const [cash, setCash] = useState(0);
  const [rate, setRate] = useState(0); // Ставка грн/год

  const addWorkers = () => {
    const count = parseInt(workerInput, 10);
    if (isNaN(count) || count < 1) {
      alert('Будь ласка, введіть коректну кількість працівників');
      return;
    }

    const newWorkers = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Працівник ${i + 1}`,
      startHours: '',
      endHours: '',
      totalHours: 0,
      salary: 0,
      rate: 45,
    }));

    setWorkers(newWorkers); // Повна заміна
    setWorkerInput('');
  };

  const addWorkerHours = (id, value, type = 'start') => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) => {
        if (worker.id !== id) return worker;

        const updatedWorker = {
          ...worker,
          [type === 'start' ? 'startHours' : 'endHours']: value,
        };

        if (updatedWorker.startHours && updatedWorker.endHours) {
          const [startH, startM] = updatedWorker.startHours.split(':').map(Number);
          const [endH, endM] = updatedWorker.endHours.split(':').map(Number);

          const start = startH * 60 + startM;
          const end = endH * 60 + endM;

          const diffInMinutes = Math.max(0, end - start);
          updatedWorker.totalHours = parseFloat((diffInMinutes / 60).toFixed(2));
        }

        return updatedWorker;
      })
    );
  };
  const addCash = () => {
    const cashAmount = parseFloat(cashInput);
    if (isNaN(cashAmount) || cashAmount <= 0) {
      alert("Будь ласка, введіть коректну кількість грошей");
      return;
    }
    setCash(cashAmount);
    setCashInput('');
  };
  const addWorkerRate = (id, rate) => {
    setWorkers(prev =>
      prev.map(worker =>
        worker.id === id ? { ...worker, rate: parseFloat(rate) || 0 } : worker
      )
    );
  };
  
  
  


  return {
    workers,
    workerInput,
    setWorkerInput,
    cashInput,
    setCashInput,
    addWorkers,
    addWorkerHours,
    cash,
    setCash,
    addCash,
    rate,
    addWorkerRate,
  };
};

export default useWorkers;
