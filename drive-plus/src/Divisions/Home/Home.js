import './home.css'
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import TripModalConfigure from '../TripModal/Configure/TripModal';
import TripModalView from '../TripModal/View/TripModal';
import GetTrips from '../../API/GetTrips';


function Home() {

    const [showConfigureModal, setShowConfigureModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [trip, setTrip] = useState(null);
    const [trips, setTrips] = useState([])

    const tripedit = {
        date: "20/05/2025",
        pickup: "NY",
        dropoff: "MD",
        vehicle: "2025 BMW M8",
        mileage: 350,
        amount: 500.00
      }
    function ConfigureModaledit(e) {
        e.stopPropagation();
        setTrip(tripedit);
        setShowConfigureModal(true);
    }

    useEffect(() => {
        async function Trips() {
            const tripsApi = await GetTrips();
            setTrips(tripsApi);
        }

        Trips();
    }, [])

    return (
        <div className='home-container'>
            <div className='title'> 
                <h1>Welcome to DrivePlus</h1>
                <h3>Manage and Track your Driving Trips Efficiently.</h3>
                <Button className='new-trip-btn' variant='primary' onClick={() => setShowConfigureModal(true)}>
                <i class="bi bi-plus-circle"></i>
                    {"\u00A0"}
                    {"\u00A0"}
                    <p>New Trip</p>
                </Button>
            </div>
            <div className='trips-table'>
                <div className='trips-table-title'>
                    <h2>Your Trips</h2>
                </div>
                <div className='trips-table-columns'>
                    <p style={{width: '12%'}}>Date</p>
                    <p style={{width: '9%'}}>Pick</p>
                    <p style={{width: '9%'}}>Drop</p>
                    <p style={{width: '15.5%'}}>Vehicle</p>
                    <p style={{width: '13.5%'}}>Mileage</p>
                    <p style={{width: '13.5%'}}>Amount</p>
                    <p style={{width: '13.5%'}}>Edit</p>
                    <p style={{width: '13.5%'}}>Delete</p>
                </div>
                <div className='trips-table-contents'>
                    {trips && trips.map((row, index) => {
                        return (
                            <div className='trips-table-content' key={index} onClick={() => {setTrip(tripedit); setShowViewModal(true)}}>
                                <p style={{width: '12%'}}>{row.date}</p>
                                <p style={{width: '9%'}}>{row.pickupStateName}</p>
                                <p style={{width: '9%'}}>{row.dropoffStateName}</p>
                                <p style={{width: '15.5%'}}>{row.vehicle}</p>
                                <p style={{width: '13.5%'}}>{row.mileage}mi</p>
                                <p style={{width: '13.5%'}}>${row.amount}.00</p>
                                <p style={{width: '13.5%'}}><Button onClick={(e) => ConfigureModaledit(e)} className="trip-btn" variant="outline-dark">
                                    <i class="bi bi-pencil-square"></i>
                                    {"\u00A0"}                    
                                    Edit
                                </Button></p>
                                <p style={{width: '13.5%'}}><Button className="trip-btn" variant="outline-danger">
                                <i class="bi bi-trash-fill"></i>
                                    {"\u00A0"}
                                    Delete
                                </Button></p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <TripModalConfigure
            show={showConfigureModal} setShow={setShowConfigureModal} 
            trip={trip}
             />
            <TripModalView
            show={showViewModal} setShow={setShowViewModal} 
            trip={trip}
             />
        </div>

    )
}

export default Home;