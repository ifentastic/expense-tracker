export default function ErrorModal({ title, message, onClose }) {
   return (
        <div className="fixed px-96 inset-0 top-0 left-0 w-full h-screen z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="w-4/5 top-1/3 left-1.5">
                <header className="bg-blue-800 p-4">
                    <h2 className="m-0 text-white font-bold">{title}</h2>
                </header>
                <div className="p-4 bg-white">
                    <p>{message}</p>
                </div>
                <footer className="p-4 flex justify-end bg-white">
                    <button
                        type="button"
                        className="border-blue-800 rounded bg-blue-800 text-white cursor-pointer px-4 py-1"
                        onClick={onClose}
                    >
                        Okay
                    </button>
                </footer>
            </div>
        </div>
    );
}