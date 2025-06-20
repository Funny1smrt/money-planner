function InputWorkers({ workerInput, setWorkerInput, addWorkers }) {
    return (
        <div
            className="flex flex-col items-center justify-center w-full gap-2 bg-white shadow-md rounded-lg  p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Керування працівниками</h1>
            <div className="flex flex-row justify-center items-center mb-4 gap-5">
                <input
                    type="number"
                    value={workerInput}
                    onChange={(e) => setWorkerInput(e.target.value)}
                    min="1"
                    max="10"
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                    placeholder="Кількість"
                />
                <button
                    onClick={addWorkers}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Задати кількість працівників
                </button>
            </div>
        </div>
    );
}

export default InputWorkers;
  