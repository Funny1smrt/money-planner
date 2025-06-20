// components/TableSalary.jsx
import useCalculateSalary from "../hooks/useCalculateSalary";

function TableSalary({ workers, cash }) {
    const tableSalary = useCalculateSalary(workers, cash);
    if (!workers || workers.length === 0) {
        return <p className="text-center text-gray-500">Немає працівників для відображення.</p>;
    }

    if (cash <= 0) {
        return <p className="text-center text-gray-500">Будь ласка, додайте гроші для розрахунку зарплати.</p>;
    }

    if (workers.some(worker => worker.totalHours == null || isNaN(worker.totalHours))) {
        return <p className="text-center text-red-500">Деякі працівники мають некоректні години.</p>;
    }

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Зарплата працівників</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Ім'я</th>
                        <th className="border px-4 py-2">Початкові години</th>
                        <th className="border px-4 py-2">Кінцеві години</th>
                        <th className="border px-4 py-2">Загальні години</th>
                        <th className="border px-4 py-2">Ставка</th>
                        <th className="border px-4 py-2">Базова зарплата</th>
                        <th className="border px-4 py-2">Бонус</th>
                        <th className="border px-4 py-2">Загальна зарплата</th>

                    </tr>
                </thead>
                <tbody>
                    {workers.map((worker) => {
                        const matched = tableSalary.find(w => w.id === worker.id);

                        return (
                            <tr key={worker.id}>
                                <td className="border px-4 py-2">{worker.name || '—'}</td>

                                <td className="border px-4 py-2">
                                    {worker.startHours?.trim() ? worker.startHours : 'Не вказано'}
                                </td>

                                <td className="border px-4 py-2">
                                    {worker.endHours?.trim() ? worker.endHours : 'Не вказано'}
                                </td>

                                <td className="border px-4 py-2">
                                    {worker.totalHours && worker.totalHours > 0
                                        ? `${Math.floor(worker.totalHours)} год ${Math.round((worker.totalHours - Math.floor(worker.totalHours)) * 60)} хв`
                                        : 'Не вказано'}
                                </td>
                                <td className="border px-4 py-2">
                                    {worker.rate != null && !isNaN(worker.rate)
                                        ? `${worker.rate} грн/год`
                                        : 'Не вказано'}
                                </td>
                                <td className="border px-4 py-2">
                                    {matched?.baseSalary != null && !isNaN(matched.baseSalary)
                                        ? `${matched.baseSalary.toFixed(2)} грн`
                                        : 'Не вказано'}
                                </td>
                                <td className="border px-4 py-2">
                                    {matched?.bonus != null && !isNaN(matched.bonus)
                                        ? `${matched.bonus.toFixed(2)} грн`
                                        : 'Не вказано'}
                                </td>
                                <td className="border px-4 py-2">
                                    {matched?.total != null && !isNaN(matched.total)
                                        ? `${matched.total.toFixed(2)} грн`
                                        : 'Не вказано'}
                                </td>

                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="7" className="border px-4 py-2 text-right font-bold">Загальна сума:</td>
                        <td className="border px-4 py-2">
                            {tableSalary.reduce((sum, worker) => sum + (worker.total || 0), 0).toFixed(2)} грн
                        </td>
                    </tr>
                </tbody>




            </table>
        </div>
    );
}

export default TableSalary;
