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

        // Перевірка на коректність введених годин
        // const totalHours = workers.reduce((sum, worker) => {
        //     const startHours = parseFloat(worker.startHours) || 0;
        //     const endHours = parseFloat(worker.endHours) || 0;
        //     if (startHours < 0 || endHours < 0 || startHours >= endHours) {
        //         return sum; // Пропускаємо некоректні години
        //     }
        //     const hours = endHours - startHours;
        //     return sum + hours;
        // }, 0);
        // if (workers.some(worker => worker.totalHours == null || isNaN(worker.totalHours))) {
        //     setSalary([]);
        //     return;
        // }

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
