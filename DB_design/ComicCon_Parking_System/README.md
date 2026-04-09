# Comic-Con Parking System – ER Diagram

This project contains an ER diagram for a multi-zone parking system designed for large events like Comic-Con. The system manages vehicle entry, parking allocation, sessions, tickets, and payments.

## Main Entities

- `vehicle_type`
- `vehicle`
- `parking_zone`
- `spot_category`
- `parking_spot`
- `parking_session`
- `ticket`
- `payment`

## Relationships

- A vehicle belongs to a vehicle type
- A parking zone contains multiple parking spots
- Each parking spot has a category
- A vehicle can have multiple parking sessions
- A parking spot can be used in multiple sessions over time
- Each session generates a ticket
- Payments are linked to parking sessions

## Eraser Code:

``` 
vehicle_type [icon: type, color: green] {
  type_id pk
  name check ('bike','car','suv','ev','cab')
}

vehicle [icon: car, color: green] {
  vehicle_no pk
  owner varchar(100)
  contact_info char(10)
  type_id fk
}

parking_zone [icon: parking, color: yellow] {
  zone_id pk
  name varchar(100)
  level int
}

spot_category [icon: spark, color: blue] {
  category_id pk
  name check ('general','vip','staff','cosplayer','exhibitor','creator')
}

parking_spot [icon: parking, color: yellow] {
  spot_id pk
  zone_id fk
  category_id fk
  is_active boolean
  is_available boolean
}

parking_session [icon: timer, color: orange] {
  session_id pk
  vehicle_no fk
  spot_id fk
  entry_time timestamp
  exit_time timestamp
  total_fee decimal
  status check ('active','completed')
}

ticket [icon: ticket, color: red] {
  ticket_id pk
  session_id fk
  issued_time timestamp
}

payment [icon: dollar-sign, color: green] {
  payment_id pk
  session_id fk
  transaction_ref varchar
  amount decimal
  status check ('paid','pending')
  method check ('upi','cash','card')
}

vehicle_type.type_id < vehicle.type_id
parking_zone.zone_id < parking_spot.zone_id
spot_category.category_id < parking_spot.category_id
vehicle.vehicle_no < parking_session.vehicle_no
parking_spot.spot_id < parking_session.spot_id
parking_session.session_id < ticket.session_id
parking_session.session_id < payment.session_id
```
