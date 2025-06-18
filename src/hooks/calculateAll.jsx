import { useState, useEffect } from "react";
import WorkerList from "../components/WorkerList";
import InputCash from "../components/InputCash";

function CalculateAll() {
    const bonusPercent = 5;
    const rate = 55;

    const [workers, setWorkers] = useState([]);
    const [cash, setCash] = useState(0);
    const [bonuses, setBonuses] = useState([]);

    useEffect(() => {
        if (workers.length === 0 || cash <= 0) {
            setBonuses([]);
            return;
        }

        const totalHours = workers.reduce((sum, w) => sum + w.hours, 0);
        const bonusFund = cash * bonusPercent / 100;

        const calculated = workers.map(worker => {
            const bonus = totalHours > 0 ? (worker.hours / totalHours) * bonusFund : 0;
            return {
                ...worker,
                bonus: parseFloat(bonus.toFixed(2)),
                total: parseFloat((worker.hours * rate + bonus).toFixed(2)),
            };
        });

        setBonuses(calculated);
    }, [workers, cash, bonusPercent, rate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <InputCash cash={cash} setCash={setCash} />
            <WorkerList workers={workers} setWorkers={setWorkers} />
            {bonuses.length > 0 && (
                <div className="p-6 mt-4 bg-white rounded shadow w-full max-w-3xl">
                    <h2 className="text-xl font-bold mb-4 text-center">Розрахунок зарплати</h2>
                    <ul>
                        {bonuses.map((w) => (
                            <li key={w.id} className="mb-2">
                                <strong>{w.name}</strong>: {w.hours} год × {rate} грн + бонус {w.bonus} грн = <strong>{w.total} грн</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CalculateAll;
