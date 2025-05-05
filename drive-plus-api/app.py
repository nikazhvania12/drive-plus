from flask import Flask, jsonify, request
from flask_cors import CORS
from database import drive_plus_db, State, Vehicle, Trip, db
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

drive_plus_db(app)

@app.route("/states", methods=["GET"])
def get_states():
    states = State.query.all()
    return jsonify([{"id": state.id, "state": state.state, "state_short": state.state_short} for state in states])

@app.route("/vehicles", methods=["GET"])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{"id": vehicle.id, "name": vehicle.name, "weight": vehicle.weight} for vehicle in vehicles])

@app.route("/trips", methods=["GET"])
def get_trips():
    pickup_subq = db.session.query(State.id, State.state_short.label("pickup_name")).subquery()
    dropoff_subq = db.session.query(State.id, State.state_short.label("dropoff_name")).subquery()
    vehicle_subq = db.session.query(Vehicle.id, Vehicle.name.label("vehicle_name")).subquery()

    results = db.session.query(
        Trip,
        pickup_subq.c.pickup_name,
        dropoff_subq.c.dropoff_name,
        vehicle_subq.c.vehicle_name
    ).outerjoin(
        pickup_subq, Trip.pickupStateId == pickup_subq.c.id
    ).outerjoin(
        vehicle_subq, Trip.vehicleId == vehicle_subq.c.id
    ).outerjoin(
        dropoff_subq, Trip.dropoffStateId == dropoff_subq.c.id
    ).all()

    trips = []
    for trip, pickup_name, dropoff_name, vehicle_name in results:
        trips.append({
            "id": trip.id,
            "date": trip.date.isoformat(),
            "pickupStateId": trip.pickupStateId,
            "pickupStateName": pickup_name,
            "dropoffStateId": trip.dropoffStateId,
            "dropoffStateName": dropoff_name,
            "vehicle": vehicle_name,
            "mileage": trip.mileage,
            "fuelprice": trip.fuelprice,
            "amount": trip.amount
        })

    return jsonify(trips)



@app.route("/trips", methods=["POST"])
def create_trip():
    data = request.get_json()
    dateParsed = datetime.strptime(data['date'], "%Y-%m-%d").date()
    new_trip = Trip(
        date=dateParsed,
        pickupStateId=data['pickupStateId'],
        dropoffStateId=data['dropoffStateId'],
        vehicleId=data['vehicleId'],
        mileage=data['mileage'],
        amount=data['amount'],
        fuelprice=data["fuelprice"]
    )
    db.session.add(new_trip)
    db.session.commit()
    return jsonify({
        "id": new_trip.id,
        "date": new_trip.date.isoformat(),
        "pickupStateId": new_trip.pickupStateId,
        "dropoffStateId": new_trip.dropoffStateId,
        "vehicleId": new_trip.vehicleId,
        "mileage": new_trip.mileage,
        "fuelprice": new_trip.fuelprice,
        "amount": new_trip.amount
    }), 201

@app.route("/trips/<int:trip_id>", methods=["PUT"])
def update_trip(trip_id):
    trip = Trip.query.get(trip_id)
    if not trip:
        return jsonify({"error": "Trip not found"}), 404
    
    data = request.get_json()
    
    if 'date' in data:
        trip.date = data['date']
    if 'pickupStateId' in data:
        trip.pickupStateId = data['pickupStateId']
    if 'dropoffStateId' in data:
        trip.dropoffStateId = data['dropoffStateId']
    if 'vehicleId' in data:
        trip.vehicleId = data['vehicleId']
    if 'mileage' in data:
        trip.mileage = data['mileage']
    if 'fuelprice' in data:
        trip.mileage = data['mileage']
    if 'amount' in data:
        trip.amount = data['amount']
    
    db.session.commit()
    
    return jsonify({
        "id": trip.id,
        "date": trip.date.isoformat(),
        "pickupStateId": trip.pickupStateId,
        "dropoffStateId": trip.dropoffStateId,
        "vehicleId": trip.vehicleId,
        "mileage": trip.mileage,
        "amount": trip.amount
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
        