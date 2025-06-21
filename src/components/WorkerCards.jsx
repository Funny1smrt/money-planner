function WorkerCards({ worker, addStartHours, addEndHours, addWorkerRate }) {
    const hours = Math.floor(worker.totalHours);
    const minutes = Math.round((worker.totalHours - hours) * 60);
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <h2>{worker.name}</h2>
            <div className="flex flex-col items-center justify-between mt-2">
                <label className="block">
                    Ставка (грн/год):
                    <input
                        type="number"
                        min="45"
                        step="5"
                        value={worker.rate}
                        onChange={(e) => addWorkerRate(worker.id, e.target.value)}
                        placeholder="Ставка (грн/год)"
                        className="border px-2 py-1 rounded w-full"
                    />
                </label>

                <span className="text-lg font-semibold">Години роботи</span>
                <br />
                <p className="text-lg font-semibold">Початок роботи:</p>
                <input 
                    type="time"
                    value={worker.startHours}
                    onChange={(e) => addStartHours(worker.id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
                <br />
                <p className="text-lg font-semibold">До:</p>
                <input
                    type="time"
                    value={worker.endHours}
                    onChange={(e) => addEndHours(worker.id, e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
                <br />
                <p className="text-gray-600">
                    Загальна кількість годин:
                    {hours} год {minutes} хв
                </p>
                <br />
                <p className="text-gray-600">
                    {worker.startHours || 'Початкові години не вказані'} - {worker.endHours || 'Кінцеві години не вказані'}
                </p>

                
            </div>
        </div>
    );
}
export default WorkerCards;
  