export function InputBox({ label, placeholder }) {
    return (
        <div>
            <div className="font-medium text-lg text-left">{label}</div>
            <input type="text" placeholder= {placeholder} className="w-full p-1 border rounded border-slate-200" />
        </div>
    )
}