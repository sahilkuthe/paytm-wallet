import { Link } from "react-router-dom";

export function BottomWarning({ message, buttonText, to }) {
    return (
        <div>
            <div className="ont-semibold text-lg">
            {message}
            </div>
            <Link className="cursor-pointer underline font-medium " to={to}>
                {   buttonText }
            </Link>
        </div>
    )
}