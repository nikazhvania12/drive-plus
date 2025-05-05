from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Trip(db.Model):
    __tablename__ = 'trips'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    pickupStateId = db.Column(db.Integer, nullable=False)
    dropoffStateId = db.Column(db.Integer, nullable=False)
    vehicleId = db.Column(db.Integer, nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    fuelprice = db.Column(db.Float, nullable=False)
    amount = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Trip {self.id}>'

class Vehicle(db.Model):
    __tablename__ = 'vehicles'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return f'<Vehicle {self.id}: {self.name}>'

class State(db.Model):
    __tablename__ = 'states'
    
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(100), nullable=False)
    state_short = db.Column(db.String(2), nullable=False)
    
    def __repr__(self):
        return f'<State {self.id}: {self.state} ({self.state_short})>'

def drive_plus_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()