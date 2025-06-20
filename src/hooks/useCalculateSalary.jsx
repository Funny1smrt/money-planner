// hooks/useCalculateSalary.jsx
import { useState, useEffect } from 'react';

const useCalculateSalary = (workers, cash) => {
    const [Salary, setSalary] = useState([]);

         // ставка грн/год
    const BONUS_PERCENT = 0.05; // 5% від каси

    useEffect(() => {
        if (!workers || workers.length === 0 || cash <= 0) {
            setSalary([]);
            return;
        }

        const totalHours = workers.reduce((sum, worker) => sum + worker.totalHours, 0);
        if (totalHours === 0) {
            setSalary([]);
            return;
        }

        const bonusFund = cash * BONUS_PERCENT;

        const calculated = workers.map(worker => {
            const baseSalary = worker.totalHours * (worker.rate || 0);
            const bonus = bonusFund/workers.length;
            const total = baseSalary + bonus;

            return {
                ...worker,
                salary: parseFloat(total.toFixed(2)),
                baseSalary: parseFloat(baseSalary.toFixed(2)),
                bonus: parseFloat(bonus.toFixed(2)),
                total: parseFloat(total.toFixed(2)),
            };
        });

        setSalary(calculated);
    }, [workers, cash]);

    return Salary;
};

export default useCalculateSalary;
