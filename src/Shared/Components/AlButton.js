export default function SSButton({ text, onClick }) {

    return (
        <button
            onClick={onClick}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-primary px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
            {text}
        </button>
    )
}