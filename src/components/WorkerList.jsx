import useWorkers from '../hooks/useWorkers';
import InputWorkers from './InputWorkers';
import InputCash from './InputCash';
import TableSalary from './TableSalary';
import WorkerCards from './WorkerCards';
function WorkerList() {
    const {
        workers,
        workerInput,
        setWorkerInput,
        cashInput,
        setCashInput,
        addWorkers,
        addWorkerHours,
        cash,
        setCash,
        addCash,
        rate,
        addWorkerRate,
        rateInput,
        setRateInput,
    } = useWorkers();

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-yellow-100">
            <InputCash cash={cash} setCash={setCash} cashInput={cashInput} setCashInput={setCashInput} addCash={addCash} />

            <InputWorkers
                workerInput={workerInput}
                setWorkerInput={setWorkerInput}
                addWorkers={addWorkers}

            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {workers.map((worker) => (

                    <WorkerCards
                        key={worker.id}
                        worker={worker}
                        addStartHours={(id, val) => addWorkerHours(id, val, 'start')}
                        addEndHours={(id, val) => addWorkerHours(id, val, 'end')}
                        addWorkerRate={(id, val) => addWorkerRate(id, val)}
                    />

                ))}
            </div>
            <TableSalary workers={workers} cash={cash} />
            <footer className="flex items-center justify-center w-full h-16 bg-gray-800 text-white mt-6">
                <p>© {new Date().getFullYear()} Worker Hours Tracker</p>
            </footer>
        </div>
    );
}

export default WorkerList;
