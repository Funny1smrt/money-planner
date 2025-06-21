import { useState, useEffect } from 'react';

const useCalculateSalary = (workers, cash) => {
    const [Salary, setSalary] = useState([]);
    const BONUS_PERCENT = 0.05;

    const BONUS_PERCENT = 0.05;

    useEffect(() => {
        if (!workers || workers.length === 0 || cash <= 0) {
            setSalary([]);
            return;
        }

        const bonusFund = cash * BONUS_PERCENT;

        // Знаходимо годину початку та завершення всієї зміни
        const allStart = Math.min(...workers.map(w => w.startHours));
        const allEnd = Math.max(...workers.map(w => w.endHours));
        const totalWorkHours = allEnd - allStart;

        const bonusPerHour = bonusFund / totalWorkHours;

        // Створюємо карту бонусів
        const bonusMap = {};

        for (let h = allStart; h < allEnd; h++) {
            const presentWorkers = workers.filter(w => w.startHours <= h && w.endHours > h);
            const bonusPerWorker = presentWorkers.length > 0 ? bonusPerHour / presentWorkers.length : 0;

            for (const w of presentWorkers) {
                if (!bonusMap[w.id]) bonusMap[w.id] = 0;
                bonusMap[w.id] += bonusPerWorker;
            }
        }

        const calculated = workers.map(worker => {
            const baseSalary = worker.totalHours * (worker.rate || 0);
            const bonus = bonusMap[worker.id] || 0;
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
