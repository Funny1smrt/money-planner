function InputCash({ cash, setCash }) {
    const [input, setInput] = useState("");

    const handleAddCash = () => {
        const cashAmount = parseFloat(input);
        if (isNaN(cashAmount) || cashAmount < 0) {
            alert("Будь ласка, введіть коректну кількість грошей");
            return;
        }
        setCash(prev => prev + cashAmount);
        setInput('');
    };

    return (
        <div className="flex flex-col justify-items-center py-6 gap-2 p-4">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="number"
                placeholder="Введіть кількість грошей"
                className="border border-gray-300 rounded px-3 py-2 w-64 mb-4"
            />
            <button onClick={handleAddCash} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Додати
            </button>
            <p className="text-lg mt-4">Кількість грошей: {cash}</p>
        </div>
    );
}
  