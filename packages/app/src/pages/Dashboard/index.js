import React from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css"

export default function Dashboard() {
    const [spots, setSpots] = React.useState([]);

    React.useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem("user");
            const response = await api.get("/dashboard", {
                headers: { user_id }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(it => (
                    <li key={it._id}>
                        <header style={{ backgroundImage: `url(${it.thumbnail_url})` }} />
                        <strong>{it.company}</strong>
                        <span>{it.price ? `R$${it.price}/dia` : "GRATUITO" }</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}