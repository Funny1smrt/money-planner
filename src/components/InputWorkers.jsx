import { useState } from "react";

function InputWorkers({ idWorker, worker, setWorker }) {
    const [input, setInput] = useState(0);

    const addHours = () => {
        const inputValue = parseFloat(input);
        if (isNaN(inputValue) || inputValue < 0 || inputValue > 14) {
            alert("Будь ласка, введіть коректну кількість годин (0-14)");
            return;
        }
        const updatedWorker = {
            ...worker,
            hours: inputValue,
        };

        setWorker(updatedWorker);
        setInput(0);
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 gap-2 border p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{worker.name}</h2>

            <div className="flex items-center gap-2">
                <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => setInput((prev) => Math.max(0, prev - 1))}
                >
                    −
                </button>
                <span>{input}</span>
                <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => setInput((prev) => Math.min(14, prev + 1))}
                >
                    +
                </button>
            </div>

            <button
                onClick={addHours}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
                Додати
            </button>

            <p className="text-lg mt-4">Кількість годин: {worker.hours}</p>
        </div>
    );
}

export default InputWorkers;
