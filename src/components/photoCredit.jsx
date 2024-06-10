const PhotoCredit = ({ photographer, portfolio }) => {
    return (
        <div className="flex flex-row w-full h-fit bottom-0 absolute">
            <span className="grow"></span>
            <div
                className="text-slate-50 bg-slate-400 rounded-t-lg mx-10 sm:mx-4
             p-2 opacity-95"
            >
                <a
                    href={portfolio}
                    target="#blank"
                    className="hover:text-slate-200"
                >
                    Photo Credit: {photographer}
                </a>
            </div>
        </div>
    )
}

export default PhotoCredit
