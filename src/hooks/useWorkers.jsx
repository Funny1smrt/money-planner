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
      startHours: 8,
      endHours: 22,
      totalHours: 0,
      salary: 0,
      rate: 60, // Початкова ставка 60 грн/год
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

        // Перевірка на коректність введених годин

        const startHours = parseFloat(updatedWorker.startHours) || 0;
        const endHours = parseFloat(updatedWorker.endHours) || 0;
        if (startHours < 0 || endHours < 0 || startHours >= endHours) {
          alert('Будь ласка, введіть коректні години роботи');
          return worker; // Повертаємо незмінного працівника
        }
      
        // Якщо години коректні, оновлюємо працівника
        updatedWorker.startHours = startHours;
        updatedWorker.endHours = endHours;
        updatedWorker.totalHours = endHours - startHours; // Розрахунок загальних годин

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
