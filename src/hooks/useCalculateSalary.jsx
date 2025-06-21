// hooks/useCalculateSalary.jsx
import { useState, useEffect } from 'react';

const useCalculateSalary = (workers, cash) => {
    const [Salary, setSalary] = useState([]);
    const BONUS_PERCENT = 0.05;

    useEffect(() => {
        if (!workers || workers.length === 0 || cash <= 0) {
            setSalary([]);
            return;
        }

        const bonusFund = cash * BONUS_PERCENT;

        // Створюємо масив усіх хвилин, які працювало кафе (в хвилинах)
        let allStart = Infinity;
        let allEnd = -Infinity;

        workers.forEach(worker => {
            if (worker.startHours && worker.endHours) {
                const [startH, startM] = worker.startHours.split(':').map(Number);
                const [endH, endM] = worker.endHours.split(':').map(Number);

                const start = startH * 60 + startM;
                const end = endH * 60 + endM;

                if (start < allStart) allStart = start;
                if (end > allEnd) allEnd = end;
            }
        });

        if (allStart >= allEnd) {
            setSalary([]);
            return;
        }

        const totalMinutes = allEnd - allStart;
        const bonusPerMinute = bonusFund / totalMinutes;

        // Ініціалізуємо карту бонусів для кожного працівника
        const bonusMap = {};
        workers.forEach(worker => bonusMap[worker.id] = 0);

        // По хвилинно: хто був присутній — ділиться бонус за хвилину
        for (let m = allStart; m < allEnd; m++) {
            const presentWorkers = workers.filter(worker => {
                if (!worker.startHours || !worker.endHours) return false;
                const [startH, startM] = worker.startHours.split(':').map(Number);
                const [endH, endM] = worker.endHours.split(':').map(Number);
                const start = startH * 60 + startM;
                const end = endH * 60 + endM;
                return start <= m && m < end;
            });

            if (presentWorkers.length > 0) {
                const bonusPerWorker = bonusPerMinute / presentWorkers.length;
                presentWorkers.forEach(worker => {
                    bonusMap[worker.id] += bonusPerWorker;
                });
            }
        }

        // Підрахунок зарплат
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
