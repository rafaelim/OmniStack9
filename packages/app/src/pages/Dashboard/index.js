import React from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import api from "../../services/api";
import "./styles.css"

export default function Dashboard() {
    const [spots, setSpots] = React.useState([]);
    const [requests, setRequests] = React.useState([]);

    const user_id = localStorage.getItem("user");
    const socket = React.useMemo(() => socketio("http://localhost:5000", {
        query: { user_id },
    }), [user_id]);
    React.useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

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

    function handleAccept(id) {
        return async () => {
            await api.post(`/bookings/${id}/approvals`);
            setRequests(requests.filter(it => it._id !== id));
        }
    }

    function handleReject(id) {
        return async () => {
            await api.post(`/bookings/${id}/rejections`);
            setRequests(requests.filter(it => it._id !== id));
        }
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> esta solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
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