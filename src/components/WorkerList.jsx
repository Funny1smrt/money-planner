function WorkerList({ workers, setWorkers }) {
    const [input, setInput] = useState('');

    const handleAddWorkers = () => {
        const workerCount = parseInt(input);
        if (isNaN(workerCount) || workerCount < 1) {
            alert("Будь ласка, введіть коректну кількість працівників");
            return;
        }

        const newWorkers = Array.from({ length: workerCount }, (_, i) => ({
            id: i + 1,
            name: `Працівник ${i + 1}`,
            hours: 0,
        }));
        setWorkers(newWorkers);
    };

    const updateWorker = (id, updatedData) => {
        setWorkers(prev => prev.map(w => (w.id === id ? updatedData : w)));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Керування працівниками</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    min="1"
                    max="10"
                    className="border border-gray-300 rounded px-3 py-2 w-24"
                    placeholder="Кількість"
                />
                <button
                    onClick={handleAddWorkers}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                >
                    Задати кількість працівників
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {workers.map(worker => (
                    <InputWorkers
                        key={worker.id}
                        idWorker={worker.id}
                        worker={worker}
                        setWorker={(updatedWorker) => updateWorker(worker.id, updatedWorker)}
                    />
                ))}
            </div>
        </div>
    );
}
  