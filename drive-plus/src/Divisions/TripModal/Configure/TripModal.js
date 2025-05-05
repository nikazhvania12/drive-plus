import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import './tripModal.css';

import GetVehicles from '../../../API/GetVehicles';
import GetStates from '../../../API/GetStates';
import AddTripApi from '../../../API/AddTrip';

function TripModalConfigure({show, setShow, trip}) {
    const [states, setStates] = useState([{
        value: null,
        label: null
    }]);
    const [vehicles, setVehicles] = useState([{
        value: null,
        label: null
    }]);
    useEffect(() => {
            async function Vehicles() {
                const vehiclesResponse = await GetVehicles();
                const formattedVehicles = vehiclesResponse.map(vehicle => ({
                    value: vehicle.id,
                    label: vehicle.name
                }));
                setVehicles(formattedVehicles);
            }
            async function States() {
                const statesResponse = await GetStates();
                const formattedStates = statesResponse.map(state => ({
                    value: state.id,
                    label: state.state
                }));
                setStates(formattedStates);
            }

            Vehicles();
            States();
    }, [show, trip])
    return (
        trip === null ? <AddTrip show={show} setShow={setShow} vehicles={vehicles} states={states} /> 
        : 
        <EditTrip show={show} setShow={setShow} trip={trip} />
    )
}

function AddTrip({show, setShow, vehicles, states}) {
    const [tripToAdd, setTripToAdd] = useState({
        date: '',
        pickupStateId: 0,
        dropoffStateId: 0,
        vehicleId: 0,
        mileage: 0,
        amount: 0,
        fuelprice: 0
    });

    async function handleSubmit() {
        console.log(tripToAdd);
        if(tripToAdd.date.trim() === '' ||
        tripToAdd.pickupStateId === null || tripToAdd.pickupStateId <= 0 ||
        tripToAdd.dropoffStateId === null || tripToAdd.dropoffStateId <= 0 ||
        tripToAdd.vehicleId === null || tripToAdd.vehicleId <= 0 ||
        tripToAdd.mileage === null || tripToAdd.mileage <= 0  ||
        tripToAdd.fuelprice === null || tripToAdd.fuelprice <= 0  ||
        tripToAdd.amount === null || tripToAdd.amount <= 0 
        )
            return;
        
        await AddTripApi(tripToAdd);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollabe-body'>
        <div class="mb-3">
            <label for="trip-date" class="form-label">Trip Date:</label>
            <br />
            <input onChange={(e) => setTripToAdd(trip => ({...trip, date: e.target.value}))} 
            type="date" class="form-control" id="trip-date" placeholder="Trip Date" />
        </div>
        <div class="mb-3">
            <label for="trip-pickup" class="form-label">Pick Up State:</label>
            <Select
            onChange={(selected) => setTripToAdd(trip => ({...trip, pickupStateId: selected.value}))} 
            placeholder="Select Pick Up State"
            options={states}
            isClearable
            />
        </div>
        <div class="mb-3">
            <label for="trip-dropoff" class="form-label">Drop Off State:</label>
            <Select
            onChange={(selected) => setTripToAdd(trip => ({...trip, dropoffStateId: selected.value}))} 
            placeholder="Select Drop Off Up State"
            options={states}
            isClearable
            />
        </div>
        <label for="trip-mileage" class="form-label">Mileage:</label>
        <div class="mb-3 input-group">
            <input onChange={(e) => setTripToAdd(trip => ({...trip, mileage: e.target.value}))}  
            type="number" class="form-control" id="trip-mileage" placeholder="Mileage" />
            <span class="input-group-text">mi</span>
        </div>
        <div class="mb-3">
            <label for="trip-vehicle" class="form-label">Vehicle To Transport:</label>
            <Select
            onChange={(selected) => setTripToAdd(trip => ({...trip, vehicleId: selected.value}))} 
            placeholder="Select Vehicle"
            options={vehicles}
            isClearable
            />
        </div>
        <label for="trip-price" class="form-label">Fuel Price per Gallon:</label>
        <div class="mb-3 input-group">
            <span class="input-group-text">$</span>
            <input onChange={(e) => setTripToAdd(trip => ({...trip, fuelprice: e.target.value}))}
            type="number" id="trip-price" class="form-control" placeholder="Fuel Price" />
        </div>
        <label for="trip-amount" class="form-label">Amount You are Being Paid:</label>
        <div class="mb-3 input-group">
            <span class="input-group-text">$</span>
            <input  onChange={(e) => setTripToAdd(trip => ({...trip, amount: e.target.value}))}
            type="number" id="trip-amount" class="form-control" placeholder="Amount" />
            <span class="input-group-text">.00</span>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success">
            Calculate Profit
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Add Trip!
          </Button>
        </Modal.Footer>
      </Modal> 
    )
}

function EditTrip({show, setShow, trip}) {
    // const tripToShow = {
    //     date: `${trip.date.split('/')[2]}-${trip.date.split('/')[1]}-${trip.date.split('/')[0]}`,
    //     pickup: options.find(option => option.value === trip.pickup),
    //     dropoff: options.find(option => option.value === trip.dropoff),
    // }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body className='scrollabe-body'>
        <div class="mb-3">
            <label for="trip-date" class="form-label">Trip Date:</label>
            <br />
            <input type="date" class="form-control" id="trip-date" placeholder="Trip Date" />
        </div>
        <div class="mb-3">
            <label for="trip-pickup" class="form-label">Pick Up State:</label>
            <Select
            placeholder="Select Pick Up State"
            isClearable
            />
        </div>
        <div class="mb-3">
            <label for="trip-dropoff" class="form-label">Drop Off State:</label>
            <Select
            placeholder="Select Drop Off Up State"
            isClearable
            />
        </div>
        <label for="trip-mileage" class="form-label">Mileage:</label>
        <div class="mb-3 input-group">
            <input type="number" class="form-control" value={trip.mileage} id="trip-mileage" placeholder="Mileage" />
            <span class="input-group-text">mi</span>
        </div>
        <div class="mb-3">
            <label for="trip-vehicle" class="form-label">Vehicle To Transport:</label>
            <Select
            placeholder="Select Vehicle"
            isClearable
            />
        </div>
        <label for="trip-price" class="form-label">Fuel Price per Gallon:</label>
        <div class="mb-3 input-group">
            <span class="input-group-text">$</span>
            <input type="number" id="trip-price" class="form-control" placeholder="Fuel Price" />
        </div>
        <label for="trip-amount" class="form-label">Amount You are Being Paid:</label>
        <div class="mb-3 input-group">
            <span class="input-group-text">$</span>
            <input type="number" id="trip-amount" value={trip.amount}  class="form-control" placeholder="Amount" />
            <span class="input-group-text">.00</span>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success">
            Recalculate Profit
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Trip!
          </Button>
        </Modal.Footer>
      </Modal> 
    )
}

export default TripModalConfigure;