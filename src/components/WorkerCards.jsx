function WorkerCards({ worker, addStartHours, addEndHours, addWorkerRate }) {

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
                
                <button
                    onClick={() => addStartHours(worker.id, worker.startHours + 1)}
                    disabled={worker.startHours >= 23}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"

                >
                    +
                </button>
                <span className="text-black font-bold mb-2">
                    {worker.startHours || 'Не вказано'}
                </span>
                <button
                    onClick={() => addStartHours(worker.id, worker.startHours - 1)}
                    disabled={worker.startHours <= 8}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                >
                    -
                </button>
                <br />
                <p className="text-lg font-semibold">До:</p>
                
                <button
                    onClick={() => addEndHours(worker.id, worker.endHours + 1)}
                    disabled={worker.endHours >= 23}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                >
                    +
                </button>
                <span className="text-black font-bold mb-2">
                    {worker.endHours || 'Не вказано'}
                </span>
                <button
                    onClick={() => addEndHours(worker.id, worker.endHours - 1)}
                    disabled={worker.endHours <= 8}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                >
                    -
                </button>
                
                <br />
                <p className="text-gray-600">
                    {worker.startHours || 'Початкові години не вказані'} - {worker.endHours || 'Кінцеві години не вказані'}
                </p>
                <p className="text-lg font-semibold">Загальні години:</p>
                <span className="text-black font-bold mb-2">
                    {worker.totalHours ? `${Math.floor(worker.totalHours)} год ` : 'Не вказано'}
                </span>

                
            </div>
        </div>
    );
}
export default WorkerCards;
  