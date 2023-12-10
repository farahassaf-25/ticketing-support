import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from "../components/Spinner";
import Back from "../components/Back";
import { useDispatch } from "react-redux";
import TicketItem from "../components/TicketItem";
import { toast } from "react-toastify";

function Tickets() {
    const { tickets } = useSelector((state) => state.tickets)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])    
    
    if (!tickets) {
        return <Spinner />;
    }

    return (
        <>
            <Back url='/' />
            <h1>My Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    );
}

export default Tickets