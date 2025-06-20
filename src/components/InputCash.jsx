function InputCash({ cash, setCash, cashInput, setCashInput, addCash }) {



    return (
        <div className="flex flex-col justify-items-center py-6 gap-2 p-4">
            <input
                value={cashInput}
                onChange={(e) => setCashInput(e.target.value)}
                type="number"
                placeholder="Введіть кількість грошей"
                className="border border-gray-300 rounded px-3 py-2 w-64 mb-4" 
            />
            <button onClick={addCash} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Додати
            </button>
            <p className="text-lg mt-4">Кількість грошей: {cash} грн</p>
        </div>
    );
}

export default InputCash;