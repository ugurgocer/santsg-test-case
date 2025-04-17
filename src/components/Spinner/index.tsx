const Spinner = ({ text="" }: { text?: string }) => {
    return (
        <div className="flex flex-col justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
            <span className="block">{text}</span>
        </div>
    )
}

export default Spinner;